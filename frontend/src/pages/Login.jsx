import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [demo, setDemo] = useState(false);
  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Wait a moment for auth state to update, then navigate
      setTimeout(() => {
        navigate('/');
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const useDemoAccount = (role) => {
    setEmail(role === 'student' ? 'student@test.com' : 'teacher@test.com');
    setPassword('password123');
    setDemo(true);
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
            <h2>Welcome Back</h2>
            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary btn-large">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="divider">OR</div>

            <div className="demo-buttons">
              <button
                type="button"
                onClick={() => { useDemoAccount('student'); handleSubmit({ preventDefault: () => {} }); }}
                className="btn btn-demo btn-student"
                disabled={loading}
              >
                👨‍🎓 Demo Student
              </button>
              <button
                type="button"
                onClick={() => { useDemoAccount('teacher'); handleSubmit({ preventDefault: () => {} }); }}
                className="btn btn-demo btn-teacher"
                disabled={loading}
              >
                🏫 Demo Teacher
              </button>
            </div>

            <p className="auth-footer">
              Don't have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>

        <div className="auth-sidebar">
          <div className="features-list">
            <h3>✨ Features</h3>
            <ul>
              <li>✅ Easy Assignment Submission</li>
              <li>✅ Real-time Deadline Tracking</li>
              <li>✅ Instant Feedback & Grades</li>
              <li>✅ Secure File Storage</li>
              <li>✅ Role-based Access</li>
              <li>✅ Mobile Responsive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
