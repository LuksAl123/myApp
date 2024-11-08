import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import useToast from "./hooks/useToast";
import { Preferences } from "@capacitor/preferences";

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

  async function loginUser(username: string, password: string) {
    const email = username;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await Preferences.set({ key: "userEmail", value: res.user.email ?? "" });
        return true;
      }
    } catch (error: any) {
      console.error("Login failed: ", error);
      presentToast(error.message, 4000);
      return false;
    }
  }

  async function registerUser(username: string, password: string) {
    const email = username;

    if (!/\S+@\S+\.\S+/.test(email)) {
      presentToast("Invalid email format", 4000);
      return false;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      return true;
    } catch (error: any) {
      presentToast(error.message, 4000);
      return false;
    }
  }

  return { loginUser, registerUser };
}