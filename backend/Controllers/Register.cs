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

        public Register(JwtTokenService jwtTokenService)
        {
            _jwtTokenService = jwtTokenService;
        }        

        [HttpPost]
        public ActionResult<object> RegisterUser([FromBody] RegisterData data)
        {   
            if (data == null ||
                string.IsNullOrEmpty(data.Email) ||
                string.IsNullOrEmpty(data.Username) ||
                string.IsNullOrEmpty(data.Password) ||
                data.ProfilePic <= 0 ||
                data.ProfilePic > 6)
            {
                return BadRequest("Invalid Data");
            }
        
            var db = dbClient.GetDatabase("MainDB");
            var collection = db.GetCollection<RegisterData>("Users");

            // Verify if email is already registered
            var existingUser = collection.Find(x => x.Email == data.Email).FirstOrDefault();
            if (existingUser != null)
            {
                return BadRequest("Email already exists");
            }

            // Hash the password
            try
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(data.Password);

                var userdata = new RegisterData
                {
                    Email = data.Email,
                    Username = data.Username,
                    Password = hashedPassword,
                    PublicKey = data.PublicKey,
                    PrivateKey = data.PrivateKey,
                    ProfilePic = data.ProfilePic
                };
                
                // Generate a JWT token
                var token = _jwtTokenService.GenerateJwtToken(data.Username);

                if (!string.IsNullOrEmpty(token))
                {
                    // Create the user in the database
                    collection.InsertOne(userdata);

                    // Return token and user info
                    return Ok(new { Token = token});
                }
                else
                {
                    return BadRequest("Failed to generate token, please try again");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }
    }
}
