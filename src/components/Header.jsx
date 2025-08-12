import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/parklogo.png";


const Header = () => {
  return (
    <Navbar bg="white" variant="light" expand="lg" className="border-bottom custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
          <img
            src={logo}
            alt="ParkSync Logo"
            style={{ height: "50px", width: "50px", marginRight: "10px", borderRadius: "8px" }}
          />
          ParkSync
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-btn btn-success nav-btn-home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/the-issue" className="nav-btn nav-btn-issue">
              The Issue
            </Nav.Link>
            <Nav.Link as={Link} to="/find-parking" className="nav-btn nav-btn-parking">
              Find Parking
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;