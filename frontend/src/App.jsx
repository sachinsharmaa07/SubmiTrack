import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AssignmentDetail from './pages/AssignmentDetail';
import SubmissionDetail from './pages/SubmissionDetail';
import '../styles/App.css';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar user={user} onLogout={logout} />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard key={refreshTrigger} user={user} onRefresh={() => setRefreshTrigger(t => t + 1)} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignment/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AssignmentDetail user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submission/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SubmissionDetail user={user} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
