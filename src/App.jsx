import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (index) => {
    setTodo(todos[index].todo);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].todo = todo;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { todo, isCompleted: false }]);
    }

    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
  };

  const remaining = todos.filter((t) => !t.isCompleted).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-violet-50 via-purple-50 to-indigo-100 px-4 py-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* Add Task Card */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-4">
              {editIndex !== null ? "Edit your task" : "Add a new task"}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={todo}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                className="flex-1 h-16 sm:h-12 py-4 border border-gray-200 rounded-xl px-5 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all text-base"
              />
              <button
                onClick={handleAdd}
                className="h-12 sm:h-12 px-6 bg-linear-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold rounded-xl cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                {editIndex !== null ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Update
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Task List Card */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base sm:text-lg font-semibold text-gray-600">Your Tasks</h2>
              {todos.length > 0 && (
                <span className="text-xs sm:text-sm bg-violet-100 text-violet-600 font-medium px-3 py-1 rounded-full">
                  {remaining} remaining
                </span>
              )}
            </div>

            {todos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-gray-300 select-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm font-medium text-gray-400">No tasks yet</p>
                <p className="text-xs text-gray-300 mt-1">Add a task above to get started</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {todos.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                      item.isCompleted
                        ? "bg-gray-50 border-gray-100"
                        : "bg-violet-50/60 border-violet-100"
                    }`}
                  >
                    {/* Custom Circular Checkbox */}
                    <button
                      onClick={() => toggleComplete(index)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        item.isCompleted
                          ? "bg-violet-500 border-violet-500"
                          : "border-violet-300 hover:border-violet-500 bg-white"
                      }`}
                    >
                      {item.isCompleted && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Task Text */}
                    <span
                      className={`flex-1 min-w-0 text-sm sm:text-base break-words transition-all duration-200 ${
                        item.isCompleted
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {item.todo}
                    </span>

                    {/* Icon Buttons */}
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(index)}
                        title="Edit"
                        className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        title="Delete"
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default App;
