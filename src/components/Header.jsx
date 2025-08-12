import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <Navbar 
      bg="white" 
      variant="light" 
      expand="lg" 
      className="border-bottom shadow-sm sticky-top"
      style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.95)' }}
    >
      <Container>
        {/* Logo和品牌 */}
        <Navbar.Brand href="#home" className="fw-bold d-flex align-items-center">
          <div className="position-relative">
            <img
              src={logo}
              alt="ParkSync Logo"
              style={{ height: "55px", marginRight: "20px" }}
              className="pulse"
            />
            {/* 在线状态指示器 */}
            <span 
              className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
              style={{ marginTop: '5px', marginLeft: '-5px' }}
            >
              <span className="visually-hidden">system online</span>
            </span>
          </div>
          <div>
            <div className="fw-bold" style={{ fontSize: '1.4rem', color: '#1e293b' }}>
              ParkSync
            </div>
            <small className="text-muted d-none d-md-block" style={{ fontSize: '0.75rem', marginTop: '-2px' }}>
              Smart Parking Plan
            </small>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* 导航链接 */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              href="#home" 
              className="fw-semibold px-3 py-2 rounded-pill mx-1 position-relative"
              style={{ transition: 'all 0.3s ease' }}
            >
              <i className="fas fa-home me-2"></i>
              Home
            </Nav.Link>
            
            <Nav.Link 
              href="#data-section" 
              className="fw-semibold px-3 py-2 rounded-pill mx-1"
              style={{ transition: 'all 0.3s ease' }}
            >
              <i className="fas fa-chart-bar me-2"></i>
              Parking Analysis
            </Nav.Link>
            
            <Nav.Link 
              href="#map-section" 
              className="fw-semibold px-3 py-2 rounded-pill mx-1 position-relative"
              style={{ transition: 'all 0.3s ease' }}
            >
              <i className="fas fa-map-marker-alt me-2"></i>
              Search Parking
              {/* 实时更新提示 */}
              <Badge 
                bg="success" 
                className="position-absolute top-0 start-100 translate-middle rounded-pill"
                style={{ fontSize: '0.6rem' }}
              >
                Real-time
              </Badge>
            </Nav.Link>
            
            <Nav.Link 
              href="#faqs" 
              className="fw-semibold px-3 py-2 rounded-pill mx-1"
              style={{ transition: 'all 0.3s ease' }}
            >
              <i className="fas fa-question-circle me-2"></i>
              Common FAQs
            </Nav.Link>

            {/* CTA按钮 */}
            <Nav.Item className="ms-3">
              <a 
                href="#get-started" 
                className="btn btn-primary btn-modern px-4 py-2"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fas fa-rocket me-2"></i>
                Start!
              </a>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
      {/* 添加导航下方的进度条（可选） */}
      <div 
        className="position-absolute bottom-0 start-0 bg-primary"
        style={{ 
          height: '2px', 
          width: '0%', 
          transition: 'width 0.3s ease',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
        }}
        id="nav-progress"
      ></div>
    </Navbar>
  );
};

export default Header;