# SubmiTrack

**Professional assignment submission and evaluation platform** built with the MERN stack. Enables students to submit assignments and teachers to grade them with real-time deadline tracking.

---

## Overview

SubmiTrack is a full-stack web application for managing assignment workflows in educational institutions. Students can submit files with automatic deadline tracking, while teachers can grade submissions and provide feedback through an intuitive interface.

### Features

- **JWT Authentication** - Secure login/register with role-based access control
- **Assignment Management** - Teachers create and manage assignments with deadlines
- **File Submissions** - Students upload assignment files (PDF, DOC, DOCX, TXT, ZIP)
- **Grading System** - Teachers grade submissions with marks and detailed feedback
- **Live Countdown Timer** - Real-time deadline tracking with urgency indicators
- **Role-Based Views** - Separate dashboards for students and teachers
- **Responsive Design** - Mobile-friendly interface (320px to 4K)
- **Secure API** - Protected endpoints with middleware authentication

---

## Tech Stack

**Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Bcryptjs  
**Frontend**: React 18, React Router v6, Axios, Vite, CSS3  
**DevOps**: Git, GitHub, npm

---

## Project Structure

```
SubmiTrack/
├── backend/
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js
│   │   ├── Assignment.js
│   │   └── Submission.js
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── assignmentController.js
│   │   ├── submissionController.js
│   │   └── deadlineController.js
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Auth & file upload
│   ├── utils/                  # Helper functions
│   ├── uploads/                # File storage
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom hooks
│   │   ├── styles/             # CSS files
│   │   ├── utils/              # Utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
└── README.md

---

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm

### Installation

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Access the app at http://localhost:5173 (Vite default)

### Demo Accounts
```
Student: student@test.com / password123
Teacher: teacher@test.com / password123
```

---

## API Endpoints

**Auth**
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

**Assignments**
- GET `/api/assignments` - Get all assignments
- POST `/api/assignments` - Create assignment (Teacher)
- GET `/api/assignments/:id` - Get assignment details
- PUT `/api/assignments/:id` - Update assignment (Teacher)
- DELETE `/api/assignments/:id` - Delete assignment (Teacher)

**Submissions**
- POST `/api/submissions/upload` - Upload file (Student)
- GET `/api/submissions/:assignmentId` - Get submissions (Teacher)
- PUT `/api/submissions/:submissionId/grade` - Grade submission (Teacher)

**Deadline**
- GET `/api/deadline/:assignmentId` - Get deadline info
- GET `/api/deadline/all/deadlines` - Get all deadlines

---

## Key Features

✅ JWT Authentication with 7-day token expiration  
✅ Role-based access control (Student/Teacher)  
✅ Assignment management with deadline tracking  
✅ File upload with validation (PDF, DOC, DOCX, TXT, ZIP - max 10MB)  
✅ Live countdown timer with urgency indicators  
✅ Teacher grading system with feedback  
✅ Persistent authentication with localStorage  
✅ Responsive design (320px to 4K)  

---

## Database Schema

**User**
```javascript
{ _id, name, email, password (hashed), role, createdAt }
```

**Assignment**
```javascript
{ _id, title, description, subject, createdBy, deadline, maxMarks, createdAt }
```

**Submission**
```javascript
{ _id, assignmentId, studentId, fileUrl, fileName, submittedAt, marks, feedback, status, gradedAt }
```

---

## Environment Setup

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/submitrack
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

---

## License

MIT License

**Version**: 1.0.0 | **Status**: ✅ Production Ready
