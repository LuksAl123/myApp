import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

export async function doLogin(username: string, password: string) {
  const email = `${username}@email.com`;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
