import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { assignmentAPI, submissionAPI } from '../utils/api';
import '../styles/AssignmentDetail.css';

const DeadlineCountdown = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const diff = deadlineDate - now;

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsExpired(false);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const urgencyClass = timeLeft.days === 0 && timeLeft.hours < 24 ? 'urgent' : 
                        timeLeft.days <= 3 ? 'warning' : 'normal';

  return (
    <div className={`countdown-timer ${urgencyClass} ${isExpired ? 'expired' : ''}`}>
      <div className="countdown-label">Time Remaining</div>
      <div className="countdown-display">
        <div className="countdown-unit">
          <span className="countdown-value">{String(timeLeft.days || 0).padStart(2, '0')}</span>
          <span className="countdown-unit-label">Days</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <span className="countdown-value">{String(timeLeft.hours || 0).padStart(2, '0')}</span>
          <span className="countdown-unit-label">Hours</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <span className="countdown-value">{String(timeLeft.minutes || 0).padStart(2, '0')}</span>
          <span className="countdown-unit-label">Minutes</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <span className="countdown-value">{String(timeLeft.seconds || 0).padStart(2, '0')}</span>
          <span className="countdown-unit-label">Seconds</span>
        </div>
      </div>
      {isExpired && <div className="expired-message">📛 Deadline has passed</div>}
    </div>
  );
};

const AssignmentDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const assignRes = await assignmentAPI.getById(id);
      setAssignment(assignRes.data.assignment);

      // All users can fetch submissions for an assignment
      const subRes = await submissionAPI.getByAssignment(id);
      setSubmissions(subRes.data.submissions || []);
    } catch (err) {
      setError('Failed to load assignment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      setUploading(true);
      setError('');
      await submissionAPI.upload(id, file);
      setSuccessMsg('✅ File uploaded successfully!');
      setFile(null);
      
      // Refresh data and navigate
      setTimeout(async () => {
        setSuccessMsg('');
        await fetchData();
        // Navigate back to dashboard after successful submission
        navigate('/', { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading assignment...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="error-container">
        <h2>Assignment not found</h2>
        <Link to="/" className="btn btn-primary">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="assignment-detail">
      <Link to="/" className="back-button">← Back to Assignments</Link>

      <div className="detail-header">
        <div className="header-content">
          <h1>{assignment.title}</h1>
          <p className="subject-info">📚 {assignment.subject}</p>
        </div>
        <div className="marks-display">
          <span className="marks-value">⭐ {assignment.maxMarks}</span>
          <span className="marks-label">Total Marks</span>
        </div>
      </div>

      {error && <div className="error-alert">❌ {error}</div>}
      {successMsg && <div className="success-alert">{successMsg}</div>}

      <DeadlineCountdown deadline={assignment.deadline} />

      <div className="detail-content">
        <section className="description-section">
          <h2>📄 Assignment Details</h2>
          <p>{assignment.description}</p>
          {assignment.instructions && (
            <div className="instructions">
              <h3>📋 Instructions:</h3>
              <p>{assignment.instructions}</p>
            </div>
          )}
          <div className="deadline-info">
            <p><strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}</p>
          </div>
        </section>

        {user?.role === 'student' && (
          <section className="submission-section">
            <h2>📤 Submit Your Assignment</h2>
            {submissions.length > 0 && (
              <div className="previous-submission">
                <div className="submission-status-card">
                  <h3>✅ Submission Status</h3>
                  {submissions.map(sub => (
                    <div key={sub._id} className="status-details">
                      <p><strong>Status:</strong> <span className={`status-badge status-${sub.status}`}>{sub.status.toUpperCase()}</span></p>
                      <p><strong>Submitted:</strong> {new Date(sub.submittedAt).toLocaleString()}</p>
                      <p><strong>Timing:</strong> {sub.isLate ? '⚠️ Late' : '✅ On Time'}</p>
                      {sub.marks !== undefined && sub.marks !== null && (
                        <p><strong>Grade:</strong> {sub.marks}/{assignment.maxMarks}</p>
                      )}
                      <a href={`http://localhost:4000${sub.fileUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-small">
                        📥 Download
                      </a>
                    </div>
                  ))}
                  <p className="resubmit-info">You can resubmit to update your file.</p>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="file-input"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.zip"
                  disabled={uploading}
                  required
                />
                <label htmlFor="file-input" className="file-input-label">
                  {file ? `✅ ${file.name}` : '📁 Choose file (PDF, DOC, TXT, ZIP)'}
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={uploading || !file}
              >
                {uploading ? 'Uploading...' : 'Submit Assignment'}
              </button>
            </form>
          </section>
        )}

        {user?.role === 'teacher' && (
          <section className="submissions-section">
            <h2>📊 Student Submissions ({submissions.length})</h2>
            {submissions.length === 0 ? (
              <div className="empty-state">
                <p>📭 No submissions yet</p>
              </div>
            ) : (
              <div className="submissions-table">
                <div className="table-header">
                  <div>Student</div>
                  <div>Email</div>
                  <div>Status</div>
                  <div>Submitted At</div>
                  <div>Marks</div>
                  <div>Action</div>
                </div>
                {submissions.map(sub => (
                  <div key={sub._id} className="table-row">
                    <div className="student-col">{sub.studentId?.name || 'Unknown'}</div>
                    <div className="email-col">{sub.studentId?.email || 'N/A'}</div>
                    <div>
                      <span className={`status-badge status-${sub.status}`}>
                        {sub.isLate ? '⚠️ LATE' : '✅ '}{sub.status.toUpperCase()}
                      </span>
                    </div>
                    <div>{new Date(sub.submittedAt).toLocaleDateString()}</div>
                    <div className="marks-col">{sub.marks !== undefined && sub.marks !== null ? `${sub.marks}/${assignment.maxMarks}` : '—'}</div>
                    <div>
                      <Link
                        to={`/submission/${sub._id}`}
                        className="btn btn-secondary btn-small"
                      >
                        {sub.marks !== undefined && sub.marks !== null ? 'View' : 'Grade'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetail;
