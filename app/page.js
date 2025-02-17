"use client";

import { useState, useEffect } from "react";
import {
  auth,
  onAuthStateChanged,
  db,
  getDoc,
  doc,
} from "../firebase/firebaseconfig";
import { useRouter } from "next/navigation";
import { saveTodo } from "./utils/saveTodo";
import { fetchTodos } from "./utils/fetchTodo";

export default function Home() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // Fetch user details
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }

        // ✅ Fetch only the logged-in user's todos
        const userTodos = await fetchTodos();
        setTodos(userTodos);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {
    if (!input.trim()) return;

    await saveTodo(input); // ✅ Save todo for the user

    // ✅ Fetch updated todos after saving
    const updatedTodos = await fetchTodos();
    setTodos(updatedTodos);

    setInput(""); // Clear input after saving
  };

  return (
    <div className="flex items-center justify-center flex-col m-8">
      <h1 className="font-bold text-4xl mt-4">
        Welcome {userName} to your Todos,{" "}
      </h1>
      <div className="flex flex-col border hover:border-black px-16 py-8  m-8 rounded-md">
        <label for="todos">Enter your Todo:</label>
        <input
          onChange={e => setInput(e.target.value)}
          type="text"
          value={input}
          placeholder="next todo"
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <div>
          <ul>
            {todos.map((todo, index) => (
              <div
                key={index}
                className="border border-slate-700 p-2 mb-2 rounded-md">
                <h1>{todo}</h1>
              </div>
            ))}
          </ul>
        </div>
        <button
          className="border rounded-md bg-slate-500 text-white py-1"
          onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
