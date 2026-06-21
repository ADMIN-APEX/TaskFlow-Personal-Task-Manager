import { useState, useEffect } from 'react';

export default function ApiRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=6')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not get tasks from the web.');
        setLoading(false);
      });
  }, [refreshCount]);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshCount(prev => prev + 1);
  };

  return (
    <div className="api-records-container card">
      <div className="api-header">
        <div className="api-title-section">
          <svg className="api-globe-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20"/>
          </svg>
          <h2>Sample Tasks from Web</h2>
          <span className="live-pill">Online Feed</span>
        </div>
      </div>

      <p className="section-desc">
        These items are loaded from a sample website online to show API connections.
      </p>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading tasks from web...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p className="error-message">{error}</p>
        </div>
      ) : (
        <div className="api-grid">
          {records.map((rec) => (
            <div key={rec.id} className={`api-card ${rec.completed ? 'completed' : ''}`}>
              <div className="api-card-header">
                <span className="api-id">ID: #{rec.id}</span>
                <span className={`status-indicator ${rec.completed ? 'completed' : 'pending'}`}>
                  {rec.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              <p className="api-title">{rec.title}</p>
            </div>
          ))}
        </div>
      )}

      <div className="api-actions">
        <button 
          className="btn btn-secondary btn-refresh" 
          onClick={handleRefresh}
          disabled={loading}
          aria-label="Refresh tasks list"
        >
          <svg className={loading ? 'spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l.56-1.19" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Refresh List
        </button>
      </div>
    </div>
  );
}
