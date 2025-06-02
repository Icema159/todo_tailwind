import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import TodoItem from './TodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';

const TodoList = () => {
  const { t, i18n } = useTranslation();

  const [text, setText] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const nodeRefs = useRef({});

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const daysOfWeekKeys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysOfWeek = daysOfWeekKeys.map((day) => t(day));
  const todayIndex = new Date().getDay();
  const normalizedToday = todayIndex === 0 ? 6 : todayIndex - 1;
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[normalizedToday]);
  const visibleTasks = showAll
    ? tasks
    : tasks.filter(task => task.day === selectedDay);

  const addTask = (text) => {
    if (text.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text,
      day: selectedDay,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const toggleShowAll = () => {
    if (!showAll) {
      setSelectedDay(null);
    } else {
      setSelectedDay(daysOfWeek[normalizedToday]);
    }
    setShowAll(!showAll);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'lt' : 'en');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="grid grid-cols-7 gap-2">
  {daysOfWeek.map((label, index) => {
    const dayKey = daysOfWeekKeys[index];
    return (
      <button
        key={dayKey}
        onClick={() => {
          setSelectedDay(dayKey);
          setShowAll(false);
        }}
        className={`p-2 text-sm text-center rounded-lg border transition
          ${dayKey === selectedDay
            ? "bg-red-500 text-black font-bold border-red-400 shadow"
            : "bg-zinc-800 text-neutral-400 border-zinc-700 hover:border-zinc-500"}
        `}
      >
        {label}
      </button>
    );
  })}
</div>
          <button
            onClick={toggleLanguage}
            className="ml-4 px-3 py-1 rounded border text-sm hover:bg-zinc-800 border-zinc-600"
          >
            {i18n.resolvedLanguage === 'en' ? 'LT' : 'EN'}
          </button>
        </div>

        <div className="mb-4 text-center">
          <button
            onClick={toggleShowAll}
            className="mt-4 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-black font-semibold shadow"
          >
            {showAll ? t('Show selected day only') : t('Show all')}
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask(text);
              }
            }}
            placeholder={t('Enter a task')}
            className="flex-1 p-2 rounded bg-zinc-800 text-white placeholder-neutral-400 outline-none"
          />
          <button
            onClick={() => addTask(text)}
            aria-label={t('Add task')}
            className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <TransitionGroup>
          {visibleTasks.map(task => {
            if (!nodeRefs.current[task.id]) {
              nodeRefs.current[task.id] = React.createRef();
            }

            return (
              <CSSTransition
                key={task.id}
                timeout={300}
                classNames="fade"
                nodeRef={nodeRefs.current[task.id]}
              >
                <div ref={nodeRefs.current[task.id]}>
                  <TodoItem
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                    editTask={editTask}
                  />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TodoList;