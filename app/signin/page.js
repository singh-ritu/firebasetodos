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
import Input from "../components/input";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignin = async e => {
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
    <div className="flex items-center justify-center flex-col bg-[url('/bg.jpeg')] bg-cover bg-center h-screen">
      <div className="bg-[#85829e] rounded-lg p-8 text-center">
        <h2 className="font-bold text-3xl mt-4 text-white">
          Welcome Back To Your Todos!
        </h2>
        <form
          className="flex flex-col border-[#85829e] bg-white hover:border-black px-16 py-8 m-8 rounded-md"
          onSubmit={handleSignin}>
          <label htmlFor="email" className="text-[#85829e] text-left">
            Email:
          </label>

          <Input
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Your Mail"
            value={email}
          />
          <label htmlFor="password" className="text-[#85829e] text-left">
            Password:
          </label>
          <Input
            onChange={e => setPassword(e.target.value)}
            type="text"
            placeholder="Your Password"
            value={password}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="border rounded-md bg-[#85829e] text-white py-1"
            type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
