import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { assignmentAPI, submissionAPI } from '../utils/api';
import '../styles/AssignmentDetail.css';

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

      if (user?.role === 'teacher') {
        const subRes = await submissionAPI.getByAssignment(id);
        setSubmissions(subRes.data.submissions || []);
      } else {
        const subRes = await submissionAPI.getByStudent(user?._id);
        const studentSubmissions = subRes.data.submissions?.filter(s => s.assignmentId === id) || [];
        setSubmissions(studentSubmissions);
      }
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
      await submissionAPI.upload(id, file);
      setSuccessMsg('✅ File uploaded successfully!');
      setFile(null);
      setTimeout(() => {
        setSuccessMsg('');
        fetchData();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!assignment) {
    return <div className="error-container">Assignment not found</div>;
  }

  return (
    <div className="assignment-detail">
      <Link to="/" className="back-button">← Back to Assignments</Link>

      <div className="detail-header">
        <div>
          <h1>{assignment.title}</h1>
          <p className="subject-info">{assignment.subject}</p>
        </div>
        <div className="marks-display">
          <span className="marks-value">{assignment.maxMarks}</span>
          <span className="marks-label">Total Marks</span>
        </div>
      </div>

      {error && <div className="error-alert">{error}</div>}
      {successMsg && <div className="success-alert">{successMsg}</div>}

      <div className="detail-content">
        <section className="description-section">
          <h2>📄 Assignment Details</h2>
          <p>{assignment.description}</p>
          {assignment.instructions && (
            <div className="instructions">
              <h3>Instructions:</h3>
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
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="file-input"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.zip"
                  disabled={uploading}
                />
                <label htmlFor="file-input" className="file-input-label">
                  {file ? file.name : '📁 Choose file (PDF, DOC, TXT, ZIP)'}
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
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
              <div className="empty-state">No submissions yet</div>
            ) : (
              <div className="submissions-table">
                <div className="table-header">
                  <div>Student</div>
                  <div>Status</div>
                  <div>Submitted At</div>
                  <div>Marks</div>
                  <div>Action</div>
                </div>
                {submissions.map(sub => (
                  <div key={sub._id} className="table-row">
                    <div>{sub.studentId?.name || 'Unknown'}</div>
                    <div>
                      <span className={`status-badge status-${sub.status}`}>
                        {sub.status.toUpperCase()}
                      </span>
                    </div>
                    <div>{new Date(sub.submittedAt).toLocaleDateString()}</div>
                    <div>{sub.marks || '—'}</div>
                    <div>
                      <Link
                        to={`/submission/${sub._id}`}
                        className="btn btn-small btn-secondary"
                      >
                        Grade
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
