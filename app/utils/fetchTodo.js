import { db, auth, doc, getDoc } from "../../firebase/firebaseconfig";

export const fetchTodos = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user found");
      return [];
    }

    const today = new Date().toISOString().split("T")[0];

    const userTodosRef = doc(db, "todos", user.uid, "daily todos", today);
    const userTodosSnap = await getDoc(userTodosRef);

    if (userTodosSnap.exists()) {
      return userTodosSnap.data().todos || [];
    } else {
      return []; // No todos found
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};
