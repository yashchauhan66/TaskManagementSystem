import React, { useState, useEffect, useRef } from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, handleDeleteTask, handleEditTask, currentUser }) => {
  const [taskUsers, setTaskUsers] = useState({});
  const fetchedUsers = useRef(new Set()); 

  useEffect(() => {
  
    if (currentUser?.role === 'admin' && tasks.length > 0) {
      const userIds = [...new Set(tasks.map(task => task.user).filter(Boolean))];
      userIds.forEach(userId => {
        if (!fetchedUsers.current.has(userId)) {
          const token = localStorage.getItem('token');
          fetch(`/api/v1/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(res => res.json())
          .then(data => {
            if (data.user) {
              setTaskUsers(prev => ({ ...prev, [userId]: data.user.name }));
              fetchedUsers.current.add(userId);
            }
          })
          .catch(err => console.error('Failed to fetch user:', err));
        }
      });
    }
  }, [tasks, currentUser]);

  return (
    <section className="tasks-section">
      <h2>{currentUser?.role === 'admin' ? 'All User Tasks' : 'Your Tasks'}</h2>
      {tasks.length === 0 ? (
        <p>{currentUser?.role === 'admin' ? 'No tasks found from any user.' : 'No tasks found. Create your first task!'}</p>
      ) : (
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status ${task.status}`}>{task.status}</span>
              </div>
              <p>{task.description}</p>
              <div className="task-footer">
                <small>
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                  {currentUser?.role === 'admin' && task.user && ` • User: ${taskUsers[task.user] || 'Loading...'}`}
                </small>
                <div className="task-actions">
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(task._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskList;
