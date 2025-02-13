import React from "react";

function signIn() {
  return (
    <div className="flex items-center justify-center flex-col m-8">
      <h2 className="font-bold text-2xl mt-4">Welcome Back To your Todos!</h2>
      <div className="flex flex-col border hover:border-black px-16 py-8  m-8 rounded-md">
        <label for="email">Email:</label>
        <input
          placeholder="Enter your mail"
          type="text"
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <label for="password">password:</label>
        <input
          placeholder="Enter password"
          type="password"
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <button className="border rounded-md bg-slate-500 text-white py-1">
          Log In
        </button>
      </div>
    </div>
  );
}

export default signIn;
