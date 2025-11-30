// src/components/FlipCountdown.js
import React, { useState, useEffect, useRef } from 'react';
import './FlipCountdown.css';

const FlipCard = ({ current, next }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const prevRef = useRef(current);

  useEffect(() => {
    if (current !== prevRef.current) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
        prevRef.current = current;
      }, 600); // 匹配 CSS 动画时间
      return () => clearTimeout(timer);
    }
  }, [current]);

  return (
    <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
      <div className="flip-card-top">{prevRef.current}</div>
      <div className="flip-card-bottom">{prevRef.current}</div>
      <div className="flip-card-back-top">{current}</div>
      <div className="flip-card-back-bottom">{next}</div>
    </div>
  );
};

const FlipCountdown = ({ seconds }) => {
  const [time, setTime] = useState({
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const remainingSeconds = String(seconds % 60).padStart(2, '0');
    setTime({ minutes, seconds: remainingSeconds });
  }, [seconds]);

  return (
    <div className="flip-countdown">
      <FlipCard current={time.minutes[0]} next={String(Math.floor((seconds + 59) / 60)).padStart(2, '0')[0]} />
      <FlipCard current={time.minutes[1]} next={String(Math.floor((seconds + 59) / 60)).padStart(2, '0')[1]} />
      <div className="flip-separator">:</div>
      <FlipCard current={time.seconds[0]} next={String((seconds + 59) % 60).padStart(2, '0')[0]} />
      <FlipCard current={time.seconds[1]} next={String((seconds + 59) % 60).padStart(2, '0')[1]} />
    </div>
  );
};

export default FlipCountdown;