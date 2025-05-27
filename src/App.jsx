console.log("App.jsx veikia");
import './App.css'
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans p-4">
      <TodoList />
    </div>
  );
}

export default App;