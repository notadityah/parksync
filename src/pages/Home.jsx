import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-wrapper section fade-in hero-section">
      <Container>
        <div className="text-center hero-content">
          <h1 className="display-5 text-light fw-bold mb-4 hero-title">
            Driving into the city for work or errands and can't find a place to park?
          </h1>
          <p className="h4 text-light mb-3">Introducing,</p>
          <h1 className="display-3 fw-bold text-light mb-4">ParkSync</h1>
          <p className="lead text-light mx-auto mb-4 hero-subtitle">
            Our solution hopes to help car dependant commuters who are battling
            traffic, long search times, and rising fuel costs just to park their car.
          </p>
          <div className="mt-5 d-flex justify-content-center gap-4 flex-wrap">
            <Link to="/the-issue" className="big-button red">
              What You Should Know
            </Link>
            <Link to="/find-parking" className="big-button green">
              Find Parking in Melbourne CBD
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
