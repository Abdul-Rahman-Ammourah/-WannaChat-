using MongoDB.Driver;

namespace backend.GlobalVar
{
    public static class GlobalVariables
    {
        public static readonly MongoClient DbClient = new MongoClient
        ("xxx");
    }

}
