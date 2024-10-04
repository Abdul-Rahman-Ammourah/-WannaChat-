using MongoDB.Driver;
using backend.GlobalVar;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
namespace backend.Controllers
{
    public class DeleteUserData {
        public string? Email { get; set; }
    }
    [ApiController]
    [Route("DeleteUser")]
    public class DeleteUser : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;

        [HttpPost]
        public IActionResult DeleteUserData([FromBody] DeleteUserData data)
        {
            if (string.IsNullOrEmpty(data.Email))
            {
                return BadRequest("Email is required");
            }

            // Get the database
            var db = dbClient.GetDatabase("MainDB");
            // Get the collection
            var collection = db.GetCollection<RegisterData>("Users");

            // Find and delete the user by email
            var result = collection.DeleteOne(x => x.Email == data.Email);

            if (result.DeletedCount > 0)
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }
    }
}
