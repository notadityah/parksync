/**
 * Home page - Landing page with hero section and main navigation to other sections
 */
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero-section-data pt-5">
      <Container>
        <div className="text-center mb-5">
          <h1
            className="display-5 text-light fw-bold mb-4 mx-auto"
            style={{ maxWidth: "800px" }}
          >
            Driving into the city for work or errands and can't find a place to
            park?
          </h1>
          <p className="h4 text-light mb-3">Introducing,</p>
          <h1 className="display-3 fw-bold text-light mb-4">ParkSync</h1>
          <p
            className="lead text-light mx-auto mb-4"
            style={{ maxWidth: "800px" }}
          >
            Our solution hopes to help car dependant commuters who are battling
            traffic, long search times, and rising fuel costs just to park their
            car.
          </p>
          <div
            className="mt-5 d-flex justify-content-center gap-4"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <Link
              to="/the-issue"
              className="btn btn-danger text-light btn-lg"
              style={{ minHeight: "50px", flex: "1", maxWidth: "350px" }}
            >
              Understand the Parking Problem
            </Link>
            <Link
              to="/find-parking"
              className="btn btn-success text-light btn-lg"
              style={{ minHeight: "50px", flex: "1", maxWidth: "350px" }}
            >
              Find Parking in Melbourne CBD
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
