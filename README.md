# 🎓 QuizApp Backend API

Welcome to the **QuizApp Backend**, a comprehensive API for managing users, quizzes, and cards in the QuizApp platform. Built with **NestJS**, **Prisma**, and **JWT** for authentication, this backend is designed for efficiency, scalability, and developer productivity.

## 📋 Table of Contents

- [🚀 Installation](#-installation)
- [⚙️ Environment Variables](#️-environment-variables)
- [📦 Running the Application](#-running-the-application)
- [🛠️ Scripts](#-scripts)
- [📚 API Documentation](#-api-documentation)
- [🗂️ Project Structure](#-project-structure)
- [🔧 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)
- [🌐 Useful Links](#-useful-links)

---

## 🚀 Installation

Follow these steps to install and set up the project on your local machine:

### 1. Clone the Repository:

```bash
git clone https://github.com/yuldoshevuz/quizzapp-backend.git
cd quizzapp-backend
```

### 2. Install Dependencies:

```bash
npm install
```

This will install all necessary dependencies listed in `package.json`.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and set the following environment variables:

```plaintext
DATABASE_URL=postgres://<username>:<password>@localhost:5432/quizapp
BASE_URL=http://localhost:3000
PORT=5000
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
BOT_TOKEN=your-telegram-bot-boken
WEBAPP_URL=your-telegram-webapp-url
DEFAULT_PROFILE_PHOTO=https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg
```

**You can set environment variables like example.env file**

---

## 📦 Running the Application

### Using **PM2** (Production Mode)

The app is managed by **PM2** for process management in production environments.

- **Start the Application**:

    ```bash
    npm run start
    ```

    This will build the project and start it using `pm2`.

- **Stop the Application**:

    ```bash
    npm run stop
    ```

- **Restart the Application**:

    ```bash
    npm run restart
    ```

### Running in Development Mode

For development purposes, run the following command:

```bash
npm run start:dev
```

This will start the app in development mode with **hot-reloading** for live updates during development.

---

## 🛠️ Scripts

Here are the key NPM scripts available for various tasks:

- **Build the Application**:

    ```bash
    npm run build
    ```

    This compiles the application using the NestJS CLI.

- **Run in Debug Mode**:

    ```bash
    npm run start:debug
    ```

    Starts the app in debug mode for detailed logging and debugging.

---

## 📚 API Documentation

The QuizApp API is documented using **Swagger**. You can access the Swagger UI for testing and exploring the available API endpoints at:

**[Swagger UI](https://quizzapp.sbsa.uz/api/docs)**

### Notable API Endpoints

1. **Authorization User (`POST /api/auth`)**

    - **Description**: Authorizes a user using Telegram credentials.
    - **Request Body**:
      ```json
      {
        "telegramId": 1933002694,
        "fullName": "Muhammadali Yuldoshev"
      }
      ```
    - **Responses**:
      - `201 Created`: Successful authorization with access token.
      - `400 Bad Request`: Invalid Telegram user or validation failure.

2. **Get Current User Info (`GET /api/user`)**

    - **Description**: Retrieves the authenticated user's profile.
    - **Responses**:
      - `200 OK`: Returns user details including `id`, `fullName`, and `role`.
      - `401 Unauthorized`: Invalid or missing access token.

3. **Create New Quiz Card (`POST /api/card`)**

    - **Description**: Creates a new quiz card.
    - **Request Body**:
      ```json
      {
        "title": "English Vocabulary",
        "categoryId": "category-id-here",
        "items": [
          {
            "term": "Hello",
            "definition": "A greeting"
          }
        ]
      }
      ```
    - **Responses**:
      - `201 Created`: Card successfully created.
      - `400 Bad Request`: Missing or invalid fields.

4. **Get User's Cards (`GET /api/card/my`)**

    - **Description**: Fetches the list of cards created by the authenticated user.
    - **Responses**:
      - `200 OK`: Returns a list of cards.
      - `401 Unauthorized`: Invalid or missing access token.

For more endpoints and details, visit the [Swagger UI](https://quizzapp.sbsa.uz/api/docs).

---

## 🗂️ Project Structure

The project follows a modular architecture for maintainability:

```plaintext
├── prisma                 # Prisma-related files (ORM)
│   ├── migrations         # Database migration files
│   └── schema.prisma      # Prisma schema file for database modeling
├── public                 # Public assets and documentation
│   └── swagger-docs.json  # Swagger API documentation in JSON format
├── src                    # Main application source code
│   ├── bot                # Telegram bot directory
│   ├── config             # Project config files
│   ├── modules            # Modules logic folder
│   ├── prisma             # Prisma service integration
│   ├── app.module.ts      # Root module of the application
│   ├── main.ts            # Application entry point
│   └── common             # Common utilities (e.g., DTOs, constants)
├── .eslintrc.js           # ESLint configuration for code linting
├── .gitignore             # Specifies files and directories ignored by Git
├── .prettierrc            # Prettier configuration for code formatting
├── README.md              # Project documentation (this file)
├── ecosystem.config.js    # PM2 process management configuration
├── nest-cli.json          # NestJS CLI configuration
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Lock file for Node.js dependencies
├── tsconfig.build.json    # TypeScript build configuration
├── tsconfig.json          # TypeScript project configuration
└── .env                   # Environment variables

```

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Issues**:
   - Ensure that your `DATABASE_URL` is properly configured in the `.env` file.
   - Check if PostgreSQL is running on the correct port and that credentials are accurate.

2. **JWT Authentication Errors**:
   - Ensure the `JWT_SECRET` environment variable is correctly set.
   - If tokens are not validating, check if the token expiration time is configured properly.

3. **PM2 Process Not Starting**:
   - Make sure you have **PM2** installed globally:

     ```bash
     npm install -g pm2
     ```

   - If the process fails, check the logs using:

     ```bash
     pm2 logs
     ```

---

## 📄 License

This project is **UNLICENSED**.

---

## 🌐 Useful Links

- [QuizApp Backend Repository](https://github.com/yuldoshevuz/quizzapp-backend)
- [Swagger API Documentation](https://quizzapp.sbsa.uz/api/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

💡 **QuizApp Backend** — Powered by **NestJS**, **Prisma**, and **JWT**.
```

---

### Key Additions:
1. **Expanded API Documentation**: Includes a brief description and sample request/response bodies for key endpoints.
2. **Project Structure**: Gives a clear view of the folder layout to help developers navigate the codebase.
3. **Useful Links**: Added relevant links to documentation and the repository for quick access.

This should now provide a comprehensive guide for both developers and non-technical users to get started and understand the project.