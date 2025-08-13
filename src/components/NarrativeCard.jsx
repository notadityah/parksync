/**
 * NarrativeCard component - Reusable card component for displaying image and narrative content
 */
import { Col, Card } from "react-bootstrap";

const NarrativeCard = ({ imagePlaceholder, narrative }) => {
  return (
    <Card className="border-0 shadow-sm h-100 text-center p-3 narrative-card">
      {/* pic */}
      <div
        className="bg-light rounded overflow-hidden mb-3"
        style={{
          height: "200px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
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
            {imagePlaceholder || "Image"}
          </span>
        )}
      </div>

      {/* words */}
      <div className="text-light" style={{ fontSize: "1.2rem" }}>
        {narrative}
      </div>
    </Card>
  );
};

export default NarrativeCard;