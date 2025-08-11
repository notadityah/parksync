/**
 * Footer component - Displays the application footer with team information
 */
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light py-4 border-top">
      <Container>
        <div className="text-center">
          <p className="text-light mb-0">Developed by Chai Boba Tea-m 2025</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
