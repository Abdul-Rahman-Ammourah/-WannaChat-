using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.GlobalVar;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
    public class UserDto
    {
        public string? Email { get; set; }
        public string? Username { get; set; }
        public int ProfilePic { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class GetAllUsers : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;

        [HttpGet]
        public ActionResult<List<UserDto>> GetAllusers()
        {
            var db = dbClient.GetDatabase("MainDB");
            var collection = db.GetCollection<RegisterData>("Users");

            // Fetch all users and project only the desired fields
            var users = collection.Find(_ => true).ToList();

            // Map to UserDto
            var userDtos = users.Select(user => new UserDto
            {
                Email = user.Email,
                Username = user.Username,
                ProfilePic = user.ProfilePic 
            }).ToList();

            return Ok(userDtos);
        }
    }
}
