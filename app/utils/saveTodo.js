import { db, auth, doc, setDoc, getDoc } from "../../firebase/firebaseconfig";

export const saveTodo = async todoText => {
  try {
    const user = auth.currentUser; // Get the logged-in user
    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const userTodosRef = doc(db, "todos", user.uid, "daily todos", today); // Store todos under user ID
    const userTodosSnap = await getDoc(userTodosRef);

    let todos = [];
    if (userTodosSnap.exists()) {
      todos = userTodosSnap.data().todos || [];
    }

    todos.push(todoText); // Add new todo

    await setDoc(userTodosRef, { todos }, { merge: true });

    console.log("Todo saved for user:", user.uid);
  } catch (error) {
    console.error("Error saving todo:", error);
  }
};
