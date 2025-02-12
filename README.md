# CodersMedia - Frontend

This is the **frontend** of CodersMedia, a social platform for developers to connect, showcase their skills, and collaborate. Built with **React, Tailwind CSS, and Redux**, it provides a clean and interactive UI for users.

---

## 🚀 Features

- 🔐 **User Authentication**: Secure login and signup  
- 📝 **Profile Management**: Edit profile with photo, skills, and bio  
- 🤝 **Connections**: Send, accept, and reject connection requests  
- 📢 **Posts & Interactions** (Upcoming): Users can share posts and engage with other developers  
- 🎨 **Modern UI**: Fully responsive design with **Tailwind CSS**  
- 🔄 **State Management**: **Redux** for smooth app performance  
- 🔗 **API Integration**: **Axios** for seamless communication with the backend  

---

## 🛠 Tech Stack

- **React** - UI Library  
- **Tailwind CSS** - Styling Framework  
- **Redux Toolkit** - State Management  
- **Axios** - API Requests  
- **React Router** - Navigation  

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/CtrlAltWin/CodersMedia.git
cd CodersMedia/frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables  

Create a `.env` file in the `frontend/` directory and add:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Replace `http://localhost:5000` with your **deployed backend URL** in production.

### 4️⃣ Start the Development Server

```bash
npm run dev
```

The app will run on **http://localhost:5173**.

---

## 📡 Deployment

### **Deploy on Vercel**

1. **Push** your frontend code to GitHub  
2. **Go to Vercel Dashboard**  
3. **Import the frontend repository**  
4. **Set the Root Directory** as `frontend/`  
5. **Add Environment Variables** (if required)  
6. Click **Deploy** 🚀  

---

## 📌 Folder Structure

```plaintext
📦 frontend
 ┣ 📂 public        # Static assets (favicon, images)
 ┣ 📂 src
 ┃ ┣ 📂 components  # Reusable UI components
 ┃ ┣ 📂 pages       # Pages (Login, Profile, Home)
 ┃ ┣ 📂 redux       # Redux state management
 ┃ ┣ 📂 utils       # Utility functions
 ┃ ┣ 📜 App.jsx     # Main App component
 ┃ ┣ 📜 main.jsx    # React root file
 ┣ 📜 .env.example  # Sample environment file
 ┣ 📜 package.json  # Dependencies & scripts
 ┣ 📜 README.md     # Project documentation
```

---

## 🛠 Contribution Guide

1. **Fork** the repository  
2. **Create a new branch** (`git checkout -b feature-name`)  
3. **Make changes** and **commit** (`git commit -m "Added new feature"`)  
4. **Push changes** (`git push origin feature-name`)  
5. **Open a Pull Request** on GitHub  

---

## 📞 Contact

For any issues or suggestions, open an issue on GitHub or reach out to **[@CtrlAltWin](https://github.com/CtrlAltWin)**.

---

🚀 **Happy Coding!**
