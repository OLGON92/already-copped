import React from "react";
import { useAuth } from "../context/AuthProvider";


const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{ fontSize: "24px" }}>
      <h1>Dashboard</h1>
      <p>You are logged in and your email address is {user.email}</p>
      <p>To add a listing click on the listings tab at the top of the navbar</p>
      <p>To change your profile settings click here</p>
    </div>
  );
};

export default Dashboard;

// This will eventually be an edit profile section 