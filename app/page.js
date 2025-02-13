"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInput = e => {
    setInput(e.target.value);
  };
  const handleTodo = () => {
    const newTodos = [...todos, input];
    setTodos(newTodos);
    console.log(newTodos);
    setInput("");
  };

  return (
    <div className="">
      <input
        onChange={handleInput}
        type="text"
        value={input}
        placeholder="Input"
      />
      <button
        className="bg-white text-black border px-4 rounded-sm"
        onClick={handleTodo}>
        Add
      </button>
      <div className="text-black w-48 h-80">
        {todos.map((todo, index) => (
          <h1 key={index}>{todo}</h1>
        ))}
      </div>
    </div>
  );
}
