# 🧾 Retail Billing & Inventory Management System

A full-stack web application for managing retail billing, inventory, and user access — built with React.js and Spring Boot.

---

## 🚀 Live Demo

**[Live Link](#)** ← *(Coming soon)*

---

## 🎥 Project Demo

 
 
> ☝️ Replace the above URL with your actual video file URL after uploading the MP4 to this repo.

---

## 📸 Screenshots

### Login
![Login](screenshots/login.png)

### Items
![Dashboard](screenshots/dashboard.png)

### Category
![Billing](screenshots/billing.png)

### Payment

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), HTML5, CSS3 |
| Backend | Java 17, Spring Boot |
| Database | MySQL |
| Auth & Security | JWT, Spring Security |
| Tools | Postman, Git, GitHub |

---

## ✨ Features

- Role-based access — Admin and Cashier views
- JWT authentication with secured endpoints
- Product and inventory management
- Invoice generation and billing
- File upload support

---

## 🏃 Run Locally

### Backend
```bash
# Update src/main/resources/application.properties with your MySQL credentials
./mvnw spring-boot:run
```
Runs at `http://localhost:8080`

### Frontend
```bash
cd client
npm install
npm run dev
```
Runs at `http://localhost:5173`

---

## 👨‍💻 Author

**Sharath S** — [LinkedIn](https://www.linkedin.com/in/hey-rao/) · [GitHub](https://github.com/9sharathsrao)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | User login — returns JWT token |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add a new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete a product |
| GET | `/api/invoices` | Get all invoices |
| POST | `/api/invoices` | Create a new invoice |
| GET | `/api/inventory` | Get inventory status |

---

## 👨‍💻 Author

**Sharath S**
- 📧 sharathsrao4529@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/hey-rao/)
- 🐙 [GitHub](https://github.com/9sharathsrao)
