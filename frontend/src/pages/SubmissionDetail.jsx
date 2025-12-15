import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { submissionAPI } from '../utils/api';
import '../styles/SubmissionDetail.css';

const SubmissionDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [grading, setGrading] = useState(false);

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      const response = await submissionAPI.getById(id);
      setSubmission(response.data.submission);
      setMarks(response.data.submission.marks || '');
      setFeedback(response.data.submission.feedback || '');
      setError('');
    } catch (err) {
      setError('Failed to load submission');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGrade = async (e) => {
    e.preventDefault();
    if (marks === '') {
      setError('Please enter marks');
      return;
    }

    if (parseInt(marks) > submission.assignmentId?.maxMarks) {
      setError(`Marks cannot exceed ${submission.assignmentId?.maxMarks}`);
      return;
    }

    if (parseInt(marks) < 0) {
      setError('Marks cannot be negative');
      return;
    }

    try {
      setGrading(true);
      setError('');
      await submissionAPI.grade(id, parseInt(marks), feedback);
      setSuccessMsg('✅ Submission graded successfully!');
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to grade submission');
    } finally {
      setGrading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading submission details...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="error-container">
        <h2>Submission not found</h2>
        <Link to="/" className="btn btn-primary">Return to Dashboard</Link>
      </div>
    );
  }

  const getStatusColor = (status, isLate) => {
    if (isLate) return '#e74c3c';
    return status === 'graded' ? '#27ae60' : '#3498db';
  };

  return (
    <div className="submission-detail">
      <Link to="/" className="back-button">← Back</Link>

      <div className="detail-header">
        <div className="header-content">
          <h1>Submission Details</h1>
          <p className="student-name">👨‍🎓 {submission.studentId?.name}</p>
          <p className="assignment-name">📄 {submission.assignmentId?.title}</p>
        </div>
        <div className={`status-badge status-${submission.status} ${submission.isLate ? 'late' : ''}`}>
          {submission.isLate ? '⚠️ LATE' : '✅ ON TIME'}
        </div>
      </div>

      {error && <div className="error-alert">❌ {error}</div>}
      {successMsg && <div className="success-alert">{successMsg}</div>}

      <div className="detail-content">
        <section className="submission-info">
          <h2>📋 Submission Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>File Name</label>
              <p className="info-value">{submission.fileName}</p>
            </div>
            <div className="info-item">
              <label>Submitted At</label>
              <p className="info-value">{new Date(submission.submittedAt).toLocaleString()}</p>
            </div>
            <div className="info-item">
              <label>Submission Status</label>
              <p className="info-value">{submission.isLate ? '⚠️ Late Submission' : '✅ On Time'}</p>
            </div>
            <div className="info-item">
              <label>Max Marks</label>
              <p className="info-value">⭐ {submission.assignmentId?.maxMarks}</p>
            </div>
          </div>
          <div className="file-download-section">
            <a 
              href={submission.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-large"
              download
            >
              📥 Download Submission
            </a>
          </div>
        </section>

        {user?.role === 'teacher' && submission.status !== 'graded' && (
          <section className="grading-section">
            <h2>✏️ Grade This Submission</h2>
            <form onSubmit={handleGrade} className="grading-form">
              <div className="form-group">
                <label htmlFor="marks">
                  Marks Obtained 
                  <span className="max-marks">(max: {submission.assignmentId?.maxMarks})</span>
                </label>
                <div className="marks-input-wrapper">
                  <input
                    type="number"
                    id="marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    max={submission.assignmentId?.maxMarks}
                    min="0"
                    required
                    className="input-field"
                    placeholder="Enter marks"
                  />
                  <span className="marks-info">/ {submission.assignmentId?.maxMarks}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="feedback">Feedback for Student</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide constructive feedback to help the student improve..."
                  rows="6"
                  className="textarea-field"
                ></textarea>
                <p className="field-hint">Feedback is optional but recommended</p>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={grading || marks === ''}
              >
                {grading ? 'Submitting Grade...' : 'Submit Grade'}
              </button>
            </form>
          </section>
        )}

        {submission.status === 'graded' && (
          <section className="grades-section">
            <h2>📊 Grades & Feedback</h2>
            <div className="grade-card">
              <div className="grade-display">
                <span className="grade-value">{submission.marks}</span>
                <span className="grade-slash">/</span>
                <span className="grade-max">{submission.assignmentId?.maxMarks}</span>
              </div>

              <div className="grade-percentage">
                <div className="percentage-bar">
                  <div 
                    className="percentage-fill"
                    style={{width: `${(submission.marks / submission.assignmentId?.maxMarks) * 100}%`}}
                  ></div>
                </div>
                <span className="percentage-text">
                  {((submission.marks / submission.assignmentId?.maxMarks) * 100).toFixed(1)}%
                </span>
              </div>

              {submission.feedback && (
                <div className="feedback-box">
                  <h3>💬 Instructor Feedback:</h3>
                  <p>{submission.feedback}</p>
                </div>
              )}

              <div className="grade-meta">
                <p><strong>Graded by:</strong> {submission.gradedBy?.name || 'System'}</p>
                <p><strong>Graded on:</strong> {new Date(submission.gradedAt).toLocaleString()}</p>
              </div>
            </div>
          </section>
        )}

        {user?.role !== 'teacher' && (
          <section className="student-view-notice">
            <p>📌 This submission is being reviewed. Grades and feedback will appear here once grading is complete.</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetail;
