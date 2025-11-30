import React, { useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('P2');
  const [project, setProject] = useState('个人');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        priority,
        project,
        dueDate
      });
      // 重置表单
      setTitle('');
      setPriority('P2');
      setProject('个人');
      setDueDate('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>添加新任务</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group">
            <label htmlFor="title">任务标题</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入任务描述..."
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">优先级</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="P1">P1 (紧急且重要)</option>
                <option value="P2">P2 (重要不紧急)</option>
                <option value="P3">P3 (紧急不重要)</option>
                <option value="P4">P4 (不紧急不重要)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="project">项目</label>
              <input
                type="text"
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="项目名称"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">截止日期</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              取消
            </button>
            <button type="submit" className="submit-button">
              添加任务
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;