# WannaChat

WannaChat is a secure, real-time messaging application designed with end-to-end encryption, token-based authentication, and a modern, interactive interface. It leverages React Native for the frontend, C# .NET 8 for the backend, and MongoDB for database management.

## Features

- **End-to-End Encryption:** Ensures that only the intended recipient can read the messages.
- **Token-Based Authentication:** Secure user authentication using tokens.
- **Real-Time Messaging:** Instant message delivery and updates using WebSockets and SignalR.
- **Interactive UI:** Modern and engaging user interface for an enhanced messaging experience.
- **Deployed on Fly.io:**
## Tech Stack

- **Frontend:** React Native
- **Backend:** C# .NET 8
- **Database:** MongoDB

## Installation

### Prerequisites

- Node.js (for React Native development)
- .NET 8 SDK
- MongoDB

### Frontend Setup

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Abdul-Rahman-Ammourah/-WannaChat-.git
    cd -wannachat-
    ```

2. **Navigate to the Frontend Directory**
    ```bash
    cd frontend
    ```

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Start the Development Server**
    ```bash
    npm start
    ```

### Backend Setup

1. **Navigate to the Backend Directory**
    ```bash
    cd backend
    ```

2. **Restore Dependencies**
    ```bash
    dotnet restore
    ```

3. **Run the Application**
    ```bash
    dotnet run
    ```

### Database Setup

1. **Install MongoDB** and start the MongoDB server.

2. **Update Connection String** in the `GlobalVar/GlobalVar.cs` file in the `backend` directory with your MongoDB connection string.

## Usage

1. **Open the React Native App** on your device or emulator.
2. **Register a New Account** or log in with existing credentials.
3. **Start Chatting** with your contacts in real-time.


## License

This is a personal project you can do whatever you want.

## Contact

For questions or feedback, please contact us at [abdulrhmanammourah@gmail.com](mailto:abdulrhmanammourah@gmail.com).
