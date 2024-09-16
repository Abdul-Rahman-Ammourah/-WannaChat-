using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class RegisterData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        public string? Id { get; set; } // MongoDB will handle Id generation
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? PublicKey { get; set; }
        public string? PrivateKey { get; set; }
        public int ProfilePic { get; set; }
    }
}
