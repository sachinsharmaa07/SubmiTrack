# 🚀 SubmiTrack - Quick Start Guide

## ⚡ Installation & Setup (5 minutes)

### Prerequisites
```bash
# Install Node.js 16+ from https://nodejs.org
# Install MongoDB from https://www.mongodb.com/try/download/community
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

---

## 📋 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment (Teacher)
- `GET /api/assignments/:id` - Get assignment details
- `PUT /api/assignments/:id` - Update assignment (Teacher)
- `DELETE /api/assignments/:id` - Delete assignment (Teacher)

### Submissions
- `POST /api/submissions/upload` - Upload file (Student)
- `GET /api/submissions/:assignmentId` - Get submissions (Teacher)
- `PUT /api/submissions/:submissionId/grade` - Grade submission (Teacher)

### Deadline
- `GET /api/deadline/:assignmentId` - Get deadline info
- `GET /api/deadline/all/deadlines` - Get all deadlines

---

## 👥 Test Accounts

### Student Account
```
Email: student@test.com
Password: password123
Role: student
```

### Teacher Account
```
Email: teacher@test.com
Password: password123
Role: teacher
```

---

## 🎯 Key Features

✅ JWT Authentication  
✅ Role-Based Access (Student/Teacher)  
✅ Assignment Management  
✅ File Upload & Submission  
✅ Deadline Tracking  
✅ Grading System  
✅ Responsive UI  

---

## 📁 Project Structure

```
backend/
├── models/       # MongoDB schemas
├── controllers/  # Business logic
├── routes/       # API endpoints
├── middleware/   # Auth & file upload
├── utils/        # Helper functions
└── server.js     # Main server

frontend/
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom hooks
│   ├── utils/       # API client
│   └── styles/      # CSS files
└── vite.config.js   # Vite config
```

---

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/submitrack
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

---

## 🐛 Troubleshooting

**Port 5000 in use?**
```bash
lsof -i :5000
kill -9 <PID>
```

**MongoDB not connecting?**
```bash
brew services start mongodb-community
```

**Frontend not loading?**
- Clear browser cache
- Restart Vite dev server
- Check if port 3000 is available

---

## 📚 Git Branches

```
main ← production ready
develop ← integration
├── feature-auth ✓
├── feature-backend-assignments ✓
├── feature-backend-submissions ✓
├── feature-frontend-ui ✓
├── feature-deadline-timer ✓
└── docs-readme ✓
```

---

## 🎓 College Submission Ready

✅ Full MERN stack implementation  
✅ Professional Git/GitHub workflow  
✅ Multiple branches & commits  
✅ GitHub Actions CI/CD  
✅ Comprehensive README  
✅ Production-ready code  

---

**Happy Coding! 🚀**
