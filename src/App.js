import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import PomodoroTimer from './components/PomodoroTimer';
import FlipCountdown from './components/FlipCountdown';
import CustomToolbar from './components/CustomToolbar';
import AchievementSystem from './components/AchievementSystem';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: '示例任务 1', completed: false, priority: 'P1', project: '工作', dueDate: '2023-06-15' },
    { id: 2, title: '示例任务 2', completed: true, priority: 'P2', project: '个人', dueDate: '2023-06-16' },
  ]);
  
  const [darkMode, setDarkMode] = useState(true);
  const [customThemeColor, setCustomThemeColor] = useState('#4a90e2');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('inbox'); // 'inbox', 'today', 'projects', 'pomodoro', 'flipcountdown'

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? {...task, completed: !task.completed} : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(), // 简单的ID生成方式
      completed: false
    };
    setTasks([...tasks, task]);
  };

  const handleThemeChange = (color) => {
    setCustomThemeColor(color);
  };

  // 获取今日任务
  const getTodayTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === today);
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
        // 简化处理，按项目分组任务
        const projects = {};
        tasks.forEach(task => {
          if (!projects[task.project]) {
            projects[task.project] = [];
          }
          projects[task.project].push(task);
        });
        
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
      <header className="app-header">
        <h1>极简效率清单 (ZenTask)</h1>
        <div className="theme-toggle">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '🌙 深色模式' : '☀️ 浅色模式'}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <div className="task-stats">
          <p>总任务: {tasks.length} | 未完成: {tasks.filter(t => !t.completed).length}</p>
        </div>
        
        <div className="view-selector">
          <button 
            className={currentView === 'inbox' ? 'view-button active' : 'view-button'}
            onClick={() => setCurrentView('inbox')}
          >
            收件箱
          </button>
          <button 
            className={currentView === 'today' ? 'view-button active' : 'view-button'}
            onClick={() => setCurrentView('today')}
          >
            今日任务
          </button>
          <button 
            className={currentView === 'projects' ? 'view-button active' : 'view-button'}
            onClick={() => setCurrentView('projects')}
          >
            项目列表
          </button>
          <button 
            className={currentView === 'pomodoro' ? 'view-button active' : 'view-button'}
            onClick={() => setCurrentView('pomodoro')}
          >
            番茄时钟
          </button>
          <button 
            className={currentView === 'flipcountdown' ? 'view-button active' : 'view-button'}
            onClick={() => setCurrentView('flipcountdown')}
          >
            黑屏倒计时
          </button>
          <button 
            className={currentView === 'achievements' ? 'view-button active' : 'view-button'}
            onClick={() => setCurrentView('achievements')}
          >
            成就系统
          </button>
        </div>
        
        {renderCurrentView()}
      </main>
      
      <footer className="app-footer">
        <button className="add-task-button" onClick={() => setIsModalOpen(true)}>➕ 添加任务</button>
        <button className="pomodoro-button" onClick={() => setCurrentView('pomodoro')}>⏱️ 番茄时钟</button>
        <button className="today-button" onClick={() => setCurrentView('today')}>📅 今日任务</button>
      </footer>
      
      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
      
      <CustomToolbar onThemeChange={handleThemeChange} currentTheme={customThemeColor} />
    </div>
  );
}

export default App;
