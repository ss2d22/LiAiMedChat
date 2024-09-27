# 🧠 LiMedAI Server

This is the backend server for the LiMedAI Chat App, designed to handle AI-powered responses for medical students at Zhejiang Shuren University.

## 🛠️ Technologies

- 🟢 Node.js
- 🚂 Express.js
- 🔷 TypeScript
- 🍃 MongoDB
- 🔌 Socket.IO
- 🔗 LangChain
- 🤖 ZhipuAI/OpenAI GPT-4
- 🐳 Docker

## 🚀 Getting Started

1. Clone the repository and navigate to the server directory:

```
git clone https://github.com/ss2d22/LiAiMedChat.git
cd limedaiserver
```

2. Create a `.env` file in the root directory with the following content:

```
PORT=your_port
FRONT_ORIGIN=your_frontend_origin
MONGODB_URI=mongodb://db:27017/limedaichat-app
OPENAI_API_KEY=your_openai_api_key
APP_HOST_PORT=your_host_port
APP_CONTAINER_PORT=your_container_port
JWT_ENCRYPTION_KEY=your_jwt_key
```

3. Build and run the Docker container:

For development:

```
docker-compose -f docker-compose.dev.yml up --build
```
Note: On some systems, you may need to use `docker compose up  -f docker-compose.dev.yml up --build`


For production:

```
docker-compose -f docker-compose.prod.yml up --build
```
Note: On some systems, you may need to use `docker compose up  -f docker-compose.prod.yml up --build`

## 📁 Project Structure

- `src/`: Source code

  - `controllers/`: controller functions
  - `models/`: Database models
  - `routes/`: API routes
  - `services/`: services for socket functions
  - `utils/`: Utility functions and socket setup
  - `assets/`: user uploads, vector stores and relevant assets
  - `middlewares`: middlewares
  - `scripts`: scripts for tasks
  - `types`: type declarations
  - `docs/`: API documentation
  - `tests/`: Unit and integration tests (tbd)

## 📚 API Documentation

The API is documented using OpenAPI 3.0 standards. You can view the documentation at:
[api documentation](https://bump.sh/sriramprojects/doc/limedai)

## 📫 Contact

For any queries or suggestions, please open an issue in this repository or reach out on discord at @sriram_0_7.
