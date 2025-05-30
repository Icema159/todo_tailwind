import './App.css'
import TodoList from './components/TodoList';

function App() {
  return (
    <div id="root" className="min-h-screen max-w-[1280px] mx-auto p-8 text-center bg-black text-white font-sans">
      {/* Jei kada nors naudosim logotipą */}
      {/* <img className="h-24 p-6 will-change-[filter] transition-[filter] duration-300" src="..." alt="Logo" /> */}

      <TodoList />
    </div>
  );
}

export default App;