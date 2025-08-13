/**
 * TheIssue page - Displays parking problem statistics and population/vehicle growth data
 */
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import NarrativeCard from "../components/NarrativeCard";
import { getMetricsOnce } from "../services/api";
import peopleImage from "../assets/people.png";
import carsImage from "../assets/cars.jpg";

const TheIssue = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMetricsOnce()
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-5 text-light">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

  return (
    <div className="page-wrapper section fade-in issue-page">
      <Container>
        <div className="text-left mb-5" style={{ paddingTop: "65px" }}>
          <p className="lead text-light mx-auto" style={{ maxWidth: "1200px" }}>
            Since COVID, Melbourne has seen a sharp rise in car dependency—more
            so than many comparable global cities. One of the biggest contributors
            to congestion in the CBD is the time drivers spend circling the streets
            in search of a parking spot. With high car ownership rates, this search
            is far from easy: on average, drivers lose up to{" "}
            <span className="fw-bold">17 hours</span> each year just trying to find a place to park.
          </p>
        </div>

        <Row className="justify-content-center g-4">
          <Col lg={6} md={6}>
            <NarrativeCard
              imagePlaceholder={peopleImage}
              narrative={
                <>
                  Melbourne's population grew from{" "}
                  <span className="fw-bold">{metrics?.population_2016?.toLocaleString()}</span>{" "}
                  in 2016 to{" "}
                  <span className="fw-bold">{metrics?.population_2021?.toLocaleString()}</span>{" "}
                  in 2021. A{" "}
                  <span className="fw-bold">{metrics?.population_pct_increase_2016_2021}%</span>{" "}
                  increase over 5 years.
                </>
              }
              className="glass-card"
            />
          </Col>

          <Col lg={6} md={6}>
            <NarrativeCard
              imagePlaceholder={carsImage}
              narrative={
                <>
                  Car ownership in Victoria has grown even faster, from{" "}
                  <span className="fw-bold">{metrics?.passenger_vehicles_2016?.toLocaleString()}</span>{" "}
                  vehicles in 2016 to{" "}
                  <span className="fw-bold">{metrics?.passenger_vehicles_2021?.toLocaleString()}</span>{" "}
                  in 2021. A{" "}
                  <span className="fw-bold">{metrics?.passenger_vehicles_pct_increase_2016_2021}%</span>{" "}
                  increase over 5 years.
                </>
              }
              className="glass-card"
            />
          </Col>
        </Row>

        <div className="text-center mt-5">
          <h3 className="text-light mx-auto" style={{ maxWidth: "800px" }}>
            Melbourne's <span className="fw-bold">23,864</span> on-street parking bays
            can't keep up with the city's growing population and rising car ownership.
          </h3>
        </div>
      </Container>
    </div>
  );
};

export default TheIssue;
