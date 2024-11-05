import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BookEditor from "./pages/BookEditor";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BookEditorProvider } from "./contexts/BookEditorContext";
import { useAuth } from "./contexts/AuthContext";

function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? (
          <BookEditorProvider>
            <BookEditor />
          </BookEditorProvider>
        ) : (
          <Navigate to="/signin" />
        )}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      
      <Route path="*" element={<Navigate to={user ? "/" : "/signin"} />} />
    </Routes>
  );
}

export default Router;
