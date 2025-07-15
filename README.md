
# 📡 Fullstack Chat App

This repository contains a simple fullstack chat application with a **Vite + React frontend** and a **Node.js + WebSocket backend**, both managed in a single workspace.

---

## 🧩 Tech Stack
- 🚀 Frontend: [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TailwindCSS](https://tailwindcss.com/)
- 🔌 Backend: [Node.js](https://nodejs.org/) + [ws](https://github.com/websockets/ws) WebSocket library

---

## 📂 Project Structure

```
/
├── frontend/   # React frontend using Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── …
│
├── backend/    # Node.js backend with WebSocket server
│   ├── index.js (or main server file)
│   ├── package.json
│   └── …
│
├── .gitignore
├── README.md
```

---

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Install dependencies for both the frontend and backend:
```bash
cd frontend
npm install
cd ../backend
npm install
```

---

## 🖥 Running Locally

You’ll need to run both the frontend and backend separately.

### Run Backend
```bash
cd backend
npm run dev
```

By default, the backend WebSocket server runs at:
```
ws://localhost:8080
```

---

### Run Frontend
```bash
cd frontend
npm run dev
```

By default, the frontend runs at:
```
http://localhost:5173
```

Make sure the backend is running before you open the frontend, so it can connect to the WebSocket server.

---

## 🌐 Deployment

### Frontend
You can deploy the `frontend/` folder to [Vercel](https://vercel.com), [Netlify](https://www.netlify.com/), etc.
- Build command: `npm run build`
- Output folder: `dist/`

### Backend
Since Vercel does not support WebSockets, you can deploy the `backend/` folder to platforms like:
- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Fly.io](https://fly.io/)

Once deployed, update your frontend’s WebSocket connection URL to point to the backend’s deployed URL, for example:
```js
const ws = new WebSocket("wss://your-backend.onrender.com");
```

---

## 📄 Features
✅ Real-time messaging with WebSockets  
✅ Room-based chat  
✅ Responsive frontend with TailwindCSS  
✅ Clean and easy-to-understand codebase  

---

## 📬 Contributing
Pull requests are welcome.  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License
This project is licensed under the MIT License — feel free to use and adapt it!
