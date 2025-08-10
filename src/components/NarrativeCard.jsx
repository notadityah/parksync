import { Container, Row, Col, Card } from "react-bootstrap";

const NarrativeCard = ({ imagePlaceholder, narrative }) => {
  return (
    <Col lg={12} className="mb-4 d-flex justify-content-center">
      <Card className="border-0 shadow-sm h-100" style={{ maxWidth: "1200px" }}>
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={4} className="text-center mb-3 mb-md-0">
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center"
                style={{ height: "120px", width: "100%" }}
              >
                <span className="text-muted">
                  {imagePlaceholder || "📷 Image"}
                </span>
              </div>
            </Col>
            <Col md={8}>
              <p className="text-muted mb-2" style={{ fontSize: "1.4rem" }}>
                {narrative}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NarrativeCard;
