import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25分钟 = 1500秒
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [sessions, setSessions] = useState(0); // 完成的番茄钟次数

  const workTime = 25 * 60; // 25分钟
  const shortBreakTime = 5 * 60; // 5分钟
  const longBreakTime = 15 * 60; // 15分钟

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // 时间结束，切换模式
      if (mode === 'work') {
        // 完成一个番茄钟
        setSessions(sessions + 1);
        
        // 每4个番茄钟后进行长休息，否则短休息
        if ((sessions + 1) % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(longBreakTime);
        } else {
          setMode('shortBreak');
          setTimeLeft(shortBreakTime);
        }
      } else {
        // 休息结束，开始新的工作时间
        setMode('work');
        setTimeLeft(workTime);
      }
      
      // 播放提示音（在实际应用中可以添加音频）
      alert(mode === 'work' ? '休息时间结束，开始工作！' : '工作时间结束，开始休息！');
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, sessions, workTime, shortBreakTime, longBreakTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    
    switch (mode) {
      case 'work':
        setTimeLeft(workTime);
        break;
      case 'shortBreak':
        setTimeLeft(shortBreakTime);
        break;
      case 'longBreak':
        setTimeLeft(longBreakTime);
        break;
      default:
        setTimeLeft(workTime);
    }
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    
    switch (newMode) {
      case 'work':
        setTimeLeft(workTime);
        break;
      case 'shortBreak':
        setTimeLeft(shortBreakTime);
        break;
      case 'longBreak':
        setTimeLeft(longBreakTime);
        break;
      default:
        setTimeLeft(workTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeText = () => {
    switch (mode) {
      case 'work': return '工作时间';
      case 'shortBreak': return '短休息';
      case 'longBreak': return '长休息';
      default: return '工作时间';
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case 'work': return '#ff4d4d';
      case 'shortBreak': return '#42a5f5';
      case 'longBreak': return '#66bb6a';
      default: return '#ff4d4d';
    }
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer-display" style={{ borderColor: getModeColor() }}>
        <div className="mode-indicator" style={{ backgroundColor: getModeColor() }}>
          {getModeText()}
        </div>
        <div className="time">{formatTime(timeLeft)}</div>
        <div className="session-count">已完成: {sessions} 个番茄钟</div>
      </div>
      
      <div className="timer-controls">
        <button className="timer-button" onClick={toggleTimer}>
          {isActive ? '暂停' : '开始'}
        </button>
        <button className="timer-button" onClick={resetTimer}>
          重置
        </button>
      </div>
      
      <div className="mode-switcher">
        <button 
          className={`mode-button ${mode === 'work' ? 'active' : ''}`}
          onClick={() => switchMode('work')}
        >
          工作 (25:00)
        </button>
        <button 
          className={`mode-button ${mode === 'shortBreak' ? 'active' : ''}`}
          onClick={() => switchMode('shortBreak')}
        >
          短休息 (05:00)
        </button>
        <button 
          className={`mode-button ${mode === 'longBreak' ? 'active' : ''}`}
          onClick={() => switchMode('longBreak')}
        >
          长休息 (15:00)
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;