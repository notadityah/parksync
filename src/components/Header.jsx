import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="white" variant="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          ParkSync
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#map-section">Find Parking</Nav.Link>
            <Nav.Link href="#faqs">FAQs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
