import { create } from 'zustand';

// 初始状态定义
const initialTasks = [
  { id: 1, title: '示例任务 1', completed: false, priority: 'P1', project: '工作', dueDate: '2023-06-15' },
  { id: 2, title: '示例任务 2', completed: true, priority: 'P2', project: '个人', dueDate: '2023-06-16' },
];

const useTaskStore = create((set, get) => ({
  // 任务状态
  tasks: initialTasks,
  darkMode: true,
  customThemeColor: '#4a90e2',
  isModalOpen: false,
  currentView: 'inbox',
  
  // 番茄钟状态
  pomodoro: 25 * 60, // 25分钟 = 1500秒
  isCounting: false,
  
  // 任务相关动作
  addTask: (newTask) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        ...newTask,
        id: Date.now(),
        completed: false
      }
    ]
  })),
  
  toggleTask: (taskId) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  })),
  
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),
  
  // 视图相关动作
  setCurrentView: (view) => set({ currentView: view }),
  
  // 模态框相关动作
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  
  // 主题相关动作
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setThemeColor: (color) => set({ customThemeColor: color }),
  
  // 获取今日任务
  getTodayTasks: () => {
    const { tasks } = get();
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === today);
  },
  
  // 按项目分组任务
  getTasksByProject: () => {
    const { tasks } = get();
    const projects = {};
    tasks.forEach(task => {
      if (!projects[task.project]) {
        projects[task.project] = [];
      }
      projects[task.project].push(task);
    });
    return projects;
  },
  
  // 番茄钟相关动作
  startTimer: () => set({ isCounting: true }),
  stopTimer: () => set({ isCounting: false }),
  decrementTime: () => set((state) => ({ pomodoro: state.pomodoro > 0 ? state.pomodoro - 1 : 0 })),
  setTimer: (seconds) => set({ pomodoro: seconds }),
  setPomodoro: (minutes) => set({ pomodoro: minutes * 60 }), // 添加设置番茄钟时长的方法（接受分钟数）
}));

export default useTaskStore;