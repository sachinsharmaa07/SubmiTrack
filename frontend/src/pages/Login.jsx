import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    
    setError('');
    setLocalLoading(true);
    
    try {
      await login(email, password);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMsg);
      setLocalLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    const demoEmail = role === 'student' ? 'student@test.com' : 'teacher@test.com';
    const demoPassword = 'password123';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setLocalLoading(true);
    
    try {
      await login(demoEmail, demoPassword);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Demo login failed';
      setError(errorMsg);
      setLocalLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-box">
          <div className="auth-header">
            <h1>📝 SubmiTrack DevopsS</h1>
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

              <button type="submit" disabled={localLoading} className="btn btn-primary btn-large">
                {localLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="divider">OR</div>

            <div className="demo-buttons">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="btn btn-demo btn-student"
                disabled={localLoading}
              >
                👨‍🎓 Demo Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('teacher')}
                className="btn btn-demo btn-teacher"
                disabled={localLoading}
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
