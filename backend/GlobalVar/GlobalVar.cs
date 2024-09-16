using MongoDB.Driver;

namespace backend.GlobalVar
{
    public static class GlobalVariables
    {
        public static readonly MongoClient DbClient = new MongoClient
        ("mongodb+srv://ammourah:qME6hIWdjgpzBnoU@users.frbjxvq.mongodb.net/?retryWrites=true&w=majority&appName=Users");
    }

}