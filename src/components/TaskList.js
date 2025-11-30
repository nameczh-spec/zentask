import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;