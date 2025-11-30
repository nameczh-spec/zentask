import React from 'react';
import useTaskStore from '../store'; // 确保引入你的 Zustand store
import FlipCountdown from './FlipCountdown'; // 导入翻页倒计时
import './PomodoroTimer.css';

function PomodoroTimer() {
    // 从 Zustand store 获取状态和动作
    const pomodoro = useTaskStore((state) => state.pomodoro);
    const isCounting = useTaskStore((state) => state.isCounting);
    const startTimer = useTaskStore((state) => state.startTimer);
    const stopTimer = useTaskStore((state) => state.stopTimer);
    const setTimer = useTaskStore((state) => state.setTimer);

    return (
        <div className="pomodoro-timer card"> {/* 添加 card 类名以应用通用样式 */}
            <h2>番茄钟</h2>
            {/* 翻页倒计时组件 */}
            <FlipCountdown seconds={pomodoro} />

            {/* 你的开始/重置按钮 */}
            <div className="timer-controls">
                <button onClick={isCounting ? stopTimer : startTimer}>
                    {isCounting ? '暂停' : '开始'}
                </button>
                <button onClick={() => { stopTimer(); setTimer(25 * 60); }}>重置</button>
            </div>
            {/* 你的预设时间按钮 */}
            <div className="preset-times">
                <button onClick={() => setTimer(5 * 60)}>5分钟</button>
                <button onClick={() => setTimer(25 * 60)}>25分钟 (番茄钟)</button>
                {/* 其他预设时间 */}
            </div>
        </div>
    );
}

export default PomodoroTimer;