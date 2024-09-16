using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.GlobalVar;
namespace backend.Controllers
{
    [ApiController]
    [Route("ReceiveMessages")]
    public class ReceiveMessages : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;
        
        [HttpGet]
        public IActionResult GetMessages([FromQuery] string? receiverEmail, [FromQuery] string? senderEmail)
        {
            if (string.IsNullOrEmpty(receiverEmail) || string.IsNullOrEmpty(senderEmail))
            {
                return BadRequest("Both receiver email and sender email must be provided.");
            }

            try
            {
                var db = dbClient.GetDatabase("MainDB");
                var Mcollection = db.GetCollection<SendMessageData>("Messages");

                // Query to get messages where `ToEmail` is the receiver's email and `FromEmail` is the sender's email.
                var messages = Mcollection.Find(x => x.ToEmail == receiverEmail && x.FromEmail == senderEmail).ToList();
                
                return Ok(messages);
            }
            catch (Exception ex)
            {
                // Log the exception and return an internal server error response
                // (Add logging logic here)
                return StatusCode(500, ex);
            }
        }
    }
}
