import React, { useState, useEffect, useMemo } from 'react';
import './AchievementSystem.css';

const AchievementSystem = ({ tasks }) => {
  const [achievements, setAchievements] = useState([]);
  const [habits, setHabits] = useState([]);

  // 预定义的成就
  const achievementList = useMemo(() => [
    { id: 1, name: '初学者', description: '完成第一个任务', icon: '🎯', unlocked: false },
    { id: 2, name: '高效工作者', description: '一天内完成5个任务', icon: '⚡', unlocked: false },
    { id: 3, name: '完美主义者', description: '完成所有P1优先级任务', icon: '💎', unlocked: false },
    { id: 4, name: '坚持不懈', description: '连续7天完成任务', icon: '🔥', unlocked: false },
    { id: 5, name: '时间管理大师', description: '使用番茄钟完成10个任务', icon: '⏱️', unlocked: false },
  ], []);

  // 预定义的习惯追踪
  const habitList = useMemo(() => [
    { id: 1, name: '早起', target: 7, current: 0, unit: '天' },
    { id: 2, name: '阅读', target: 30, current: 0, unit: '分钟' },
    { id: 3, name: '运动', target: 3, current: 0, unit: '次/周' },
    { id: 4, name: '冥想', target: 10, current: 0, unit: '分钟' },
  ], []);

  // 初始化成就状态
  useEffect(() => {
    setAchievements(achievementList);
    setHabits(habitList);
  }, [achievementList, habitList]);

  // 显示成就通知
  const showAchievementNotification = (achievement) => {
    // 创建一个简单的通知元素
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-content">
        <h4>新成就解锁！</h4>
        <p>${achievement.name}: ${achievement.description}</p>
      </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease-out;
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      .achievement-icon {
        font-size: 24px;
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }
    }, 3000);
  };

  // 检查成就解锁条件
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed);
    const newAchievements = [...achievements];
    let updated = false;
    
    // 检查"初学者"成就
    if (completedTasks.length >= 1) {
      const beginner = newAchievements.find(a => a.id === 1);
      if (beginner && !beginner.unlocked) {
        beginner.unlocked = true;
        updated = true;
        showAchievementNotification(beginner);
      }
    }
    
    // 检查"高效工作者"成就
    const today = new Date().toISOString().split('T')[0];
    const todayCompleted = completedTasks.filter(task => 
      task.completed && task.dueDate === today
    );
    
    if (todayCompleted.length >= 5) {
      const efficient = newAchievements.find(a => a.id === 2);
      if (efficient && !efficient.unlocked) {
        efficient.unlocked = true;
        updated = true;
        showAchievementNotification(efficient);
      }
    }
    
    // 检查"完美主义者"成就
    const p1Tasks = tasks.filter(task => task.priority === 'P1');
    const completedP1Tasks = p1Tasks.filter(task => task.completed);
    
    if (p1Tasks.length > 0 && completedP1Tasks.length === p1Tasks.length) {
      const perfectionist = newAchievements.find(a => a.id === 3);
      if (perfectionist && !perfectionist.unlocked) {
        perfectionist.unlocked = true;
        updated = true;
        showAchievementNotification(perfectionist);
      }
    }
    
    if (updated) {
      setAchievements(newAchievements);
    }
  }, [tasks, achievements]);

  // 更新习惯进度
  const updateHabitProgress = (habitId, increment) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === habitId 
          ? { ...habit, current: Math.max(0, habit.current + increment) }
          : habit
      )
    );
  };

  return (
    <div className="achievement-system">
      <h2>成就与习惯</h2>
      
      {/* 成就展示 */}
      <section className="achievements-section">
        <h3>我的成就</h3>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
                <span className="achievement-status">
                  {achievement.unlocked ? '已解锁' : '未解锁'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 习惯追踪 */}
      <section className="habits-section">
        <h3>习惯追踪</h3>
        <div className="habits-list">
          {habits.map(habit => (
            <div key={habit.id} className="habit-item">
              <div className="habit-info">
                <h4>{habit.name}</h4>
                <p>{habit.current} / {habit.target} {habit.unit}</p>
              </div>
              <div className="habit-progress">
                <div 
                  className="progress-bar"
                  style={{
                    width: `${Math.min(100, (habit.current / habit.target) * 100)}%`
                  }}
                ></div>
              </div>
              <div className="habit-controls">
                <button onClick={() => updateHabitProgress(habit.id, -1)}>-</button>
                <button onClick={() => updateHabitProgress(habit.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AchievementSystem;