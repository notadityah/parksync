import { Container, Row, Col } from "react-bootstrap";
import StatisticsCard from "./StatisticsCard";
import ChartCard from "./ChartCard";

const HeroSection = () => {
  return (
    <div className="hero-section-data">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">
            Melbourne's Growing Parking Problem
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Melbourne has become increasingly dependent on car travel since
            COVID, with drivers spending an average of 17 hours per year
            searching for parking in the CBD. Understanding the growth trends
            helps us quantify the impact on urban infrastructure.
          </p>
        </div>

        <Row className="justify-content-center mb-5">
          <StatisticsCard
            icon="fa-users"
            value="5.8"
            label="% Growth"
            description="in population YoY"
          />
          <StatisticsCard
            icon="fa-car"
            value="5.8"
            label="% Growth"
            description="in car registrations YoY"
          />
        </Row>

        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <ChartCard
              title="Population Growth"
              icon="📈"
              description="Population trend chart"
            />
          </Col>
          <Col md={6} className="mb-4">
            <ChartCard
              title="Car Registrations"
              icon="📊"
              description="Registration trend chart"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
