/**
 * NarrativeCard component - Reusable card component for displaying image and narrative content
 */
import { Row, Col, Card } from "react-bootstrap";

const NarrativeCard = ({ imagePlaceholder, narrative }) => {
  return (
    <Col lg={12} className="mb-4 d-flex justify-content-center">
      <Card className="border-0 shadow-sm h-100" style={{ maxWidth: "1200px" }}>
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={4} className="text-center mb-3 mb-md-0">
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center overflow-hidden"
                style={{ height: "120px", width: "100%" }}
              >
                {typeof imagePlaceholder === "string" &&
                (imagePlaceholder.includes(".jpg") ||
                  imagePlaceholder.includes(".jpeg") ||
                  imagePlaceholder.includes(".png")) ? (
                  <img
                    src={imagePlaceholder}
                    alt="Illustration"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <span className="text-muted">
                    {imagePlaceholder || "📷 Image"}
                  </span>
                )}
              </div>
            </Col>
            <Col md={8}>
              <p className="text-light mb-2" style={{ fontSize: "1.4rem" }}>
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
