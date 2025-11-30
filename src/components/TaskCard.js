import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority priority-${task.priority}`}>{task.priority}</span>
      </div>
      <div className="task-details">
        <p>项目: {task.project}</p>
        <p>截止日期: {task.dueDate}</p>
      </div>
      <div className="task-actions">
        <button 
          className={task.completed ? 'undo-button' : 'complete-button'}
          onClick={handleToggleComplete}
        >
          {task.completed ? '撤销完成' : '标记完成'}
        </button>
        <button className="delete-button" onClick={handleDelete}>
          删除
        </button>
      </div>
    </div>
  );
};

export default TaskCard;