import React from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ taskForm, setTaskForm, handleCreateTask, handleUpdateTask, editingTask, clearEditing }) => {
  return (
    <section className="task-form-section">
      <h2>{editingTask ? 'Update Task' : 'Create New Task'}</h2>
      <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={taskForm.title}
          onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Task Description"
          value={taskForm.description}
          onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
          required
        />
        <select
          value={taskForm.status}
          onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">{editingTask ? 'Update Task' : 'Create Task'}</button>
        {editingTask && (
          <button type="button" onClick={clearEditing} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>
    </section>
  );
};

export default TaskForm;
