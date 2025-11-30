import React, { useState } from 'react';
import './CustomToolbar.css';

const CustomToolbar = ({ onThemeChange, currentTheme }) => {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [customColor, setCustomColor] = useState('#4a90e2');

  const handleColorChange = (color) => {
    setCustomColor(color);
    if (onThemeChange) {
      onThemeChange(color);
    }
  };

  const presetColors = [
    '#4a90e2', // 默认蓝色
    '#ff4d4d', // 红色
    '#42a5f5', // 蓝色
    '#66bb6a', // 绿色
    '#ff9800', // 橙色
    '#9c27b0', // 紫色
    '#f44336', // 红色
    '#3f51b5'  // 靛蓝色
  ];

  return (
    <div className="custom-toolbar">
      <button 
        className="toolbar-toggle"
        onClick={() => setIsToolbarOpen(!isToolbarOpen)}
      >
        🎨
      </button>
      
      {isToolbarOpen && (
        <div className="toolbar-content">
          <h3>自定义主题</h3>
          
          <div className="color-picker-section">
            <h4>预设颜色</h4>
            <div className="preset-colors">
              {presetColors.map((color, index) => (
                <button
                  key={index}
                  className={`color-button ${customColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
          
          <div className="color-picker-section">
            <h4>自定义颜色</h4>
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="custom-color-input"
            />
          </div>
          
          <div className="theme-preview" style={{ borderColor: customColor }}>
            <p>主题预览</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomToolbar;