import { redirect } from "next/navigation";

import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    const admin = user && user.role === "admin";
    return admin ? children : redirect("/");
  }
}
