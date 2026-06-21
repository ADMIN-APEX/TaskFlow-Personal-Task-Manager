import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('⚠️ Task title is required!');
      return;
    }

    if (title.trim().length < 3) {
      setError('⚠️ Title must be at least 3 characters.');
      return;
    }

    setError('');

    onAddTask({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    });

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('Work');
    setDueDate('');
  };

  return (
    <div className="task-form-container card">
      <div className="form-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>Add a New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="taskTitle">Task Name *</label>
          <input
            id="taskTitle"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="What needs to be done?"
            className={error ? 'input-error' : ''}
          />
          {error && <p className="error-message" role="alert">{error}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="taskDesc">Details (Optional)</label>
          <textarea
            id="taskDesc"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write task details here..."
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="taskPriority">Priority</label>
            <select
              id="taskPriority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="taskCategory">Category</label>
            <select
              id="taskCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Work">💻 Work</option>
              <option value="Personal">🏡 Personal</option>
              <option value="Studies">📚 Studies</option>
              <option value="Fitness">💪 Fitness</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="taskDueDate">Due Date</label>
          <input
            id="taskDueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-submit">
          <span>Add Task</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
}
