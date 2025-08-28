import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css"; // custom styles

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand as={Link} to="/" className="logo">
          <img
            src="/logo192.png" // replace with your logo path
            alt="Logo"
            className="logo-img"
          />
          MyBrand
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav-menu" />
        <Navbar.Collapse id="nav-menu">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/" className="nav-item">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item">About</Nav.Link>
            <Nav.Link as={Link} to="/services" className="nav-item">Services</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-item">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
