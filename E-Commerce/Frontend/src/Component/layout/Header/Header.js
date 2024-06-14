import React from "react";
import "./Header.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Search, Cart, Phone } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../../Assets/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="main-div-header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            width="100"
            className="d-inline-block align-top logo"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/search"
              className="d-flex align-items-center"
            >
              <Search color="rgba(35,35,35,0.8)" />
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              className="d-flex align-items-center"
            >
              <Cart color="rgba(35,35,35,0.8)" />
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="d-flex align-items-center"
            >
              <Phone color="rgba(35,35,35,0.8)" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
