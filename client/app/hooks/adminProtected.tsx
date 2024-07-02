import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: { auth: { user: any } }) => state.auth);

  if (!user) {
    redirect("/"); // Redirect if no user is logged in
    return null;
  }

  const isAdmin = user.role === "admin";
  if (!isAdmin) {
    redirect("/"); // Redirect if the user is not an admin
    return null;
  }

  return <>{children}</>;
}

// import { redirect } from "next/navigation";

// import React from "react";
// import { useSelector } from "react-redux";

// interface ProtectedProps {
//   children: React.ReactNode;
// }

// export default function AdminProtected({ children }: ProtectedProps) {
//   const { user } = useSelector((state: any) => state.auth);
//   if (user) {
//     const admin = user && user.role === "admin";
//     return admin ? children : redirect("/");
//   }
// }
