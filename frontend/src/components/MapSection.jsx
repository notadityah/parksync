import { Container, Row, Col, Card } from "react-bootstrap";

const MapSection = () => {
  return (
    <Container className="mb-5" id="map-section">
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-3">
              <h5 className="mb-3 text-center">
                Find Parking Availability in Melbourne
              </h5>
              <div className="d-flex justify-content-center">
                <iframe
                  src="https://data.melbourne.vic.gov.au/explore/embed/dataset/on-street-parking-bay-sensors/custom/?&static=false&datasetcard=true"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  style={{
                    maxWidth: "800px",
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
