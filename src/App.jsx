import { useState, useEffect, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    setShowUI(true); // show page fade-in on mount
  }, []);

  const handleInputChange = (e) => setTask(e.target.value);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex items-center justify-center p-4 transition-all">
      <Transition
        as={Fragment}
        show={showUI}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200 transition-all">
          <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6 tracking-tight">
            📝 My To-Do List
          </h1>

          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={handleInputChange}
              className="flex-grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white px-5 py-3 rounded-r-lg hover:bg-blue-600 transition-all"
            >
              Add
            </button>
          </div>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-400">No tasks yet! 🎉</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((t, index) => (
                <Transition
                  key={index}
                  appear={true}
                  show={true}
                  enter="transition-opacity transition-transform duration-300"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition-opacity duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-all group">
                    <span className="text-gray-800 group-hover:text-blue-600 transition">
                      {t}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </li>
                </Transition>
              ))}
            </ul>
          )}
        </div>
      </Transition>
    </div>
  );
}

export default App;
