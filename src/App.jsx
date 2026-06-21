import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ApiRecords from './components/ApiRecords';
import Footer from './components/Footer';
import logoImg from './assets/logo.jpg';
import './App.css';

export default function App() {
  const [hasEntered, setHasEntered] = useState(() => {
    const saved = localStorage.getItem('hasEnteredWorkspace');
    return saved ? JSON.parse(saved) : false;
  });

  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('studentName') || '';
  });
  const [regNo, setRegNo] = useState(() => {
    return localStorage.getItem('regNo') || '';
  });

  const [tasks, setTasks] = useState(() => {
    const savedReg = localStorage.getItem('regNo') || '';
    if (savedReg) {
      const saved = localStorage.getItem(`tasks_${savedReg}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [onboardingError, setOnboardingError] = useState('');

  const [apiUsers, setApiUsers] = useState([]);
  const [apiUsersLoading, setApiUsersLoading] = useState(true);

  // Fetch users for onboarding selector
  useEffect(() => {
    if (hasEntered) return;
    fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        setApiUsers(data);
        setApiUsersLoading(false);
      })
      .catch(err => {
        console.error('Error fetching onboarding users:', err);
        setApiUsersLoading(false);
      });
  }, [hasEntered]);

  useEffect(() => {
    localStorage.setItem('studentName', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('regNo', regNo);
  }, [regNo]);

  useEffect(() => {
    if (regNo) {
      localStorage.setItem(`tasks_${regNo}`, JSON.stringify(tasks));
    }
  }, [tasks, regNo]);

  useEffect(() => {
    localStorage.setItem('hasEnteredWorkspace', JSON.stringify(hasEntered));
  }, [hasEntered]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // Update page title
  useEffect(() => {
    if (hasEntered) {
      const activeCount = tasks.filter(t => !t.completed).length;
      document.title = `TaskFlow (${activeCount} Active Tasks)`;
    } else {
      document.title = "Welcome to TaskFlow";
    }
  }, [tasks, hasEntered]);

  // Welcome banner on mount / entry
  useEffect(() => {
    if (!hasEntered) return;
    
    const finishedCount = tasks.filter(t => t.completed).length;
    const bannerMsg = `👋 Welcome! You have finished ${finishedCount} tasks so far. Keep it up!`;
    const setupTimer = setTimeout(() => {
      setWelcomeMessage(bannerMsg);
    }, 0);
    const clearTimer = setTimeout(() => {
      setWelcomeMessage('');
    }, 6000);
    return () => {
      clearTimeout(setupTimer);
      clearTimeout(clearTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasEntered]);

  const initializeUserTasks = (userReg) => {
    const storageKey = `tasks_${userReg}`;
    const initializedKey = `tasksInitialized_v3_${userReg}`;
    
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        const priorities = ['High', 'Medium', 'Low'];
        const categories = ['Studies', 'Work', 'Personal', 'Fitness'];
        const mapped = data.map((todo, idx) => {
          return {
            id: todo.id + '-' + userReg,
            title: todo.title,
            completed: todo.completed,
            priority: priorities[idx % priorities.length],
            category: categories[idx % categories.length],
            createdAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
          };
        });
        setTasks(mapped);
        localStorage.setItem(storageKey, JSON.stringify(mapped));
        localStorage.setItem(initializedKey, 'true');
      })
      .catch(err => {
        console.error('Error fetching initial API tasks:', err);
        setTasks([]);
      });
  };

  const handleSelectProfile = (user) => {
    const name = user.name;
    const registration = `REG-${user.id}042${user.username.toUpperCase()}`;
    setStudentName(name);
    setRegNo(registration);
    
    const saved = localStorage.getItem(`tasks_${registration}`);
    const isV3 = localStorage.getItem(`tasksInitialized_v3_${registration}`);
    if (saved && isV3) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([]);
      initializeUserTasks(registration);
    }
    setHasEntered(true);
  };

  const handleLaunch = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setOnboardingError('⚠️ Please enter your name.');
      return;
    }
    if (!regNo.trim()) {
      setOnboardingError('⚠️ Please enter your registration number.');
      return;
    }
    setOnboardingError('');
    const registration = regNo.trim();
    setRegNo(registration);
    
    const saved = localStorage.getItem(`tasks_${registration}`);
    const isV3 = localStorage.getItem(`tasksInitialized_v3_${registration}`);
    if (saved && isV3) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([]);
      initializeUserTasks(registration);
    }
    setHasEntered(true);
  };

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (!hasEntered) {
    return (
      <div className="onboarding-portal">
        <div className="onboarding-card card">
          <div className="onboarding-brand">
            <img src={logoImg} alt="TaskFlow Logo" className="onboarding-logo-img" style={{ width: '64px', height: '64px', borderRadius: '16px', marginBottom: '0.75rem', objectFit: 'cover' }} />
            <h1>TaskFlow</h1>
            <p className="onboarding-tagline">Easy Task Manager App</p>
          </div>

          <p className="onboarding-description">
            Organize your daily tasks, filter them, see your progress, and get sample tasks from an online list.
          </p>

          <div className="profile-selector">
            <h3>Choose an Account to Continue</h3>
            {apiUsersLoading ? (
              <div className="loading-state" style={{ padding: '1rem' }}>
                <div className="spinner"></div>
                <p style={{ fontSize: '0.85rem' }}>Fetching accounts...</p>
              </div>
            ) : apiUsers.length > 0 ? (
              <div className="profile-cards">
                {apiUsers.map((user, idx) => {
                  const avatars = ['🧑‍💻', '👩‍💻', '👨‍💻'];
                  return (
                    <button
                      key={user.id}
                      className="profile-card btn"
                      style={{ padding: '0.85rem 1.25rem', width: '100%' }}
                      onClick={() => handleSelectProfile(user)}
                    >
                      <span className="profile-avatar">{avatars[idx % avatars.length]}</span>
                      <div className="profile-details">
                        <span className="profile-name">{user.name}</span>
                        <span className="profile-meta">{user.email} • REG-{user.id}042{user.username.toUpperCase()}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Offline: Setup manual details below.
              </p>
            )}
          </div>

          <div className="onboarding-divider">OR</div>

          <form onSubmit={handleLaunch} className="onboarding-form">
            <h3>Enter Manual Details</h3>
            
            <div className="form-group">
              <label htmlFor="onboardName">Student Name</label>
              <input
                id="onboardName"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter Student Name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="onboardReg">Registration Number</label>
              <input
                id="onboardReg"
                type="text"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="Enter Registration Number"
                required
              />
            </div>

            {onboardingError && <p className="error-message" role="alert">{onboardingError}</p>}

            <button type="submit" className="btn btn-primary btn-launch">
              <span>Start Using App</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          <div className="onboarding-footer">
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container animate-fade-in">
      {welcomeMessage && (
        <div className="welcome-toast" role="status">
          <p>{welcomeMessage}</p>
          <button className="toast-close" onClick={() => setWelcomeMessage('')}>✕</button>
        </div>
      )}

      <div className="main-content-wrapper">
        <Header 
          studentName={studentName}
          setStudentName={setStudentName}
          regNo={regNo}
          setRegNo={setRegNo}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setHasEntered={setHasEntered}
        />

        {/* Dashboard Statistics Widget */}
        <section className="stats-dashboard card">
          <div className="stat-card">
            <span className="stat-icon">📊</span>
            <div className="stat-info">
              <h3>{totalCount}</h3>
              <p>Total Tasks</p>
            </div>
          </div>
          
          <div className="stat-card">
            <span className="stat-icon text-success">✔️</span>
            <div className="stat-info">
              <h3>{completedCount}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon text-pending">⏳</span>
            <div className="stat-info">
              <h3>{pendingCount}</h3>
              <p>Remaining</p>
            </div>
          </div>

          <div className="stat-progress-card">
            <div className="progress-header">
              <span>Progress</span>
              <span className="progress-percent">{completionRate}% Done</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </section>

        <div className="app-grid-layout">
          <div className="app-left-col">
            <TaskForm onAddTask={handleAddTask} />
          </div>

          <div className="app-right-col">
            <TaskList 
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>

        <ApiRecords />
        <Footer />
      </div>
    </div>
  );
}
