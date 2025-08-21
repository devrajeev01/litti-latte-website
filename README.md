#  Litti Latte - Coffee Website

Litti Latte is a **coffee-themed web application** featuring a working contact form, user authentication (Sign Up, Login, Logout), and a responsive frontend UI. It is built using the **MERN stack** (without React) and deployed on Render.

---
##  Live Preview
[Click Here to View](https://littilatte.onrender.com)


## 🚀 Features

* ✅ **Responsive UI** (TailwindCSS + HTML + JavaScript)
* ✅ **Contact Form with Backend Support**
* ✅ **User Authentication** (Signup, Login, Logout)
* ✅ **Session Management** using `express-session`
* ✅ **Secure Password Hashing** with `bcryptjs`
* ✅ **MongoDB Atlas Database Integration**
* ✅ **Deployed on Render/Railway**

---

## 🛠️ Tech Stack

### Frontend

* **HTML5** – Structure
* **TailwindCSS** – Styling
* **JavaScript** – Interactivity

### Backend

* **Node.js** – Runtime
* **Express.js** – Web framework

### Database

* **MongoDB Atlas** – Cloud Database
* **Mongoose** – ODM (Object Data Modeling)

### Other Tools & Libraries

* **bcryptjs** – Password hashing
* **dotenv** – Environment variables
* **express-session** – User sessions
* **EJS** – Templating engine
* **Render / Railway** – Deployment

---

## 📂 Project Structure

```bash
litti-latte/
│
├── models/             # Database models (e.g., User, Contact, etc.)
├── public/             # Static files (CSS, JS, Images)
├── views/              # Templates (EJS)
├── .gitignore          # Files ignored by Git
├── package-lock.json   # Auto-generated dependency lock file
├── package.json        # Project dependencies and scripts
├── server.js           # Entry point of the application
└── README.md          # Project documentation
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/devrajeev01/litti-latte.git
cd litti-latte
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a **.env** file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_secret_key
```

### 4. Start the server

```bash
npm start
```

The app will run on `http://localhost:5000`

---

## 🔑 Authentication Flow

1. **Sign Up** → User details stored in MongoDB (with password hashing)
2. **Login** → Validates credentials & starts a session
3. **Logout** → Ends session & redirects to homepage

---

## 📬 Contact Form

* Stores user messages in MongoDB 
* Backend validation for safe form handling

---

## 📦 Dependencies

```json
{
  "bcryptjs": "^3.0.2",
  "dotenv": "^17.2.1",
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "express-session": "^1.18.2",
  "mongodb": "^6.18.0",
  "mongoose": "^8.17.1"
}
```

---

## 🌍 Deployment

This project can be deployed on **Render**:

* Connect repository to deployment platform
* Add environment variables (`MONGO_URI`, `SESSION_SECRET`, `PORT`)
* Deploy and get live URL 

---

**Name:** Rajeev Kumar  
**Enrollment ID:** 1401/INFI25/038

---

