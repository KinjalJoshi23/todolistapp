import { useState } from 'react';
import Navbar from './Navbar';
import { useEffect } from 'react';

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
    setTodo(e.target.value)

  }

  const toggleComplete = (index) => {
  const updatedTodos = [...todos];
  updatedTodos[index].isCompleted =
    !updatedTodos[index].isCompleted;
  setTodos(updatedTodos);
};
  return (
    <>
   <Navbar />

     <div className='h-[85vh] w-[80vw] border bg-cyan-400 border-cyan-400 mt-5 ml-35 p-5 rounded-md'>
        <h2 className='font-bold text-[20px] text-white text-center mb-4'>Add To Do</h2>
        <div className='flex justify-center gap-5'>
            <input 
            type="text" 
  placeholder='Type your to do here...'
  value={todo}
  onChange={handleChange}
  className='focus:outline-none w-[80%] h-12 border border-cyan-100 rounded-md px-2.5 py-3 bg-cyan-50 text-black'
/>
            <button onClick={handleAdd}
            className='hover:bg-cyan-200 cursor-pointer w-25 h-12 border border-cyan-100 rounded-md  bg-cyan-50 text-black transition-all duration-300'>Add</button>
        </div>
        <div>
        <h2 className='font-bold text-[20px] text-white text-center mb-4 mt-4'>Your To Do</h2>
        <div className='flex flex-col items-center gap-5'>
      {todos.map((item, index) => {
  return (
    <div key={index} className="flex items-center gap-3">

      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={() => toggleComplete(index)}
      />

     <div
  className={`rounded-md border border-cyan-100 bg-cyan-100 
  w-180 min-h-12 px-3 py-2 wrap-break-word ${
    item.isCompleted ? "line-through opacity-50" : ""
  }`}
>
  {item.todo}
</div>

      <button
        onClick={() => handleEdit(index)}
        className='hover:bg-cyan-300 cursor-pointer w-28 h-12 border border-cyan-300 rounded-md bg-cyan-50 text-black transition-all duration-300'
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(index)}
        className='hover:bg-red-600 cursor-pointer w-28 h-12 border border-red-500 rounded-md bg-red-500 text-white transition-all duration-300'
      >
        Delete
      </button>

    </div>
  );
})}
</div>
         
        </div>
    </div>
     
    </>
  )
}

export default App;
