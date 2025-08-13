import { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/parklogo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg="white"
      variant="light"
      className={`border-bottom custom-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold d-flex align-items-center">
          <img
            src={logo}
            alt="ParkSync Logo"
            style={{ height: 45, width: 45, marginRight: 10, borderRadius: 8 }}
          />
          ParkSync
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="nav-btn nav-btn-home"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/the-issue"
              className="nav-btn nav-btn-issue"
            >
              What You Should Know
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/find-parking"
              className="nav-btn nav-btn-parking"
            >
              Find Parking
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
