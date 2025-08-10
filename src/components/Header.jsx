import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="white" variant="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          ParkSync
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/the-issue">
              The Issue
            </Nav.Link>
            <Nav.Link as={Link} to="/find-parking">
              Find Parking
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
