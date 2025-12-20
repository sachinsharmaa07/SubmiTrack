import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateAssignment from './pages/CreateAssignment';
import AssignmentDetail from './pages/AssignmentDetail';
import SubmissionDetail from './pages/SubmissionDetail';
import './styles/App.css';

const ProtectedRoute = ({ children, isAuthenticated, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();

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
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-assignment"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <CreateAssignment user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignment/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <AssignmentDetail user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submission/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
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
