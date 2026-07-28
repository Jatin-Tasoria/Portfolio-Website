# 🎓 Full-Stack Personal Portfolio & Infrastructure Showcase

A premium, interactive personal portfolio website designed for showcasing Cloud Engineering architectures, DevOps projects, and Linux scripting. 

This repository contains a modern React frontend with interactive 3D elements and a Node.js/Express email dispatch backend.

---

## 🚀 Key Features

* **Tech Stack Card**: A stylized, interactive card in the Hero section showcasing AWS expertise.
* **Core Technologies Showcase**: Progress indicators for AWS, Docker, Kubernetes, Terraform, CI/CD, and Java.
* **Decay Cards**: Interactive 3D tilt cards showing featured projects.
* **Integrated Linux Shell Demo**: Showcase interactive scripting capabilities.
* **Interactive Contact Form**: Custom-validated form sending email alerts using **Nodemailer**.
* **Smooth Scrolling**: Implemented using **Lenis** smooth scroll.
* **ngrok Integration**: Preconfigured to allow local tunneling and host headers (`.ngrok-free.app` / `.ngrok.io`).

---

## 🛠️ Tech Stack

### Frontend
* **Core**: React 19, HTML5, Javascript (ES6+)
* **Styling**: Tailwind CSS v4, Custom HSL Themes
* **Animations**: Framer Motion
* **Utilities**: Lucide Icons, Lenis Smooth Scroll

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Services**: Nodemailer (SMTP dispatch)
* **Development**: Nodemon

---

## 📁 Repository Structure

```
├── backend/
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ReactBits/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── TechStackCard.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── index.css
│   └── main.jsx
│
├── vite.config.js
└── package.json
```

---

## 💻 Local Development Setup

To run this project locally, clone this repository and follow the setup instructions for both frontend and backend.

### 1. Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the values in `.env` (leave SMTP details blank to simulate email dispatches via console log, or enter your SMTP credentials to send real emails).
5. Start the backend dev server (runs on port `5000` by default):
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate back to the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=/api/contact
   ```
4. Start the frontend development server (runs on port `5173` with a proxy to the backend):
   ```bash
   npm run dev
   ```

---

## 🌐 Public Sharing via ngrok

To share your local development server with external users or test on mobile browsers:
1. Expose the Vite server (port `5173`) using ngrok:
   ```bash
   ngrok http 5173
   ```
2. Vite is preconfigured (`vite.config.js`) to allow ngrok host headers (`.ngrok-free.app` and `.ngrok.io`).
3. Click "Visit Site" on the ngrok warning screen to load your local build on any remote device.
