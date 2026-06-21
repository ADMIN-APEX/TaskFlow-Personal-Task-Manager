import { useState } from 'react';

export default function Header({ studentName, setStudentName, regNo, setRegNo, isDarkMode, setIsDarkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(studentName);
  const [tempReg, setTempReg] = useState(regNo);

  const handleSave = (e) => {
    e.preventDefault();
    setStudentName(tempName);
    setRegNo(tempReg);
    setIsEditing(false);
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="logo-section">
          <div className="logo-icon">⚡</div>
          <div className="brand">
            <h1>TaskFlow</h1>
            <span className="subtitle">Easy Task Manager</span>
          </div>
        </div>

        <div className="header-controls">
          <button 
            className="theme-toggle" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Change theme"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          
          <button 
            className="btn btn-secondary btn-student" 
            onClick={() => {
              setTempName(studentName);
              setTempReg(regNo);
              setIsEditing(!isEditing);
            }}
          >
            👤 Edit Student Details
          </button>
        </div>
      </div>

      <div className="header-desc-card">
        <p className="app-description">
          Welcome to <strong>TaskFlow</strong>. This tool helps you organize your daily work, set priorities, and track what you have done.
        </p>
        
        <div className="student-badge-container">
          <div className="student-badge">
            <span className="badge-label">Student Name:</span>
            <span className="badge-value">{studentName || 'Not set'}</span>
          </div>
          <div className="student-badge">
            <span className="badge-label">Reg Number:</span>
            <span className="badge-value">{regNo || 'Not set'}</span>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h3>Change Details</h3>
            <form onSubmit={handleSave} className="student-form">
              <div className="form-group">
                <label htmlFor="studentNameInput">Your Name</label>
                <input
                  id="studentNameInput"
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Type name here"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="regNoInput">Registration Number</label>
                <input
                  id="regNoInput"
                  type="text"
                  value={tempReg}
                  onChange={(e) => setTempReg(e.target.value)}
                  placeholder="Type registration number here"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
