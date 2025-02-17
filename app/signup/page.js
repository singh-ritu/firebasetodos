"use client";
import React from "react";
import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  addUserToFirestore,
} from "../../firebase/firebaseconfig";
import { useRouter } from "next/navigation";

function Signup() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSignUp = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await addUserToFirestore(user.uid, { name, email });

      console.log("User signed up:", userCredential.user);
      setSuccess("Signup successful!");
      console.log("Router:", router);

      // window.location.href = "/";
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col m-8">
      <h2 className="font-bold text-2xl mt-4">Create your first Todo!</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form
        onSubmit={handleSignUp}
        className="flex flex-col border hover:border-black px-16 py-8  m-8 rounded-md">
        <label for="name">First Name:</label>
        <input
          placeholder="Enter your name"
          type="text"
          onChange={e => setName(e.target.value)}
          className="px-8 border border-slate-700 rounded-md mb-4"
        />
        <label for="name">Last Name:</label>
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
        <button
          className="border rounded-md bg-slate-500 text-white py-1"
          type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
