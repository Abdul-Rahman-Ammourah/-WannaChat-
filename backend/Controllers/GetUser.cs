using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.GlobalVar;

namespace backend.Controllers
{
    [ApiController]
    [Route("getUser")]
    public class GetUser : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;


        [HttpGet]
        public ActionResult<RegisterData> GetUserData([FromQuery] string? Email)
        {
            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest("Email not provided");
            }

            var db = dbClient.GetDatabase("MainDB");
            var collection = db.GetCollection<RegisterData>("Users");

            // Find the user by email
            var filter = Builders<RegisterData>.Filter.Eq(user => user.Email, Email);
            var user = collection.Find(filter).FirstOrDefault();  // Use FirstOrDefault() to get a single result

            if (user == null)
            {
                return NotFound("User does not exist");
            }
            
            // Return the user object without the Password field
            var resoponsuser = new RegisterData{
                Email = user.Email,
                Username = user.Username,
                PublicKey = user.PublicKey,
                ProfilePic = user.ProfilePic
            };
            return Ok(resoponsuser);
        }
        [HttpGet("CheckDub")]
        public ActionResult<RegisterData> CheckDub([FromQuery] string? email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not provided");
            }
            var db = dbClient.GetDatabase("MainDB");
            var collection = db.GetCollection<RegisterData>("Users");

            // Find the user by email
            var filter = Builders<RegisterData>.Filter.Eq(user => user.Email, email);
            var user = collection.Find(filter).FirstOrDefault();  // Use FirstOrDefault() to get a single result

            if (user == null)
            {
                return Ok(false);
            }
            else
            {
                return Ok(true);
            }
        }
    }
}
