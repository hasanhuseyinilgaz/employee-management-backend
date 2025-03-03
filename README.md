# Employee Management Backend

This project is a **Node.js** and **Express.js** based API that provides the backend (server) side of the employee management system. Allows to manage employee information using **PostgreSQL** and **Sequelize ORM**.

## Features
- List, add, update and delete employees (CRUD operations)
- Uploading profile photos to employees
- PostgreSQL + Sequelize ORM integration
- Configurable database connection with .env file

## Technologies Used
- **Node.js & Express.js** - Web server
- **PostgreSQL & Sequelize** - Database and ORM management
- **Multer** - File upload operations
- **Dotenv** - Environmental variables management
- **Cors & Body-Parser** - API request management

## API Endpoints

### **Employee Operations (CRUD)**
| Method | Endpoint | Description |
|--------|----------------|------------------------------|
| `GET` | `/api/employees` | Get all employees |
| `GET` | `/api/employees/:id` | Get a specific employee |
| `POST` | `/api/employees` | Add a new employee |
| `PUT` | `/api/employees/:id` | Update employee |
| `DELETE` | `/api/employees/:id` | Delete employee |

### **Running Photo Upload**
| Method | Endpoint | Description |
|--------|------------------------|--------------------------------|
| `POST` | `/api/employees/:id/upload` | Upload employee profile photo |
