import { useState } from 'react';

export default function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category?.toLowerCase()) {
      case 'work': return '💻';
      case 'personal': return '🏡';
      case 'studies': return '📚';
      case 'fitness': return '💪';
      default: return '📋';
    }
  };

  return (
    <div className={`task-item-wrapper ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-item-main">
        <div className="task-item-left">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              aria-label={`Mark "${task.title}" as completed`}
            />
            <span className="checkmark"></span>
          </label>
          
          <div className="task-info-summary" onClick={() => setIsExpanded(!isExpanded)}>
            <span className="task-title">{task.title}</span>
            <div className="task-badges">
              <span className="category-badge">
                {getCategoryEmoji(task.category)} {task.category}
              </span>
              <span className={`badge ${getPriorityClass(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        <div className="task-item-right">
          <button 
            className={`btn-expand ${isExpanded ? 'active' : ''}`} 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Expand task details"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="btn-delete" 
            onClick={() => onDeleteTask(task.id)}
            aria-label={`Delete task "${task.title}"`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="task-item-details">
          {task.description && (
            <div className="detail-row description-section">
              <h4>Description</h4>
              <p>{task.description}</p>
            </div>
          )}
          
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Created:</span>
              <span className="meta-val">{task.createdAt}</span>
            </div>
            {task.dueDate && (
              <div className="meta-item">
                <span className="meta-label">Due Date:</span>
                <span className="meta-val highlight-due">{task.dueDate}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
