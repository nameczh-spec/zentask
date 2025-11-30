import React, { useState, useEffect } from 'react';
import './FlipCountdown.css';

const FlipCountdown = ({ minutes, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60); // 转换为秒
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onComplete) onComplete();
    }
    
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0')
    };
  };

  const { minutes: displayMinutes, seconds: displaySeconds } = formatTime(timeLeft);

  return (
    <div className="flip-countdown">
      <div className="timer-display">
        <div className="time-unit">
          <div className="time-value">{displayMinutes[0]}</div>
          <div className="time-value">{displayMinutes[1]}</div>
          <span className="time-label">分钟</span>
        </div>
        <div className="separator">:</div>
        <div className="time-unit">
          <div className="time-value">{displaySeconds[0]}</div>
          <div className="time-value">{displaySeconds[1]}</div>
          <span className="time-label">秒</span>
        </div>
      </div>
      
      <div className="timer-controls">
        {!isRunning ? (
          <button className="control-button start-button" onClick={handleStart}>
            开始
          </button>
        ) : (
          <button className="control-button pause-button" onClick={handlePause}>
            暂停
          </button>
        )}
        <button className="control-button reset-button" onClick={handleReset}>
          重置
        </button>
      </div>
    </div>
  );
};

export default FlipCountdown;