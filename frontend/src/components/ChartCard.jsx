import { Card } from "react-bootstrap";

const ChartCard = ({ title, icon, description }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h6 className="text-muted mb-3">{title}</h6>
        <div
          className="chart-placeholder"
          style={{
            height: "200px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center">
            <div className="mb-2">{icon}</div>
            <small className="text-muted">{description}</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChartCard;
