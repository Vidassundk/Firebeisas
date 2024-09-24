import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};
