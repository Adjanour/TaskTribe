// src/components/AppLayout.tsx
import React from "react";
import { NavbarX } from "../Navbar";
import useAuth from "@/hooks/useAuth";
import { Sidebar } from "../Sidebar";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser, logout } = useAuth();
  return (
    <div className="main-light min-h-screen flex flex-col">
      <Sidebar />
      <main className="layout" >
        <div style={{ marginBottom: "5px", marginTop: "5px" }} className="w-full">
          <NavbarX
            displayName={currentUser?.displayName}
            avatarUrl={currentUser?.photoURL}
            onLogout={logout}
          />
        </div>
        <div>
          {children}
        </div>
        
      </main>
    </div>
  );
};
