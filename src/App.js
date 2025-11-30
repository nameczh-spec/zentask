import React, { useState } from 'react'; // 确保导入 useState
import useTaskStore from './store';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import CustomToolbar from './components/CustomToolbar';
import PomodoroTimer from './components/PomodoroTimer';
import FlipCountdown from './components/FlipCountdown';
import AchievementSystem from './components/AchievementSystem';
import UserSettings from './components/UserSettings'; // 导入新创建的 UserSettings 组件
import './App.css';

function App() {
  const [showSettings, setShowSettings] = useState(false); // 控制设置页面显示
  
  // 使用Zustand状态管理
  const {
    tasks,
    darkMode,
    customThemeColor,
    isModalOpen,
    currentView,
    addTask,
    toggleTask,
    deleteTask,
    closeModal,
    setThemeColor,
    getTodayTasks,
    getTasksByProject
  } = useTaskStore();

  const handleToggleComplete = (taskId) => {
    toggleTask(taskId);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleAddTask = (newTask) => {
    addTask(newTask);
  };

  const handleThemeChange = (color) => {
    setThemeColor(color);
  };

  // 渲染当前视图
  const renderCurrentView = () => {
    switch (currentView) {
      case 'inbox':
        return (
          <>
            <h2>收件箱</h2>
            <TaskList 
              tasks={tasks} 
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          </>
        );
      case 'today':
        const todayTasks = getTodayTasks();
        return (
          <>
            <h2>今日任务</h2>
            <TaskList 
              tasks={todayTasks} 
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          </>
        );
      case 'projects':
        // 使用Zustand的getTasksByProject方法
        const projects = getTasksByProject();
        
        return (
          <>
            <h2>项目列表</h2>
            {Object.keys(projects).map(project => (
              <div key={project} className="project-section">
                <h3>{project}</h3>
                <TaskList 
                  tasks={projects[project]} 
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))}
          </>
        );
      case 'pomodoro':
        return (
          <>
            <h2>番茄时钟</h2>
            <PomodoroTimer />
          </>
        );
      case 'flipcountdown':
        return (
          <>
            <h2>黑屏翻牌倒计时</h2>
            <FlipCountdown minutes={5} onComplete={() => alert('时间到！')} />
          </>
        );
      case 'achievements':
        return (
          <>
            <h2>成就与习惯</h2>
            <AchievementSystem tasks={tasks} />
          </>
        );
      default:
        return (
          <TaskList 
            tasks={tasks} 
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        );
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ '--theme-color': customThemeColor }}>
      <div className="app-container">
        {/* 左侧主要工作区 */}
        <div className="main-content">
          <PomodoroTimer />
          {renderCurrentView()}
        </div>

        {/* 右侧侧边栏 */}
        <div className="sidebar">
          {/* 设置按钮 */}
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="settings-toggle-button"
          >
            {showSettings ? '返回主页' : '⚙️ 设置'}
          </button>
          
          {/* 根据状态显示设置或成就系统 */}
          {showSettings ? (
            <UserSettings /> // 使用新创建的 UserSettings 组件
          ) : (
            <AchievementSystem tasks={tasks} />
          )}
        </div>
      </div>
      
      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTask={handleAddTask}
      />
      
      <CustomToolbar onThemeChange={handleThemeChange} currentTheme={customThemeColor} />
    </div>
  );
}

export default App;