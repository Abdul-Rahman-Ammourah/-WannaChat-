# WannaChat

WannaChat is a secure messaging application built with React Native for the front end and Rust for the back end. The primary focus of this application is to ensure robust security and privacy for all communications.

## Features

- **End-to-End Encryption**: All messages are encrypted to ensure that only the intended recipients can read them.
- **User Authentication**: Secure user authentication mechanisms to protect user data.
- **Real-time Messaging**: Seamless real-time messaging experience.
- **Cross-Platform**: Available on both Android and iOS devices.
- **Secure Data Storage**: Encrypted data storage to protect user information.

## Tech Stack

- **Frontend**: React Native
- **Backend**: Rust
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js
- React Native CLI
- Rust
- MongoDB

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/wannachat.git
    cd wannachat
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Run the application on your device or emulator:
    ```bash
    npx react-native run-android  # For Android
    npx react-native run-ios      # For iOS
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install Rust dependencies:
    ```bash
    cargo build
    ```

3. Set up the MongoDB database:
    ```bash
    # Make sure MongoDB is running
    mongod --dbpath /path_to_your_db
    ```

4. Start the Rust server:
    ```bash
    cargo run
    ```

## Usage

1. Open the WannaChat app on your mobile device.
2. Sign up or log in to your account.
3. Start chatting securely with your contacts.





## Contact

For any questions or suggestions, please open an issue or contact us at [abdulrhmanammmourah@gmail.com](mailto:email@example.com).

---

Thank you for using WannaChat! Your privacy and security are our top priorities.
