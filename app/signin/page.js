"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  signInWithEmailAndPassword,
  db,
  doc,
  getDoc,
} from "../../firebase/firebaseconfig";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async e => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user's name from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
      }

      router.push("/"); // Redirect to todos page after login
    } catch (err) {
      console.error(err.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col m-8">
      <h2 className="font-bold text-2xl mt-4">Welcome Back To Your Todos!</h2>
      <form
        className="flex flex-col border hover:border-black px-16 py-8  m-8 rounded-md"
        onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="border rounded-md bg-slate-500 text-white py-1"
          type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
