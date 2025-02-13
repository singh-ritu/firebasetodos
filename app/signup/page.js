"use client";
import React from "react";
import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "@/lib/firebase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center flex-col m-8">
      <h2 className="font-bold text-2xl mt-4">Create your first Todo!</h2>
      <div className="flex flex-col border hover:border-black px-16 py-8  m-8 rounded-md">
        <label for="name">Name:</label>
        <input
          placeholder="Enter your name"
          type="text"
          onChange={e => setName(e.target.value)}
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <label for="email">Email:</label>
        <input
          placeholder="Enter your mail"
          type="text"
          onChange={e => setEmail(e.target.value)}
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <label for="password">password:</label>
        <input
          placeholder="Enter password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <button className="border rounded-md bg-slate-500 text-white py-1">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
