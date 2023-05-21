import React from "react";
import { Container } from "react-bootstrap";
import ListingControl from "./ListingControl";
import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard  from "./Dashboard";
import AuthRoute from "./AuthRoute";
import PasswordReset from "./PasswordReset";
import NavBar from "./NavBar";
import UpdatePassword from "./UpdatePassword";



const App = () => {
  return (
    <>
      <NavBar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/listingcontrol" element={<ListingControl />} />
            </Route>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default App;
