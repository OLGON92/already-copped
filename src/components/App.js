import React from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import ItemControl from "./ItemControl";
import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import  Dashboard  from "./Dashboard";
import AuthRoute from "./AuthRoute";



const App = () => {
  return (
    <>
      <Header />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default App;
