import React, { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "@/features/Auth/firebase";
import { useNavigate, useLocation } from "react-router";
import axiosInstance  from "@/lib/axios-istance";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import storage from "@/utils/storage";
import {User as UserInterface} from "@/features/TaskManagement/types";

const axios = axiosInstance;

export interface AuthContextType {
  currentUser: User | null;
  user: UserInterface | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);
  const router = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        storeUserToDatabase(user);
        retrieveUserFromDatabase(user.uid);
        retrieveAndStoreToken(user);
      }
    });

    return unsubscribe;
  }, []);

  const location = useLocation();
  //check if use is loged in and navigate back to where they came from
  const from = location.pathname;
  console.log(from);
  console.log(currentUser);

  const storeUserToDatabase = async (User: User) => {
    if (User) {
      try {
        const response = await axios.post("/users", {
          uid: User.uid,
          email: User.email,
          displayName: User.displayName,
          avatar: User.photoURL,
        });
        console.log(response);
      } catch (error) {
        console.error("Error adding user to database ", error);
      }
    }
  }

  const retrieveUserFromDatabase = async (uid: string) => {
    try {
      const response = await axios.get<UserInterface>(`/users/${uid}`);
      if (response.data) {
        setUser(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error retrieving user from database ", error);
    }
  }

  const retrieveAndStoreToken = async (User: User) => {
    if (User) {
      try {
        const token = await User.getIdToken();
        storage.setToken(token);
      } catch (error) {
        console.error("Error retrieving token: ", error);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      router(from);
      console.log(`Redirecting to ${from}`);
    }
  }, [from, currentUser, router]);

  const logout = async () => {
    await signOut(auth);
    router("/auth/login");
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (result) {
        retrieveAndStoreToken(result.user);
        retrieveUserFromDatabase(result.user.uid);
        console.log("Signed in with Google");
        console.log(currentUser);
        setCurrentUser(result.user);
        router("/app/task/dashboard"); // Redirect to dashboard after login

      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      storeUserToDatabase(result.user);
      console.log("Signed up with Google");
      console.log(currentUser);
      if (currentUser) {
        setCurrentUser(currentUser);
        router("/auth/login"); // Redirect to login after sign up
        console.log("Redirecting to dashboard");
      }
    } catch (error) {
      console.error("Error signing up with Google: ", error);
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result) {
        retrieveAndStoreToken(result.user);
        retrieveUserFromDatabase(result.user.uid);
        console.log("Signed in with Google");
        console.log(currentUser);
        setCurrentUser(result.user);
        router("/app/task/dashboard"); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, logout, loginWithGoogle, signUp, signIn, user}}
    >
      {children}
    </AuthContext.Provider>
  );
};
