using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Hubs
{
    public class Chathub : Hub
    {
        private static readonly Dictionary<string, List<string>> _userConnections = new();
        private static readonly Dictionary<string, string> _connectionUserMapping = new();

        // Method to send a message to a specific user by their connection ID
        public async Task SendToUser(string connectionId, string message)
        {
            if (_connectionUserMapping.TryGetValue(connectionId, out var email))
            {
                await Clients.Client(connectionId).SendAsync("ReceiveMessage", Context.ConnectionId, message);
            }
            else
            {
                // Handle the case where the connection ID is not found in the mapping
                Console.WriteLine("Connection ID not found in the mapping");
            }
        }

        // Method to map a user's email to their ConnectionId
        public Task RegisterConnectionId(string email)
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

            return Task.CompletedTask;
        }

        // Method to get the current user's ConnectionId
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        // Method to get the connection IDs by email
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
