using MongoDB.Driver;
using MongoDB.Bson;
using backend.GlobalVar;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Controllers;
namespace backend.Controllers
{
    [ApiController]
    [Route("UpdateUser")]
    public class UpdateUser : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;

        [HttpPost]
        public IActionResult UpdateUserData([FromBody] UpdateData data)
        {
            if (data == null ||
                string.IsNullOrEmpty(data.OldEmail) ||
                string.IsNullOrEmpty(data.NewEmail) ||
                string.IsNullOrEmpty(data.Username) ||
                data.ProfilePic <= 0 || data.ProfilePic > 6)
            {
                return BadRequest("Invalid input");
            }

            // Get the database
            var db = dbClient.GetDatabase("MainDB");
            // Get the collection
            var collection = db.GetCollection<RegisterData>("Users");
            
            // Find the user by email
            var user = collection.Find(x => x.Email == data.OldEmail).FirstOrDefault();
            if (user == null)
            {
                return NotFound("User not found");
            }
            var Dubmail = collection.Find(x => x.Email == data.NewEmail).FirstOrDefault();
            if (Dubmail != null)
            {
                return Conflict("Email already in use");
            }
            // Define the update fields
            var update = Builders<RegisterData>.Update
                .Set(u => u.Username, data.Username)
                .Set(u => u.Email, data.NewEmail)
                .Set(u => u.ProfilePic, data.ProfilePic);

            // Apply the update
            var result = collection.UpdateOne(
                x => x.Email == data.OldEmail, // Find user by the original email
                update
            );

            // Check if the update was successful
            if (result.ModifiedCount > 0)
            {
                return Ok("User updated successfully");
            }
            else
            {
                return StatusCode(500, "Failed to update user");
            }
        }
    }
}
