using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
namespace backend.Models
{
    public class SendMessageData
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            [JsonIgnore]
            public string? Id { get; set; }
            public string? FromEmail { get; set; }
            public string? ToEmail { get; set; }
            public string? Message { get; set; }
            public DateTime Date { get; set; } = DateTime.Now;
        }
}
