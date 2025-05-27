import React, { useState } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleBlur = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
        />
        {isEditing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="bg-transparent border-b border-neutral-500 text-white outline-none"
          />
        ) : (
          <p
            onDoubleClick={() => setIsEditing(true)}
            className={`cursor-pointer ${task.completed ? "line-through text-neutral-500" : "text-white"}`}
          >
            {task.text}
           <small className="text-xs text-neutral-500"> • {task.day}
</small> 
          </p>
        )}
      </div>
      <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
  <FaTrashAlt size={14} />
</button>
    </div>
  );
}

export default TodoItem;