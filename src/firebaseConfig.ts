import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import useToast from "./hooks/useToast";
import { Preferences } from "@capacitor/preferences";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

const config = {
  apiKey: "AIzaSyC55EjrIGuLzg5QiTQBg7hKwFsv6Rs5mq0",
  authDomain: "myapp-3c1f9.firebaseapp.com",
  projectId: "myapp-3c1f9",
  storageBucket: "myapp-3c1f9.firebasestorage.app",
  messagingSenderId: "943253422601",
  appId: "1:943253422601:web:54ca8d52ce207e7de66ed8",
  measurementId: "G-1TK5YCE8M9",
};

const app = initializeApp(config);
const auth = getAuth(app);

export function useFirebaseAuth() {
  const { presentToast } = useToast();
  const { setAuth, setUserData, deleteUserData } = useContext(AuthContext);

  async function loginUser(email: string, password: string) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error: any) {
      console.error("Login failed: ", error);
      presentToast(error.message, 4000);
      return null;
    }
  }

  async function registerUser(email: string, password: string) {

    if (!/\S+@\S+\.\S+/.test(email)) {
      presentToast("Invalid email format", 4000);
      return false;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('res firebaseconfig', res);
      const userData = { email: res.user.email ?? "" };
      await Preferences.set({ key: "user", value: JSON.stringify(userData) });
      setUserData(userData);
      return true;
    } catch (error: any) {
      presentToast(error.message, 4000);
      return false;
    }
  }

  async function logOutUser() {
    try {
      await signOut(auth);
      await Preferences.remove({ key: "user" });
      deleteUserData();
      presentToast("You have logged out!");
    } catch (error) {
      console.error("Logout failed: ", error);
      presentToast("Logout failed: " + error.message, 4000);
    }
  }

  return { loginUser, registerUser, logOutUser };
}




