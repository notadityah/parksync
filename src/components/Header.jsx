import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.svg";


const Header = () => {
  return (
    <Navbar className="custom-navbar border-bottom" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold d-flex align-items-center">
          <img
            src={logo}
            alt="ParkSync Logo"
            style={{ height: "50px", marginRight: "20px" }}
          />
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
