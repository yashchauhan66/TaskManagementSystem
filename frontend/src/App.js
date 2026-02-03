import React, { useEffect, useRef } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import './App.css';

function App() {
  const { user, isLogin, setIsLogin, formData, setFormData, handleAuth, handleLogout, fetchUserData } = useAuth();
  const { tasks, taskForm, setTaskForm, editingTask, fetchTasks, handleCreateTask, handleUpdateTask, handleEditTask, handleDeleteTask, clearEditing } = useTasks(user);
  
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUserData(token).then(() => {
          // After user data is fetched, fetch tasks once
          fetchTasks(token);
        });
      }
      initializedRef.current = true;
    }
  }, [fetchUserData, fetchTasks]); // Add dependencies to fix lint warning

  if (!user) {
    return (
      <LoginPage 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        formData={formData}
        setFormData={setFormData}
        handleAuth={handleAuth}
      />
    );
  }

  const token = localStorage.getItem('token');

  return (
    <Dashboard 
      user={user}
      tasks={tasks}
      taskForm={taskForm}
      setTaskForm={setTaskForm}
      handleCreateTask={(e) => handleCreateTask(e, token)}
      handleUpdateTask={(e) => handleUpdateTask(e, token)}
      handleEditTask={handleEditTask}
      handleDeleteTask={(taskId) => handleDeleteTask(taskId, token)}
      handleLogout={handleLogout}
      editingTask={editingTask}
      clearEditing={clearEditing}
    />
  );
}

export default App;
