/**
 * FindParking page - Interactive parking finder with real-time map and historical data insights
 */
import MapSection from "../components/MapSection";
import { Container, Row, Col, Card } from "react-bootstrap";
import visualsImage from "../assets/visual.jpeg";
import parkingSpotsImage from "../assets/parkingspots.png";

const FindParking = () => {
  return (
    <div className="page-wrapper section fade-in find-parking-page">
      <Container>
        <div className="text-center mb-3">
          <p className="lead text-light mx-auto" style={{ maxWidth: "1000px" }}>
            Looking for parking? Use the search bar in the map below to find your spot.
            Real-time sensor data is updated every 3 minutes, so you can always find the latest information.
          </p>
        </div>
      </Container>

      <MapSection />

      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="text-light mb-3">
            What does the historical data say? Our data analysts reveal there are some things to look out for:
          </h2>
        </div>

        <Row className="justify-content-center g-4">
          <Col lg={6} md={6}>
            <Card className="glass-card h-100">
              <Card.Body>
                <div className="text-center mb-3 find-parking-img">
                  <img src={visualsImage} alt="Parking Occupancy Over Time" />
                </div>
                <h5 className="text-light mb-3">Peak Times to Avoid</h5>
                <p className="text-light">
                  This graph shows the occupied parking places based on time (24hrs).
                  Most parking spots are occupied during the day, especially from 10am-1pm.
                  Choose your arrival time wisely!
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={6}>
            <Card className="glass-card h-100">
              <Card.Body>
                <div className="text-center mb-3">
                  <img src={parkingSpotsImage} alt="Parking Vacancy Rate Map" />
                </div>
                <h5 className="text-light mb-3">Areas to Avoid</h5>
                <p className="text-light">
                  Darker colors indicate higher vacancy rates (easier parking),
                  while lighter colors indicate tighter parking availability.
                  Choose areas with easier parking options before traveling!
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindParking;

