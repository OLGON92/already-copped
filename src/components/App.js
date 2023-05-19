import React from "react";
import Header from "./Header"
import ItemControl from "./ItemControl";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import  Dashboard  from "./Dashboard";
import { AuthProvider } from "../contexts/Auth";


export default function App() {
  return (
    <Router>
      <Header />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard /> } />
            <Route path="/signUp" element={<SignUp/>} />
            <Route path="/signIn" element={<SignIn/>} />
          </Routes>
        </AuthProvider>
    </Router>
  );
}

