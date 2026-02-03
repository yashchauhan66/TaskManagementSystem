import React from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

const Dashboard = ({ 
  user, 
  tasks, 
  taskForm, 
  setTaskForm, 
  handleCreateTask, 
  handleUpdateTask,
  handleEditTask,
  handleDeleteTask, 
  handleLogout,
  editingTask,
  clearEditing
}) => {
  return (
    <div className="dashboard">
      <Header user={user} handleLogout={handleLogout} />
      <main className="main-content">
        <TaskForm 
          taskForm={taskForm} 
          setTaskForm={setTaskForm} 
          handleCreateTask={handleCreateTask}
          handleUpdateTask={handleUpdateTask}
          editingTask={editingTask}
          clearEditing={clearEditing}
        />
        <TaskList 
          tasks={tasks} 
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          currentUser={user}
        />
      </main>
    </div>
  );
};

export default Dashboard;
