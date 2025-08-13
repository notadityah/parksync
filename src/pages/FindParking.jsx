import MapSection from "../components/MapSection";
import { Container, Row, Col, Card } from "react-bootstrap";
import visualsImage from "../assets/visual.jpeg";
import parkingSpotsImage from "../assets/parkingspots.png";

const FindParking = () => {
  return (
    <div className="page-wrapper section fade-in find-parking-page">
      <Container>
        <div className="text-center mb-3" style={{ paddingTop: "65px" }}>
          <p className="lead text-light mx-auto" style={{ maxWidth: "1650px" }}>
            Looking for parking? Use the search bar in the map below to find your spot.
            Real-time sensor data is updated every 3 minutes, so you can always find the latest information.
          </p>
        </div>
      </Container>

      <MapSection />
    </div>
  );
};

export default FindParking;
