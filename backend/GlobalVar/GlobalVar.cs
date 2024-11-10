using MongoDB.Driver;

namespace backend.GlobalVar
{
    public static class GlobalVariables
    {
        // Retrieve MongoDB connection string from environment variables
        public static readonly MongoClient DbClient = new MongoClient(GetMongoConnectionString());

        private static string GetMongoConnectionString()
        {
            // Get the connection string from environment variable or use a fallback
            var connectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING");

            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("MongoDB connection string is not configured.");
            }

            return connectionString;
        }
    }
}
