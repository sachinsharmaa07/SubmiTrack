// Utility functions for deadline calculations

const calculateTimeRemaining = (deadline) => {
  const now = new Date();
  const deadlineTime = new Date(deadline);
  const diff = deadlineTime - now;

  if (diff <= 0) {
    return {
      isExpired: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      formattedTime: 'Expired'
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    isExpired: false,
    hours,
    minutes,
    seconds,
    totalSeconds,
    formattedTime,
    deadline: deadlineTime.toISOString()
  };
};

const isDeadlineApproaching = (deadline, warningHours = 24) => {
  const now = new Date();
  const deadlineTime = new Date(deadline);
  const diff = deadlineTime - now;
  const warningTime = warningHours * 3600 * 1000;

  return diff > 0 && diff <= warningTime;
};

const isSubmissionLate = (submittedAt, deadline) => {
  return new Date(submittedAt) > new Date(deadline);
};

const formatDeadlineForDisplay = (deadline) => {
  const date = new Date(deadline);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

module.exports = {
  calculateTimeRemaining,
  isDeadlineApproaching,
  isSubmissionLate,
  formatDeadlineForDisplay
};
