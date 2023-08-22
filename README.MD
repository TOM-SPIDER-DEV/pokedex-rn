# Pokedex

This is a Pokédex application built with React Native that utilizes Firebase for storing favorite pokémons and implementing email/password authentication.

<img src="./assets/pokedex (home).PNG"  width=200/>
<img src="./assets/pokedex (pokemon screen).PNG" width=200/>

## Features

- View a list of pokémons with their details such as name, type, and abilities.
- Search for specific pokémons by name or type.
- Mark pokémons as favorites and save them to Firebase.
- Authenticate users with email and password.

## Installation

1. Clone the repository:

`git clone https://github.com/your-username/pokedex.git`

2. Navigate to the project directory:

`cd pokedex`

3. Install the dependencies:

`npm install`

## Configuration

Before running the application, you need to set up your Firebase project and configure the Firebase SDK with your project credentials.

1. Create a Firebase project and enable Firebase Authentication and Firebase Realtime Database.

2. Create a file named `firebase-config.js` in the project root directory.

3. Copy and paste the following code into `firebase-config.js`:

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_API_ID",
  databaseURL: "YOUR_DATABASE_URL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
```

## Usage

1. Start the application:

`npm start`

This will launch the Expo development server.

2. Use the Expo client app on your mobile device or an emulator to scan the QR code displayed in the terminal or in the Expo DevTools. This will open the app on your device.

3. Explore the Pokédex, search for pokémons, mark them as favorites, and interact with the app.

## Firebase Authentication Setup

To enable email/password authentication in your Firebase project, follow these steps:

1. Go to the Firebase console and select your project.

2. Navigate to the "Authentication" section.

3. Enable the "Email/Password" sign-in method.

4. You can now register new users and authenticate existing users with email and password.

## Firebase Realtime Database Setup

To set up the Firebase Realtime Database for storing favorite pokémons, follow these steps:

1. In the Firebase console, navigate to the "Realtime Database" section.

2. Create a new database or use an existing one.

3. Set the database rules to allow read and write access:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Note: For a production app, you may want to configure more secure rules based on your application's requirements and user authentication status.

You can now save and retrieve favorite pokémons from the database using Firebase's Realtime Database features.

## License

This project is licensed under the <ins>MIT License</ins>.

Please note that the rules provided here are basic examples and may not suit all use cases. It's important to carefully design and configure the security rules based on your specific application's needs.
