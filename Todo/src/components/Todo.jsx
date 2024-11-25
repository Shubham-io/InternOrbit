import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const [currentTodo, setCurrentTodo] = useState({
    todo: "", // task description
    id: "", // unique value
    isCompleted: false, // status of todo
  });

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const myTodos = localStorage.getItem("todos");
    if (myTodos) {
      console.log("todo hai");
      setTodos(JSON.parse(myTodos));
    }
  }, []);

  // handling input change
  const handleInputChange = (e) => {
    setCurrentTodo({
      ...currentTodo,
      todo: e.target.value,
      id: uuidv4(),
    });
  };

  // toggle todo state
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  //   create todo
  const addTodo = (e) => {
    if (currentTodo.todo.trim() === "") {
      toast.warning("Please enter a task");
      return;
    }

    setTodos([...todos, currentTodo]); // add todo with previous todos
    localStorage.setItem("todos", JSON.stringify([...todos, currentTodo]));

    setCurrentTodo({
      // reset values
      todo: "",
      id: "",
      isCompleted: false,
    });

    toast.success("Task created");
  };

  //   delete todo with id
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );

    toast.error("Task deleted");
  };

  const editTodo = (selectedTodo) => {
    // set todo for editing
    setCurrentTodo(selectedTodo);
    // delete previous todo
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== selectedTodo.id)
    );
  };

  return (
    <div className="relative h-screen w-screen">
      <img
        src="./bg.jpg"
        alt="bg"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm opacity-65 -z-10  select-none"
      />

      <div className="absolute md:top-28 top-16 z-10  w-full py-2 ">
        <h1 className="text-4xl font-bold  text-center m-10  text-gray-800">
          My Todo App
        </h1>

        <div className="flex flex-col justify-center md:w-1/2 w-[90%] mx-auto">
          {/* input box  */}
          <div className="flex md:flex-row flex-col justify-between rounded-md">
            <input
              type="text"
              placeholder="Enter your task"
              value={currentTodo.todo}
              className="flex-1 md:p-2 p-3 rounded-l-md  outline-none"
              onChange={(e) => handleInputChange(e)}
            />
            <button
              className="md:p-2 p-3 text-white text-lg rounded-md font-semibold md:mt-0 mt-2 bg-blue-500"
              onClick={addTodo}
            >
              Add todo
            </button>
          </div>
          <ul className="flex flex-col items-center mt-2 rounded-md space-y-2 py-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`w-full rounded-md ${
                  todo.isCompleted ? "bg-purple-200" : "bg-teal-800"
                }`}
              >
                <div className="flex justify-between px-4 py-2">
                  <div className="flex  space-x-4  ">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => toggleComplete(todo.id)}
                      className="mt-[3px] h-6 w-6 "
                    />

                    <p
                      className={`text-lg text-white ${
                        todo.isCompleted ? "line-through text-black" : ""
                      }`}
                    >
                      {todo.todo}{" "}
                    </p>
                  </div>
                  <div className="flex justify-between   space-x-6">
                    <button
                      className={`md:px-[26px] px-2 py-1  font-semibold rounded-sm bg-yellow-500 ${
                        todo.isCompleted ? "hidden" : ""
                      }`}
                      onClick={() => editTodo(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="md:px-[16px] px-2 py-1  rounded-sm bg-red-500 font-medium"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
