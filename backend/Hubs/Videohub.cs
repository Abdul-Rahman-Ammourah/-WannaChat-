using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Hubs
{
    public class VideoHub : Hub
    {
        private static readonly Dictionary<string, List<string>> _userConnections = new();
        private static readonly Dictionary<string, string> _connectionUserMapping = new();

        // Method to register the user connection
        public Task RegisterConnection(string email)
{
    var connectionId = Context.ConnectionId;

    lock (_userConnections)
    {
        if (!_userConnections.ContainsKey(email))
        {
            _userConnections[email] = new List<string>();
        }
        _userConnections[email].Add(connectionId);
    }

    // Track the user for the current connection ID
    lock (_connectionUserMapping)
    {
        _connectionUserMapping[connectionId] = email;
    }

    Console.WriteLine($"Registered connection ID {connectionId} for email {email}.");

    return Task.CompletedTask;
}


        // Method to send signaling information to a specific user
        public async Task SendSignalingMessage(string connectionId, string message)
        {
            if (!string.IsNullOrEmpty(connectionId) && _connectionUserMapping.ContainsKey(connectionId))
            {
                await Clients.Client(connectionId).SendAsync("ReceiveSignalingMessage", Context.ConnectionId, message);
            }
            else
            {
                // Handle the case where the connection ID is not found in the mapping
                Console.WriteLine("Connection ID not found in the mapping");
            }
        }


        // Method to get the connection ID by email
        public string GetConnectionIdByEmail(string email)
        {
            // Check if the email exists in the dictionary and return the latest connection ID
            if (_userConnections.TryGetValue(email, out var connectionIds) && connectionIds.Count > 0)
            {
                return connectionIds[^1]; // ^1 gets the last element in the list (C# index from the end)
            }
            return ""; // or return null depending on your preference
        }

        // When a client connects to the Hub
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        // When a client disconnects from the Hub
        public override Task OnDisconnectedAsync(System.Exception? exception)
        {
            var connectionId = Context.ConnectionId;
            string? email;

            // Remove the connection ID from the user's list
            lock (_connectionUserMapping)
            {
                if (_connectionUserMapping.TryGetValue(connectionId, out email))
                {
                    _connectionUserMapping.Remove(connectionId);
                }
            }

            if (email != null)
            {
                lock (_userConnections)
                {
                    if (_userConnections.TryGetValue(email, out List<string>? connectionIds))
                    {
                        // Remove the connection ID
                        connectionIds.Remove(connectionId);

                        // Remove the email entry if no connection IDs remain
                        if (connectionIds.Count == 0)
                        {
                            _userConnections.Remove(email);
                        }
                    }
                }
            }

            return base.OnDisconnectedAsync(exception);
        }
    }
}