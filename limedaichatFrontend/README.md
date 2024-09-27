# 🖥️ LiMedAI Frontend

This is the frontend application for the LiMedAI Chat App, providing an interactive interface for medical students at Zhejiang Shuren University to engage with AI-powered responses.

## 🛠️ Technologies

- ⚛️ React
- 🔄 Redux Toolkit
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🌈 Shad/Cn
- 🔌 Socket.IO-client
- ⚡ Vite

## 🚀 Getting Started

1. Clone the repository and navigate to the frontend directory:

```
git clone https://github.com/ss2d22/LiAiMedChat.git
cd limedaifrontend
```

2. Create a `.env.local` file in the root directory with the following content:

```
VITE_BACKEND_BASE_URL=your_backend_url
```

3. Build and run the Docker container:

```
docker-compose up --build
```

Note: On some systems, you may need to use `docker compose up --build`

## 📁 Project Structure

- `src/`: Source code
  - `components/`: React components
  - `pages/`: Page components
  - `state/`: Redux store and slices (api and global state)
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions
  - `types/`: TypeScript type definitions
  - `lib/`: tailwindCss util
  - `providers/`: providers such as socket provider
  - `context/`: context such as socket context
  - `assets/` : assets for the website
- `public/`: Static assets

## 🎨 Features

- 💬 Real-time chat interface
- 🧠 Context-aware AI responses
- 👻 Ghost buttons for viewing message context
- 📱 Responsive design for various devices
- 🔐 User authentication and profile management

## 🖌️ Styling

This project uses Tailwind CSS for styling.

## 📫 Contact

For any queries or suggestions, please open an issue in this repository or reach out on discord at @sriram_0_7.
