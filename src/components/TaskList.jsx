import { useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  const [filter, setFilter] = useState('all'); 
  const [priorityFilter, setPriorityFilter] = useState('all'); 
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allCount = tasks.length;
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    if (searchQuery.trim() !== '' && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="task-list-container card">
      <div className="task-list-header">
        <div className="header-title-area">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>Task List</h2>
        </div>
        
        <div className="search-bar">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>}
        </div>
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All <span className="count-badge">{allCount}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active <span className="count-badge">{activeCount}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed <span className="count-badge">{completedCount}</span>
          </button>
        </div>

        <div className="selectors-row">
          <div className="filter-select-wrapper">
            <label htmlFor="prioritySelector">Priority</label>
            <select 
              id="prioritySelector"
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <label htmlFor="categorySelector">Category</label>
            <select 
              id="categorySelector"
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Studies">Studies</option>
              <option value="Fitness">Fitness</option>
            </select>
          </div>
        </div>
      </div>

      <div className="tasks-scroll-area">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>✨ No tasks found.</p>
          </div>
        ) : (
          <div className="task-items-list">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
