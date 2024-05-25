import React, { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "@/features/Auth/firebase";
import { useNavigate, useLocation } from "react-router";
import axiosInstance from "@/lib/axios-istance";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import storage from "@/utils/storage";
import { User as UserInterface } from "@/features/TaskManagement/types";

const axios = axiosInstance;

export interface AuthContextType {
  currentUser: User | null;
  user: UserInterface | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);
  const router = useNavigate();
  const location = useLocation();
  const from = location.pathname;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        handleUserLogin(user);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      router(from);
      console.log(`Redirecting to ${from}`);
    }
  }, [from, currentUser, router]);

  const handleUserLogin = async (user: User) => {
    await storeUserToDatabase(user);
    await retrieveUserFromDatabase(user.uid);
    await retrieveAndStoreToken(user);
  };

  const storeUserToDatabase = async (user: User) => {
    if (user) {
      try {
        const { uid, email, displayName = "", photoURL = "" } = user;
        const response = await axios.post("/users", {
          uid,
          email,
          displayName,
          avatar: photoURL,
        });
        console.log(response);
      } catch (error) {
        console.error("Error adding user to database", error);
      }
    }
  };

  const retrieveUserFromDatabase = async (uid: string) => {
    try {
      const response = await axios.get<UserInterface>(`/users/${uid}`);
      if (response.data) {
        setUser(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error retrieving user from database", error);
    }
  };

  const retrieveAndStoreToken = async (user: User) => {
    if (user) {
      try {
        const token = await user.getIdToken();
        storage.setToken(token); // Store the token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set the token in Axios headers
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    storage.clearToken(); // Remove the token from storage
    delete axios.defaults.headers.common["Authorization"]; // Remove the token from Axios headers
    router("/auth/login");
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        await handleUserLogin(result.user);
        setCurrentUser(result.user);
        router("/app/task/dashboard");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await storeUserToDatabase(result.user);
      setCurrentUser(result.user);
      router("/auth/login");
      console.log("Redirecting to login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        await handleUserLogin(result.user);
        setCurrentUser(result.user);
        router("/app/task/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, logout, loginWithGoogle, signUp, signIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

