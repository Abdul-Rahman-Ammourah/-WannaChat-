using MongoDB.Driver;
using MongoDB.Bson;

namespace BackEnd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            const string connectionUri = "mongodb+srv://Ammourah:v2Kt5l2EdZlMf6vZ@wannachat.tgwjbnf.mongodb.net/?appName=WannaChat";

            var settings = MongoClientSettings.FromConnectionString(connectionUri);

            // Set the ServerApi field of the settings object to set the version of the Stable API on the client
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);

            // Create a new client and connect to the server
            var client = new MongoClient(settings);

            try
            {
                // Ping the server to check the connection
                client.StartSession();
                Console.WriteLine("You successfully connected to MongoDB!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to connect to MongoDB:");
                Console.WriteLine(ex.Message);
            }

            try
            {
                // Access the All_Users database
                var databaseAllUsers = client.GetDatabase("All_Users");

                // Access the User collection
                var usersCollection = databaseAllUsers.GetCollection<BsonDocument>("user");

                // Retrieve all documents in the User collection
                var user = usersCollection.Find(new BsonDocument()).ToList();

                // Display the contents inside of each user
                for (int i = 0; i < user.Count; i++)
                {
                    Console.WriteLine(user[i].ToJson());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to retrieve or display data:");
                Console.WriteLine(ex.Message);
            }
        }
    }
}
