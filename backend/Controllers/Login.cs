using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.GlobalVar;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("Login")]
    public class Login : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;
        private readonly JwtTokenService _jwtTokenService;

        // Only one constructor with dependencies
        public Login(JwtTokenService jwtTokenService)
        {
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        public IActionResult LoginUser([FromBody] LoginData data)
        {
            if (data == null || string.IsNullOrEmpty(data.Email) || string.IsNullOrEmpty(data.Password))
            {
                return BadRequest("Invalid input");
            }

            var db = dbClient.GetDatabase("MainDB");
            var collection = db.GetCollection<RegisterData>("Users");

            // Find the user by email
            var user = collection.Find(x => x.Email == data.Email).FirstOrDefault();
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }
            
            // Verify the password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(data.Password, user.Password);
            var token = _jwtTokenService.GenerateJwtToken(user.Username ?? "");
            if (isPasswordValid && !string.IsNullOrEmpty(token))
            {   
                var response = new LoginResponse {
                    Username = user.Username,
                    PrivateKey = user.PrivateKey,
                    ProfilePic = user.ProfilePic,
                    Token = token
                };
                return Ok(response);
            }
            else
            {
                return Unauthorized("Invalid email or password");
            }
        }

        [HttpPost("Validate")]
        public IActionResult ValidateUser([FromBody] LoginData data)
        {
            if (data == null || string.IsNullOrEmpty(data.Email) || string.IsNullOrEmpty(data.Password))
            {
                return BadRequest("Invalid input");
            }

            var db = dbClient.GetDatabase("MainDB");
            var collection = db.GetCollection<RegisterData>("Users");

            // Find the user by email
            var user = collection.Find(x => x.Email == data.Email).FirstOrDefault();
            if (user == null)
            {
                return BadRequest("Invalid email or password");
            }

            // Verify the password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(data.Password, user.Password);

            if (isPasswordValid)
            {   
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }
    }
}
