import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import TodoItem from './TodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function TodoList() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const nodeRefs = useRef({});

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
  if (text.trim() === '') return;
  const newTask = {
    id: Date.now(),
    text,
    day: selectedDay, // ← čia svarbiausia
    completed: false
  };
  setTasks([...tasks, newTask]);
  setText('');
}

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function editTask(id, newText) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  }
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const todayIndex = new Date().getDay(); // 0 (Sun) – 6 (Sat)
const normalizedToday = todayIndex === 0 ? 6 : todayIndex - 1; // Paverčiam kad Mon = 0
const [selectedDay, setSelectedDay] = useState(daysOfWeek[normalizedToday]);  
return (
  <div className="w-full max-w-md mx-auto mt-10">

    {/* Viršutinė dalis: visa kortelė su fonu */}
    <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg">

      {/* Savaitės dienos */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
  <button
    key={day}
    onClick={() => setSelectedDay(day)}
    className={`p-2 text-sm text-center rounded-lg border transition
      ${day === selectedDay
        ? "bg-red-500 text-black font-bold border-red-400 shadow"
        : "bg-zinc-800 text-neutral-400 border-zinc-700 hover:border-zinc-500"}
    `}
  >
    {day}
  </button>
))}
      </div>

      {/* Įvedimo laukas */}
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
          placeholder="Įvesk užduotį..."
          className="flex-1 p-2 rounded bg-zinc-800 text-white placeholder-neutral-400 outline-none"
        />
        <button
          onClick={() => addTask(text)}
          aria-label="Pridėti užduotį"
          className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
        >
          <FaPlus />
        </button>
      </div>
    </div>

    {/* Užduočių sąrašas (atskirai po visa kortele) */}
    <div className="mt-6 space-y-3">
      <TransitionGroup>
        {tasks.map(task => {
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
}
export default TodoList;