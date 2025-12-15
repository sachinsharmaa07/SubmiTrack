import React, { useEffect, useState } from 'react';
import { assignmentAPI } from '../utils/api';
import '../styles/Assignments.css';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await assignmentAPI.getAll();
        setAssignments(response.data.assignments);
      } catch (err) {
        setError('Failed to load assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <div className="loading">Loading assignments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="assignments-container">
      <h1>Active Assignments</h1>
      <div className="assignments-list">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="assignment-card">
            <h3>{assignment.title}</h3>
            <p><strong>Subject:</strong> {assignment.subject}</p>
            <p><strong>Max Marks:</strong> {assignment.maxMarks}</p>
            <p><strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}</p>
            <p className="description">{assignment.description}</p>
            <a href={`/assignment/${assignment._id}`} className="btn btn-primary">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
