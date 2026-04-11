# 🛍️ SuitePremium Online Store

<div align="center">

![SuitePremium Banner](https://img.shields.io/badge/SuitePremium-Online%20Store-C0392B?style=for-the-badge&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Render-C0392B?style=for-the-badge)](https://suitepremium-onlinestore.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/omsml/SuitePremium-OnlineStore)
[![Java](https://img.shields.io/badge/Java%2017-Spring%20Boot-ED8B00?style=for-the-badge&logo=java)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-Railway-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://railway.app)
[![Docker](https://img.shields.io/badge/Docker-Containerised-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)

**A production-ready, full-stack e-commerce web application  .**

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Links](#-live-links)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Security](#-security)
- [Author](#-author)

---

## 📖 Overview

**SuitePremium Online Store** is a full-stack e-commerce platform that enables users to:

- Browse a premium product catalogue across multiple categories
- Register and log in securely
- Manage a real-time shopping cart
- Place, view, and cancel orders
- Admin panel to manage products and monitor all orders

The project demonstrates end-to-end software engineering — REST API design, relational database modelling, containerised deployment, and cloud hosting — mirroring real-world industry practices.

---

## 🔗 Live Links

| Resource | URL |
|---|---|
| 🌐 Live Application | [https://suitepremium-onlinestore.onrender.com](https://suitepremium-onlinestore.onrender.com) |
| 💻 GitHub Repository | [https://github.com/omsml/SuitePremium-OnlineStore](https://github.com/omsml/SuitePremium-OnlineStore) |
| 🛠 Admin Panel | [https://suitepremium-onlinestore.onrender.com/admin](https://suitepremium-onlinestore.onrender.com/admin) |

> ⚠️ **Note:** The app is hosted on Render's free tier. The first request may take **30–60 seconds** to wake up from sleep.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛒 Product Catalogue | Browse items with filters by category |
| 🔐 User Authentication | Secure register / login system |
| 🛍️ Shopping Cart | Add, update, remove items in real time |
| 📦 Order Management | Place orders, view history, cancel orders |
| 🔧 Admin Panel | Manage products and view all orders |
| 📱 Responsive UI | Works seamlessly across desktop and mobile screens |
| 🔒 Secure Credentials | All secrets managed via environment variables |
| ☁️ Cloud Deployed | Fully live on Render with Railway MySQL |

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| ☕ Java 17 | Core programming language |
| 🌱 Spring Boot 3.x | Backend framework & REST API |
| 💾 JPA / Hibernate | ORM — database entity mapping |
| 🗄 MySQL (Railway) | Relational database (cloud-hosted) |
| 🔑 CORS + SSL | Security configuration |

### Frontend
| Technology | Purpose |
|---|---|
| 🌐 HTML5 | Page structure |
| 🎨 CSS3 | Styling and responsive layout |
| ⚡ Vanilla JavaScript | Client-side interactions & API calls |

### DevOps & Deployment
| Technology | Purpose |
|---|---|
| 🐳 Docker | Multi-stage containerisation |
| ☁️ Render | Cloud hosting (Web Service) |
| 🚂 Railway | Managed MySQL database |
| 🔗 REST API | HTTP communication (relative paths) |

---

## 🏗 System Architecture

```
User / Browser
      │
      │  HTTP
      ▼
Frontend (HTML / CSS / JS)
 served from Spring Boot /static/
      │
      │  REST /api/*
      ▼
Spring Boot Backend (Render)
      │
      │  JDBC + SSL
      ▼
Railway MySQL Database
```

### Three-Tier Architecture

| Layer | Technology | Responsibility |
|---|---|---|
| Presentation | HTML5 / CSS3 / JS | User interface, rendered by browser |
| Application | Spring Boot 3.x | REST APIs, business logic, auth |
| Data | MySQL (Railway) | Persistent storage of all entities |
| Hosting | Render (Docker) | Cloud-containerised deployment |

---
   

---

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `POST` | `/api/products` | Add a new product *(admin)* |
| `DELETE` | `/api/products/{id}` | Delete a product *(admin)* |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Authenticate user |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | Get all orders *(admin)* |
| `POST` | `/api/orders` | Place a new order |
| `DELETE` | `/api/orders/{id}` | Cancel an order |

### Page Routes

| Route | Returns |
|---|---|
| `/` | `index.html` — main storefront |
| `/admin` | `admin.html` — admin panel |

---

## 🗄 Database Schema

The application uses a **Railway MySQL** database (`suite_db` / `railway`) :


> Tables are auto-managed by Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven 3.9+
- MySQL (local) or Railway account
- Docker (for containerised deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/omsml/SuitePremium-OnlineStore.git
cd SuitePremium-OnlineStore/Backend
```

### 2. Configure `application.properties`

```properties
# Local development
spring.datasource.url=jdbc:mysql://localhost:3306/suite_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

server.port=${PORT:8080}
```

### 3. Build and Run

```bash
# Build
mvn clean package -DskipTests

# Run
java -jar target/*.jar
```

### 4. Open in Browser

```
http://localhost:8080        → Storefront
http://localhost:8080/admin  → Admin Panel
http://localhost:8080/api/products → API test
```

---

## ☁️ Deployment

The application is deployed as a **single full-stack service** on Render — the Spring Boot backend serves the frontend static files directly, eliminating CORS issues.

---

## 🔐 Environment Variables

Set these in **Render → Environment** tab (never commit to source code):

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://<host>:<port>/railway?useSSL=true&requireSSL=true` |
| `SPRING_DATASOURCE_USERNAME` | `root` |
| `SPRING_DATASOURCE_PASSWORD` | Your Railway MySQL password |
| `PORT` | Auto-set by Render |

> ✅ No credentials are stored in the GitHub repository. All sensitive data is managed through Render's environment variable system.

---

## 🔒 Security

- ✅ All database credentials stored as **Render environment variables**
- ✅ External MySQL connections use **SSL encryption** (`useSSL=true`, `requireSSL=true`)
- ✅ CORS configured in Spring Boot to control allowed origins
- ✅ No passwords, DB URLs, or API keys appear in source code or Git history
- ✅ `allowPublicKeyRetrieval=true` used safely with SSL enforced

---

## 📊 Deployment Architecture

```
                    ┌─────────────────────────────┐
                    │       Render Cloud           │
                    │  ┌───────────────────────┐  │
  User Browser ────▶│  │  Spring Boot (Docker) │  │
                    │  │   + Static Frontend   │  │
                    │  └──────────┬────────────┘  │
                    └─────────────│───────────────┘
                                  │ JDBC + SSL
                    ┌─────────────▼───────────────┐
                    │       Railway Cloud          │
                    │     MySQL Database           │
                    └─────────────────────────────┘
```

---

## 👤 Author

**Omm Prakash Samal**

- 🔗 GitHub: [@omsml](https://github.com/omsml)
- 🌐 Live Project: [suitepremium-onlinestore.onrender.com](https://suitepremium-onlinestore.onrender.com)

---

## 🏢 Submitted To

 Internship Task Submission
> Full Stack Development Internship

---

## 📄 License

## License

This project is licensed under the MIT License © 2026 Omm Prakash Samal.

This software is provided for educational and demonstration purposes only.
It does not collect personal user data or process real financial transactions.

No sensitive credentials are exposed; secure practices are recommended for production use.
Users are responsible for implementing proper security before real-world deployment.
---

<div align="center">

Made with ❤️ using **Spring Boot · MySQL · Docker · Render**

⭐ Star this repo if you found it helpful!

</div>
