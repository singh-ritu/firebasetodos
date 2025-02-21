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
import Input from "../components/input";

function Signup() {
  const [Name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSignUp = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setEmail("");
    setName("");
    setPassword("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: FirstName });

      await addUserToFirestore(user.uid, { FirstName, email });

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
    <div className="flex items-center justify-center flex-col bg-[url('/bg.jpeg')] bg-cover bg-center h-screen">
      <div className="bg-[#85829e] rounded-lg p-8 text-center">
        <h2 className="font-bold text-3xl mt-4 text-white">
          Create your first Todo!
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form
          onSubmit={handleSignUp}
          className="flex flex-col border-[#85829e] bg-white hover:border-black px-16 py-8  m-8 rounded-md">
          <label for="name" className="text-[#85829e] text-left">
            Name:
          </label>
          <Input
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
          />

          <label for="email" className="text-[#85829e] text-left">
            Email:
          </label>
          <Input
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Your mail"
          />
          <label for="password" className="text-[#85829e] text-left">
            password:
          </label>
          <Input
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="create password"
          />
          <button
            className="border rounded-md bg-[#85829e] text-white py-1"
            type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
