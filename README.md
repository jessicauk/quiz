

# README: Quiz

Welcome to the "Quiz" built with Expo! This README will guide you through setting up your local development environment and running the app.

### Prerequisites:
1. **Node.js**: You need Node.js to use Expo and React Native. [Download it here](https://nodejs.org/).
2. **Git**: If you don't have git installed, [download and install it](https://git-scm.com/).
3. **Watchman** (optional for macOS users): It’s a tool by Facebook for watching changes in the filesystem. [Learn how to install it](https://facebook.github.io/watchman/docs/install).

### Setup:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/jessicauk/quiz.git
    cd quiz
    ```

2. **Install Expo CLI**:

    Expo CLI is a command line utility to develop and build Expo projects.

    - Using npm:
      ```bash
      npm install -g expo-cli
      ```

    - Using yarn:
      ```bash
      yarn global add expo-cli
      ```

3. **Install Dependencies**:

    Navigate to your project directory and install necessary packages:

    - Using npm:
      ```bash
      npm install
      ```

    - Using yarn:
      ```bash
      yarn install
      ```

### Running the App:

1. **Start the Development Server**:

    ```bash
    expo start
    ```

    This command will start the Metro Bundler and open up a developer tools page in your default web browser. You will see a QR code in the terminal and the browser.

2. **Running on your device**:

    - **iOS**: Install the `Expo Go` app from the App Store. Open Expo Go and scan the QR code displayed in the terminal or browser.
    - **Android**: Install the `Expo Go` app from the Google Play Store. Open Expo Go and scan the QR code displayed in the terminal or browser.

3. **Running on an emulator**:

    - **iOS (Mac only)**: Press `i` in the terminal after starting the app to open the iOS Simulator.
    - **Android**: Ensure you have Android Studio and an emulator set up. Press `a` in the terminal to run the app on the Android emulator.

### Tips:

- If you run into issues with starting the app, you might want to try clearing the cache with `expo start -c`.
- If you plan to use any native modules, you'll need to eject from Expo and use bare React Native. However, be sure about this decision as it's not easily reversible.

### Log in session:

- Log in with the next credentials
  ```
    User: admin
    Password: 12345678
  ```
 
### Usage

- Log in session

![Login](https://github.com/jessicauk/quiz/blob/main/assets/login.png?raw=true)

  ```
  User: admin
  Password: 12345678
  ```

- Press on **START QUIZ** button

![Dashboard](https://github.com/jessicauk/quiz/blob/main/assets/dashboard.png?raw=true)

- Select the correct answer as possible

![Quiz 1](https://github.com/jessicauk/quiz/blob/main/assets/quiz-1.png?raw=true)

![Quiz 2](https://github.com/jessicauk/quiz/blob/main/assets/quiz-2.png?raw=true)

![Quiz 3](https://github.com/jessicauk/quiz/blob/main/assets/quiz-3.png?raw=true)

- Once the quiz is completed next screen shows your total score

![Score](https://github.com/jessicauk/quiz/blob/main/assets/score.png?raw=true)


### Contributing:

If you would like to contribute to this project, please make sure to branch off of master, make your changes, and then submit a pull request.

### License:

This project is licensed under the MIT License.

---

Happy coding!
