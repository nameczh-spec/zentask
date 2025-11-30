// src/components/UserSettings.js
import React from 'react';
import useTaskStore from '../store'; // 假设你已创建 store.js

const UserSettings = () => {
  // 从 Zustand 获取和设置番茄钟时长
  const setPomodoroTime = useTaskStore((state) => state.setTimer); // 假设你在 store.js 中定义了 setTimer
  const pomodoroTime = useTaskStore((state) => state.pomodoro);
  
  const handleTimeChange = (e) => {
    const minutes = parseInt(e.target.value, 10);
    if (!isNaN(minutes) && minutes > 0) {
      setPomodoroTime(minutes * 60); // 转换为秒数
    }
  };

  return (
    <div className="user-settings card">
      <h3>⚙️ 应用设置</h3>
      
      <div className="setting-group">
        <h4>计时器配置</h4>
        <label>番茄钟时长 (分钟):</label>
        <input
          type="number"
          value={Math.floor(pomodoroTime / 60)} // 显示分钟数
          onChange={handleTimeChange}
          min="1"
        />
      </div>
      
    </div>
  );
};

export default UserSettings;