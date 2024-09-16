using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.GlobalVar;
using backend.Services;
namespace backend.Controllers
{
    [ApiController]
    [Route("/Register")]
    public class Register : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;
        private readonly JwtTokenService _jwtTokenService;
        
        public Register(JwtTokenService jwtTokenService){
            _jwtTokenService = jwtTokenService;
        }        
        
        [HttpPost]
        public ActionResult<RegisterData> RegisterUser([FromBody] RegisterData data)
        {   
            if (data == null||
                string.IsNullOrEmpty(data.Email) ||
                string.IsNullOrEmpty(data.Username) ||
                string.IsNullOrEmpty(data.Password) ||
                data.ProfilePic <= 0 ||
                data.ProfilePic > 6)
            {
                return BadRequest("Invalid Data");
            }
        
            //Get the database
            var db = dbClient.GetDatabase("MainDB");
            //Get the collection
            var collection = db.GetCollection<RegisterData>("Users");

            // Verify the email is not already registered
            var user = collection.Find(x => x.Email == data.Email).FirstOrDefault();
            if (user != null)
            {
                return BadRequest("Email already exists");
            }

            // Hash the password
            try {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(data.Password);

                // Create a new instance of the RegisterData
                var userdata = new RegisterData {
                    Email = data.Email,
                    Username = data.Username,
                    Password = hashedPassword,
                    PublicKey = data.PublicKey,
                    PrivateKey = data.PrivateKey,
                    ProfilePic = data.ProfilePic
                };
                
                
                // Generate a JWT token
                var token = _jwtTokenService.GenerateJwtToken(data.Username);

                if (!string.IsNullOrEmpty(token)){
                    // Create the user in the database
                    collection.InsertOne(userdata);
                    return Ok(token);
                }else{
                    return BadRequest("Failed to generate token, please try again");
                }
            }catch (Exception e) {
                return BadRequest(e.Message);
            }
        }
    }
}
