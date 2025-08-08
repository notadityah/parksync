import { Container, Row, Col, Card } from "react-bootstrap";

const StatisticsCard = ({ icon, value, label, description }) => {
  return (
    <Col md={3} className="mb-4">
      <Card className="text-center border-0 shadow-sm h-100">
        <Card.Body>
          <div className="mb-3">
            <i className={`fas ${icon} fa-2x text-primary`}></i>
          </div>
          <h3 className="fw-bold">{value}</h3>
          <p className="text-muted mb-0">{label}</p>
          <small className="text-muted">{description}</small>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default StatisticsCard;
