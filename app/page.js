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
import Input from "./components/input";

export default function Home() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  // const [todo, setTodo] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // Fetch user details
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().FirstName);
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
    <div className="flex items-center justify-center flex-col bg-[url('/bg.jpeg')] bg-cover bg-center h-screen">
      <div className="bg-[#85829e] rounded-lg p-10">
        <h1 className="font-bold text-3xl mt-4 text-white">
          Organize Your Day, One Task at a Time!{" "}
        </h1>
        <div className="flex flex-col border-[#dcc5de] bg-white px-16 py-8 m-8 rounded-md">
          <label for="todos" className="text-[#85829e]">
            Enter your Todo:
          </label>
          <Input
            onChange={e => setInput(e.target.value)}
            type="text"
            value={input}
            placeholder="next todo"
          />
          <div>
            <ul>
              {todos.map((todo, index) => (
                <div
                  key={index}
                  className="border border-[#85829e] p-2 mb-2 rounded-md">
                  <h1 className="text-[#85829e]">{todo}</h1>
                </div>
              ))}
            </ul>
          </div>
          <button
            className="border rounded-md bg-[#85829e] text-white py-1"
            onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
