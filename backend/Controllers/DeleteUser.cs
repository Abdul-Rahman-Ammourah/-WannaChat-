using MongoDB.Driver;
using backend.GlobalVar;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
namespace backend.Controllers
{
    [ApiController]
    [Route("DeleteUser")]
    public class DeleteUser : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;

        [HttpPost]
        public IActionResult DeleteUserData([FromBody] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required");
            }

            // Get the database
            var db = dbClient.GetDatabase("MainDB");
            // Get the collection
            var collection = db.GetCollection<RegisterData>("Users");

            // Find and delete the user by email
            var result = collection.DeleteOne(x => x.Email == email);

            if (result.DeletedCount > 0)
            {
                return Ok("User deleted successfully");
            }
            else
            {
                return NotFound("User not found");
            }
        }
    }
}
