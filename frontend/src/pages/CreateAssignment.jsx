import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignmentAPI } from '../utils/api';
import '../styles/CreateAssignment.css';

const CreateAssignment = ({ user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    deadline: '',
    maxMarks: 100,
    instructions: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxMarks' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.subject || !formData.deadline) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await assignmentAPI.create(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create assignment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'teacher') {
    return (
      <div className="create-assignment-container">
        <div className="error-alert">Only teachers can create assignments</div>
      </div>
    );
  }

  return (
    <div className="create-assignment-container">
      <div className="create-assignment-box">
        <h1>📝 Create New Assignment</h1>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label htmlFor="title">Assignment Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Chapter 5 Problem Set"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the assignment..."
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea-field"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="e.g., Mathematics"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxMarks">Maximum Marks</label>
              <input
                type="number"
                id="maxMarks"
                name="maxMarks"
                min="1"
                max="1000"
                value={formData.maxMarks}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline *</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              placeholder="Additional instructions for students..."
              value={formData.instructions}
              onChange={handleChange}
              className="textarea-field"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-large"
            >
              {loading ? 'Creating...' : 'Create Assignment'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary btn-large"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
