import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assignmentAPI } from '../utils/api';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await assignmentAPI.getAll();
      setAssignments(response.data.assignments || []);
      setError('');
    } catch (err) {
      setError('Failed to load assignments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDeadlineStatus = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));

    if (diff < 0) return { status: 'expired', label: 'Expired', color: '#999' };
    if (hoursLeft < 24) return { status: 'urgent', label: `${hoursLeft}h left`, color: '#ff6b6b' };
    if (hoursLeft < 72) return { status: 'warning', label: `${Math.floor(hoursLeft / 24)}d left`, color: '#ffa94d' };
    return { status: 'normal', label: `${Math.floor(hoursLeft / 24)}d left`, color: '#51cf66' };
  };

  const filteredAssignments = assignments.filter(a => {
    const status = getDeadlineStatus(a.deadline).status;
    if (filter === 'all') return true;
    return status === filter;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome, {user?.name}! 👋</h1>
          <p className="role-badge">{user?.role === 'teacher' ? '🏫 Instructor' : '👨‍🎓 Student'}</p>
        </div>
        {user?.role === 'teacher' && (
          <Link to="/create-assignment" className="btn btn-create">
            + Create Assignment
          </Link>
        )}
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="assignments-section">
        <div className="section-header">
          <h2>📋 Assignments</h2>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'urgent' ? 'active' : ''}`}
              onClick={() => setFilter('urgent')}
            >
              Urgent
            </button>
            <button
              className={`filter-btn ${filter === 'warning' ? 'active' : ''}`}
              onClick={() => setFilter('warning')}
            >
              Due Soon
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner-small"></div>
            <p>Loading assignments...</p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="empty-state">
            <p>📭 No assignments to display</p>
          </div>
        ) : (
          <div className="assignments-grid">
            {filteredAssignments.map(assignment => {
              const deadline = getDeadlineStatus(assignment.deadline);
              return (
                <div key={assignment._id} className={`assignment-card status-${deadline.status}`}>
                  <div className="card-header">
                    <div className="card-title">
                      <h3>{assignment.title}</h3>
                      <span className="subject-tag">{assignment.subject}</span>
                    </div>
                    <div className="deadline-badge" style={{ backgroundColor: deadline.color }}>
                      {deadline.label}
                    </div>
                  </div>

                  <p className="card-description">{assignment.description}</p>

                  <div className="card-meta">
                    <span className="meta-item">⭐ {assignment.maxMarks} marks</span>
                    <span className="meta-item">📅 {new Date(assignment.deadline).toLocaleDateString()}</span>
                  </div>

                  <div className="card-footer">
                    <Link
                      to={`/assignment/${assignment._id}`}
                      className="btn btn-secondary btn-small"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
