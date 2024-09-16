using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using backend.Models;
using backend.GlobalVar;
using backend.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("SendMessage")]
    public class SendMessage : ControllerBase
    {
        private readonly MongoClient dbClient = GlobalVariables.DbClient;

        [HttpPost]
        public IActionResult SendMessageToUser([FromBody] SendMessageData data)
        {
            if (data == null || string.IsNullOrEmpty(data.FromEmail) || string.IsNullOrEmpty(data.ToEmail) || string.IsNullOrEmpty(data.Message))
            {
                return BadRequest("Invalid input");
            }

            var db = dbClient.GetDatabase("MainDB");
            var Mcollection = db.GetCollection<SendMessageData>("Messages");
            var Ucollection = db.GetCollection<RegisterData>("Users");

            var sender = Ucollection.Find(x => x.Email == data.FromEmail).FirstOrDefault();
            var receiver = Ucollection.Find(x => x.Email == data.ToEmail).FirstOrDefault();

            if (sender == null || receiver == null)
            {
                return NotFound("User not found");
            }

            Mcollection.InsertOne(data);

            // Send the message in real-time using SignalR
            return Ok("Message sent successfully");
        }
    }
}
