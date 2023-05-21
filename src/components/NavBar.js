import { Button } from "react-bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  const { auth, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const {error} = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Already Copped</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!auth && (
              <Nav.Link as={Link} to="/signIn">
                Sign In
              </Nav.Link>
            )}
            {!auth && (
              <Nav.Link as={Link} to="/signUp">
                Sign Up
              </Nav.Link>
            )}
            {auth && (
              <Nav.Link as={Link} to="/"> 
                Dashboard
              </Nav.Link>
            )}
            {auth && (
              <Nav.Link as={Link} to="/listingcontrol">
                Listing Control
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {auth && (
              <Nav.Link as={Button} onClick={handleLogout}>
                Sign Out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;