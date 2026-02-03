import { useState, useCallback } from 'react';
import { taskAPI } from '../services/api';

export const useTasks = (user) => {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async (token) => {
    try {
      
      const userRole = user?.role;
      const endpoint = userRole === 'admin' ? 'getAllTasks' : 'getTasks';
      
      const data = await taskAPI[endpoint](token);
      setTasks(data.AllTask || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [user]);

  const handleCreateTask = async (e, token) => {
    e.preventDefault();
    
    try {
      const data = await taskAPI.createTask(taskForm, token);
      
      setTasks([...tasks, data.task]);
      setTaskForm({ title: '', description: '', status: 'pending' });
      alert('Task created successfully!');
    } catch (error) {
      console.error('Task creation error details:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleUpdateTask = async (e, token) => {
    e.preventDefault();
    
    try {
      const data = await taskAPI.updateTask(editingTask._id, taskForm, token);
      
  
      setTasks(tasks.map(task => 
        task._id === editingTask._id ? { ...task, ...data.task } : task
      ));
      setTaskForm({ title: '', description: '', status: 'pending' });
      setEditingTask(null);
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Task update error details:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    console.log('Editing task:', task);
    setTaskForm({
      title: task.title,
      description: task.description,
      status: task.status
    });
    setEditingTask(task);
  };

  const handleDeleteTask = async (taskId, token) => {
    try {
      await taskAPI.deleteTask(taskId, token);
      
      setTasks(tasks.filter(task => task._id !== taskId));
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Task deletion error details:', error);
      alert('Network error. Please try again.');
    }
  };

  const clearEditing = () => {
    setTaskForm({ title: '', description: '', status: 'pending' });
    setEditingTask(null);
  };

  return {
    tasks,
    taskForm,
    setTaskForm,
    editingTask,
    setEditingTask,
    fetchTasks,
    handleCreateTask,
    handleUpdateTask,
    handleEditTask,
    handleDeleteTask,
    clearEditing
  };
};
