# 📝 Todo Management Application

A full-stack Todo Management System built using **ReactJS**, **C# .NET Web API**, and **SQL Server**.  
This project demonstrates complete CRUD operations, API integration, routing, event handling, and proper error handling using React Toastify.

---

## 🚀 Tech Stack

**Frontend**
- ReactJS
- JavaScript (ES6+)
- Axios
- React Router DOM
- React Toastify

**Backend**
- C# .NET Web API
- Entity Framework Core
- REST Architecture

**Database**
- SQL Server

---

## 📌 Features

- Create new Todos  
- View all Todos in a table  
- Filter Todos by **Pending** and **Completed**  
- Update existing Todos  
- Delete Todos  
- Smooth navigation using routing  
- Proper error & success messages using toast notifications  

---

## 🏗️ Project Architecture

```
React Frontend  →  C# .NET Web API  →  SQL Server Database
```

- React sends API requests  
- Web API handles CRUD logic  
- Entity Framework communicates with SQL Server  

---

## 📂 Folder Structure (Simplified)

```
/backend
   ├── Controllers/
   │     └── TodoController.cs
   ├── Models/
   │     └── Todo.cs
   ├── Data/
   │     └── AppDbContext.cs
   └── Program.cs

/frontend
   ├── src/
   │     ├── components/
   │     │      ├── Home.jsx
   │     │      ├── CreateTodo.jsx
   │     │      └── UpdateTodo.jsx
   │     ├── App.jsx
   │     ├── api.js
   │     └── index.js
   └── package.json
```

---

## 🛠️ Backend API Endpoints

### **1. Create Todo**
```
POST /api/todo
Body:
{
  "title": "Task title",
  "description": "Task description",
  "status": "Pending"
}
```

### **2. Get All Todos**
```
GET /api/todo
```

### **3. Get Todo by ID**
```
GET /api/todo/{id}
```

### **4. Update Todo**
```
PUT /api/todo/{id}
Body:
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "Completed"
}
```

### **5. Delete Todo**
```
DELETE /api/todo/{id}
```

---

## 🧱 How the Backend Works

1. Created a *Todo model* with required properties  
2. Connected Entity Framework with SQL Server  
3. Created Todo table through EF migrations  
4. Added CRUD endpoints using Web API  
5. Added exception handling and validations  

---

## 🎨 How the Frontend Works

- React fetches all todos using GET API  
- Displays them in separate tables (Pending & Completed)  
- Uses routing to navigate to Create & Update pages  
- Sends data to backend using Axios  
- Uses React Toastify for error/success messages  


## 📌 Environment Setup

### **Frontend**
Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### **Backend**
Update `appsettings.json`:
```
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=TodoDB;Trusted_Connection=True;"
}


## ✔️ Conclusion

This project demonstrates a complete Todo CRUD system using:
- React as the frontend UI  
- C# .NET Web API for backend  
- SQL Server for storage  

## 🖼️ Screenshots
![Home Page](screenshots/home.png)
<img width="1900" height="868" alt="Home_Page" src="https://github.com/user-attachments/assets/8b51e3c4-78a8-4fe8-b63a-2e924268c4ba" />

![Create](screenshots/create.png)
<img width="1897" height="872" alt="Create_Page" src="https://github.com/user-attachments/assets/af26a91d-40fe-418a-8863-0f01a55d9690" />

![Update](screenshots/update.png)
<img width="1831" height="822" alt="Home1" src="https://github.com/user-attachments/assets/41a30033-8952-4bf8-b6c9-a5efe73fbb99" />

It’s a perfect example of how a real full-stack application works end-to-end.
