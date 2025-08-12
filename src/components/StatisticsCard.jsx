import { Card, Col } from "react-bootstrap";

const StatisticsCard = ({ icon, value, label, description, variant = "primary", showTrend = false }) => {
  // 根据variant选择图标容器的CSS类
  const getIconClass = (variant) => {
    const baseClass = "icon-container";
    switch(variant) {
      case "success": return `${baseClass} icon-success`;
      case "warning": return `${baseClass} icon-warning`;
      case "danger": return `${baseClass} icon-danger`;
      default: return `${baseClass} icon-primary`;
    }
  };

  return (
    <Col md={3} className="mb-4">
      <Card className="stats-card text-center border-0 h-100">
        <Card.Body className="p-4">
          {/* 图标容器 */}
          <div className={getIconClass(variant)}>
            <i className={`fas ${icon} fa-2x text-white`}></i>
          </div>
          
          {/* 主要数值 */}
          <h3 className="fw-bold mb-2" style={{ fontSize: '2.5rem', color: '#1e293b' }}>
            {value}
          </h3>
          
          {/* 标签 */}
          <p className="text-muted mb-1 fw-semibold" style={{ fontSize: '1.1rem' }}>
            {label}
          </p>
          
          {/* 描述 */}
          <small className="text-muted d-block mb-2">{description}</small>
          
          {/* 趋势指示器（可选） */}
          {showTrend && (
            <div className="mt-3">
              <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                <i className="fas fa-arrow-up me-1"></i>
                +5.8% YoY
              </span>
            </div>
          )}
          
          {/* 底部装饰线 */}
          <div 
            className="mt-3 mx-auto" 
            style={{
              height: '3px',
              width: '60px',
              background: `linear-gradient(90deg, var(--${variant === 'primary' ? 'primary' : variant}-color), var(--secondary-color))`,
              borderRadius: '2px'
            }}
          ></div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default StatisticsCard;