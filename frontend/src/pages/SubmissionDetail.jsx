import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submissionAPI } from '../utils/api';
import '../styles/SubmissionDetail.css';

const SubmissionDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [grading, setGrading] = useState(false);

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const fetchSubmission = async () => {
    try {
      const response = await submissionAPI.getById(id);
      setSubmission(response.data.submission);
      setMarks(response.data.submission.marks || '');
      setFeedback(response.data.submission.feedback || '');
    } catch (err) {
      setError('Failed to load submission');
    } finally {
      setLoading(false);
    }
  };

  const handleGrade = async (e) => {
    e.preventDefault();
    if (!marks) {
      setError('Please enter marks');
      return;
    }

    try {
      setGrading(true);
      await submissionAPI.grade(id, parseInt(marks), feedback);
      alert('✅ Submission graded successfully!');
      navigate(-1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to grade');
    } finally {
      setGrading(false);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!submission) {
    return <div className="error-container">Submission not found</div>;
  }

  return (
    <div className="submission-detail">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-header">
        <div>
          <h1>Submission Details</h1>
          <p className="student-name">Student: {submission.studentId?.name}</p>
          <p className="assignment-name">Assignment: {submission.assignmentId?.title}</p>
        </div>
        <div className={`status-badge status-${submission.status}`}>
          {submission.status.toUpperCase()}
        </div>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="detail-content">
        <section className="submission-info">
          <h2>📋 Submission Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>File Name</label>
              <p>{submission.fileName}</p>
            </div>
            <div className="info-item">
              <label>Submitted At</label>
              <p>{new Date(submission.submittedAt).toLocaleString()}</p>
            </div>
            <div className="info-item">
              <label>Submission Type</label>
              <p>{submission.isLate ? '⚠️ Late' : '✅ On Time'}</p>
            </div>
            <div className="info-item">
              <label>Max Marks</label>
              <p>{submission.assignmentId?.maxMarks}</p>
            </div>
          </div>
          <div className="file-link">
            <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              📥 Download Submission
            </a>
          </div>
        </section>

        {user?.role === 'teacher' && (
          <section className="grading-section">
            <h2>✏️ Grade Submission</h2>
            <form onSubmit={handleGrade} className="grading-form">
              <div className="form-group">
                <label htmlFor="marks">Marks (out of {submission.assignmentId?.maxMarks})</label>
                <input
                  type="number"
                  id="marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  max={submission.assignmentId?.maxMarks}
                  min="0"
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="feedback">Feedback</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide constructive feedback..."
                  rows="6"
                  className="textarea-field"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={grading}
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
                <span className="grade-max">/ {submission.assignmentId?.maxMarks}</span>
              </div>
              {submission.feedback && (
                <div className="feedback-box">
                  <h3>Instructor Feedback:</h3>
                  <p>{submission.feedback}</p>
                </div>
              )}
              <p className="graded-by">Graded by: {submission.gradedBy?.name}</p>
              <p className="graded-at">Graded on: {new Date(submission.gradedAt).toLocaleString()}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetail;
