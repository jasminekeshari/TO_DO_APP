📝 Todo App (React + Axios + MockAPI)

A simple Todo List App built with ReactJS and Axios.
Features:

Add new todos

Mark todos as complete/incomplete

Edit todo titles

Delete todos

Data persists using MockAPI

🚀 Live Demo

👉 Live Site on Netlify

(replace with your actual Netlify link after deploying)

📂 Project Structure
src/
 ├── components/
 │    └── Todos.jsx
 ├── constant.js
 ├── main.jsx
 └── App.jsx

⚙️ Tech Stack

Frontend: ReactJS (Vite)

HTTP Client: Axios

Backend (Mock API): MockAPI.io

Deployment: Netlify

🛠️ Setup Instructions
1. Clone the repo
git clone https://github.com/yourusername/todo-app.git
cd todo-app

2. Install dependencies
npm install

3. Add your MockAPI URL

Inside src/constant.js:

export const BASE_URL = "https://your-mockapi-url.mockapi.io/todos";

4. Run locally
npm run dev


Visit → http://localhost:5173

5. Build for production
npm run build

🌍 Deployment on Netlify
Option 1: Manual Upload

Run npm run build

Upload the dist/ folder contents to Netlify

Option 2: GitHub Integration

Push your repo to GitHub

On Netlify, select "New Site from Git"

Choose your repo

Build command: npm run build

Publish directory: dist

Netlify will generate a live link 🎉

✨ Features to Add Later

User authentication (login/logout)

Separate lists per user

Search/filter todos

Dark mode

