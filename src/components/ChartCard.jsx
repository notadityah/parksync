import { Card } from "react-bootstrap";

const ChartCard = ({ title, icon, description, chartData = null, chartType = "placeholder" }) => {
  return (
    <Card className="chart-container border-0 shadow-sm h-100">
      <Card.Header className="bg-white border-0 pt-4 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="mb-1 fw-bold text-dark">{title}</h5>
            <small className="text-muted">{description}</small>
          </div>
          <div className="badge bg-light text-primary fs-6 px-3 py-2 rounded-pill">
            {icon}
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="pt-3">
        {/* 如果有数据，在这里渲染真实图表 */}
        {chartData ? (
          <div className="chart-content" style={{ height: "200px" }}>
            {/* chart */}
            <div className="d-flex align-items-center justify-content-center h-100 text-success">
              <div className="text-center">
                <i className="fas fa-check-circle fa-2x mb-2"></i>
                <p className="mb-0 fw-semibold">data</p>
                <small className="text-muted">chart</small>
              </div>
            </div>
          </div>
        ) : (
          /* 占位符设计 - 等待数据 */
          <div
            className="chart-placeholder d-flex align-items-center justify-content-center position-relative"
            style={{ height: "200px" }}
          >
            {/* 背景装饰 */}
            <div 
              className="position-absolute w-100 h-100 opacity-25"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  #e2e8f0 10px,
                  #e2e8f0 20px
                )`
              }}
            ></div>
            
            {/* 中心内容 */}
            <div className="text-center position-relative">
              <div className="mb-3">
                <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle p-3 pulse">
                  <i className="fas fa-chart-line fa-2x text-primary"></i>
                </div>
              </div>
              <h6 className="fw-semibold text-dark mb-2">waiting for data</h6>
              <small className="text-muted">waiting for data chart {chartType} chart</small>
              
              {/* 进度指示器 */}
              <div className="mt-3">
                <div className="progress" style={{ height: '4px' }}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                    role="progressbar" 
                    style={{ width: '60%' }}
                  ></div>
                </div>
                <small className="text-muted mt-1 d-block">UI ready</small>
              </div>
            </div>
          </div>
        )}
        
        {/* 图表底部信息 */}
        <div className="mt-3 pt-3 border-top">
          <div className="row text-center">
            <div className="col-4">
              <small className="text-muted d-block">data source</small>
              <strong className="text-dark">API</strong>
            </div>
            <div className="col-4">
              <small className="text-muted d-block">update frequency</small>
              <strong className="text-dark">per hour</strong>
            </div>
            <div className="col-4">
              <small className="text-muted d-block">status</small>
              <span className="badge bg-warning-subtle text-warning">
                <i className="fas fa-clock me-1"></i>waiting
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChartCard;