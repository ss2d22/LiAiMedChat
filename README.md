<div align="center">
  <h1>🧠 LiMedAI Chat App</h1>
  <p>An AI-powered chat application for medical students form Zhejiang Shuren University in China.</p>

  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/-Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO" />
    <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/-OpenAPI-6BA539?style=for-the-badge&logo=openapi-initiative&logoColor=white" alt="OpenAPI" />
    <img src="https://img.shields.io/badge/-ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </div>
</div>

## 📖 About

LiMedAI is a sophisticated chat application designed specifically for medical students from Zhejiang Shuren University. It leverages AI technology to provide intelligent responses to queries with context to the module textbooks, enhancing the learning experience for students.

## 🌟 Features

- 🤖 AI-powered responses using LangChain and Zhipu Ai (OpenAI GPT-4o till approval)
- 💬 Real-time chat functionality with Socket.IO
- 📚 Context-aware conversations with vector-based retrieval
- 👻 Ghost buttons for viewing message context
- 🌐 Responsive design for seamless use across devices
- 🔐 Secure authentication system
- 📊 OpenAPI 3.0 compliant API documentation

## 🛠️ Technologies

- **Frontend**: React, Redux Toolkit, TypeScript, Tailwind CSS, Shad/Cn
- **Backend**: Express, Node.js, TypeScript
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **AI**: LangChain, ZhipuAi/OpenAI GPT-4
- **API Documentation**: OpenAPI 3.0, Swagger
- **Containerization**: Docker
- **Code Quality**: ESLint
- **Architecture**: MVC Design Pattern

## 🚀 Getting Started

### Frontend Setup

1. Navigate to the frontend directory:

```
git clone https://github.com/ss2d22/LiAiMedChat.git

cd limedaifrontend
```

2. Create a `.env.local` file with the following content:

```
VITE_BACKEND_BASE_URL=your_backend_url
```

3. Build and run the Docker container:

```
docker-compose up --build
```

Note: On some systems, you may need to use `docker compose up --build`

### Backend Setup

1. Navigate to the backend directory:

```
cd limedaiserver
```

2. Create a `.env` file with the following content:

```
PORT=your_port
FRONT_ORIGIN=your_frontend_origin
MONGODB_URI=mongodb://db:27017/limedaichat-app
OPENAI_API_KEY=your_openai_api_key
APP_HOST_PORT=your_host_port
APP_CONTAINER_PORT=your_container_port
JWT_ENCRYPTION_KEY=your_jwt_key
```

Note: if you modify ports for mongodb or are using cloud instead pls change accordingly or remove the depends on db

3. build and run the Docker container:

- For development:

```
docker-compose -f docker-compose.dev.yml up --build
```

Note: On some systems, you may need to use `docker compose up  -f docker-compose.dev.yml up --build`

- For production:

```
docker-compose -f docker-compose.prod.yml up --build
```

Note: On some systems, you may need to use `docker compose up  -f docker-compose.prod.yml up --build`

## 📚 API Documentation

The API is fully documented and compliant with OpenAPI 3.0 standards. You can view the documentation at:

[view api documentation here](https://bump.sh/sriramprojects/doc/limedai)

## 👥 Contact

For any queries or suggestions, please open an issue in this repository or reach out to me on discord at @sriram_0_7.

---

<div align="center">
Made with ❤️ for technology
</div>
