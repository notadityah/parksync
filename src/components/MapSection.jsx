/**
 * MapSection component - Displays embedded Melbourne parking bay sensors map
 */
import { Container, Row, Col, Card } from "react-bootstrap";

const MapSection = () => {
  return (
    <Container className="mb-5" id="map-section">
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-center">
                <iframe
                  src="https://data.melbourne.vic.gov.au/explore/embed/dataset/on-street-parking-bay-sensors/custom/?&static=false&datasetcard=true"
                  width="100%"
                  height="650"
                  frameBorder="0"
                  style={{
                    maxWidth: "1650px",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  title="Melbourne Parking Bay Sensors"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MapSection;
