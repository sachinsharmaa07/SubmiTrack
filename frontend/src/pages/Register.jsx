import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { register, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <h1>📝 SubmiTrack</h1>
            <p>Assignment Submission Portal</p>
          </div>

          <div className="auth-form">
            <h2>Create Account</h2>
            {error && <div className="error-alert">{error}</div>}
            {success && <div className="success-alert">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">I am a:</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="student">👨‍🎓 Student</option>
                  <option value="teacher">🏫 Teacher</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary btn-large">
                {loading ? 'Creating Account...' : 'Register'}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>

        <div className="auth-sidebar">
          <div className="features-list">
            <h3>✨ Getting Started</h3>
            <ul>
              <li>Create your account</li>
              <li>Choose your role</li>
              <li>Access assignments</li>
              <li>Submit or grade work</li>
              <li>Track progress</li>
              <li>Get instant feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
