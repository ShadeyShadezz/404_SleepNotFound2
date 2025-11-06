// HomePage.jsx
import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard'; 
import CloudDecoration from '../components/CloudDecoration';
import '../Styles/Pages.css';
import najahLogo from '../assets/najah logo.png';
    
export default function HomePage() {
  const sampleTasks = [
    { id: 1, subject: 'Mathematics', task: 'Complete calculus hw', color: '#FFF4B8', completed: false },
    { id: 2, subject: 'EL4', task: 'Write 5 paragraphs to essay', color: '#FFD4D4', completed: false },
    { id: 3, subject: 'Art', task: 'Work on painting for 1 hour', color: '#E4C4F4', completed: true }
  ];

  const [recentTasks, setRecentTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('tasks_v1');
      if (raw) return JSON.parse(raw);
      // convert sampleTasks to the shape TasksPage uses (subject, description, done)
      return sampleTasks.map(t => ({ id: t.id, subject: t.subject, description: t.task, color: t.color, done: !!t.completed }));
    } catch {
      return sampleTasks.map(t => ({ id: t.id, subject: t.subject, description: t.task, color: t.color, done: !!t.completed }));
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks_v1', JSON.stringify(recentTasks));
    } catch {}
  }, [recentTasks]);

  function toggleCompleted(id) {
    setRecentTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  return ( 
    <div className="home-page"> 
      <CloudDecoration />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="profile-icon">
          <img src={najahLogo} alt="Najah Logo" className="logo-image" />
        </div>
        <h1 className="app-title">Najah</h1>
        <p className="tagline">Your peaceful companion for productive studying</p>
        <div className="points-badge">
          <span className="points-icon">✓</span>
          <span>248 points</span>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="dashboard-grid">
        <DashboardCard title="Total tasks" value={recentTasks.length} color="#F97316" />
        <DashboardCard title="Completed" value={recentTasks.filter(t => t.done).length} color="#10B981" />
        <DashboardCard title="Subjects" value={5} color="#3B82F6" />
      </div>

      {/* Recent Tasks Section */}
      <div className="recent-tasks">
        <h2 className="recent-tasks-title">Recent Tasks</h2>
        <div className="tasks-list">
          {recentTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-item ${task.done ? 'completed' : ''}`}
              style={{ backgroundColor: task.color || '#fff' }}
            >
              <div className="task-checkbox">
                <div
                  className={`checkbox ${task.done ? 'checked' : ''}`}
                  onClick={() => toggleCompleted(task.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleCompleted(task.id); }}
                  aria-pressed={task.done}
                  title={task.done ? 'Mark as undone' : 'Mark as done'}
                >
                  {task.done && <span>✓</span>}
                </div>
              </div>
              <div className="task-content">
                <h3 className="task-subject">{task.subject}</h3>
                <p className={`task-description ${task.done ? 'strikethrough' : ''}`}>
                  {task.description || 'No description'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
