import { Container, Row, Col } from "react-bootstrap";
import StatisticsCard from "./StatisticsCard";
import ChartCard from "./ChartCard";

const HeroSection = () => {
  return (
    <div className="hero-section-data">
      <Container>
        {/* 标题部分 - 添加动画效果 */}
        <div className="text-center mb-5 fade-in-up">
          <h1 className="display-4 fw-bold text-dark mb-4">
            Melbourne's Growing 
            <span className="text-primary"> Parking Problem</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "900px", lineHeight: "1.8" }}>
            Melbourne has become increasingly dependent on car travel since COVID, with drivers spending an average of 
            <span className="fw-bold text-danger"> 17 hours per year</span> searching for parking in the CBD. 
            Understanding the growth trends helps us quantify the impact on urban infrastructure.
          </p>
          
          {/* 添加关键指标横幅 */}
          <div className="mt-4 p-4 bg-light rounded-pill d-inline-block">
            <div className="row g-0 align-items-center">
              <div className="col-auto">
                <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                <strong>关键问题：</strong>
              </div>
              <div className="col-auto ms-3">
                <span className="text-muted">停车搜索时间增长</span>
                <strong className="text-danger ms-2">+23% 较疫情前</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 统计卡片网格 - 增加更多卡片 */}
        <Row className="justify-content-center mb-5">
          <StatisticsCard
            icon="fa-users"
            value="5.8M"
            label="Population"
            description="Mel-CBD"
            variant="primary"
            showTrend={true}
          />
          <StatisticsCard
            icon="fa-car"
            value="4.7M"
            label="Vehicles"
            description="YOY 5.8%"
            variant="success"
            showTrend={true}
          />
          <StatisticsCard
            icon="fa-clock"
            value="17h"
            label="Search Time"
            description="Per Driver Average"
            variant="danger"
          />
          <StatisticsCard
            icon="fa-percentage"
            value="85%"
            label="CBD Occupancy"
            description="rush hour"
            variant="warning"
          />
        </Row>

        {/* 图表部分 */}
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <ChartCard
              title="人口增长趋势"
              icon="📈"
              description="墨尔本大都市区人口变化（2019-2024）"
              chartType="line chart"
            />
          </Col>
          <Col md={6} className="mb-4">
            <ChartCard
              title="车辆注册趋势"
              icon="🚗"
              description="新车注册数量年度对比"
              chartType="柱状图"
            />
          </Col>
        </Row>

        {/* 添加洞察卡片 */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <ChartCard
              title="parking Search Trends"
              icon="🔍"
              description="searched frequency and peak times"
              chartType="heatmap"
            />
          </Col>
          <Col md={4} className="mb-4">
            <ChartCard
              title="area Analysis"
              icon="🗺️"
              description="compare parking difficulty across regions"
              chartType="map"
            />
          </Col>
          <Col md={4} className="mb-4">
            <ChartCard
              title="parking fee trend Analysis"
              icon="💰"
              description="history of parking fees"
              chartType="area chart"
            />
          </Col>
        </Row>

        {/* 添加关键洞察部分
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="bg-white rounded-4 shadow-lg p-5 border">
              <h2 className="text-center fw-bold mb-4 text-dark">
                <i className="fas fa-lightbulb text-warning me-2"></i>
                关键洞察
              </h2>
              <Row className="g-4">
                <Col md={4}>
                  <div className="text-center p-4 bg-primary-subtle rounded-3 h-100">
                    <div className="fs-1 mb-3">🚗</div>
                    <h5 className="fw-semibold mb-3">需求持续增长</h5>
                    <p className="text-muted mb-0">
                      车辆注册增长率与人口增长率同步，表明汽车依赖度未降低
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-4 bg-warning-subtle rounded-3 h-100">
                    <div className="fs-1 mb-3">⏰</div>
                    <h5 className="fw-semibold mb-3">高峰期挑战</h5>
                    <p className="text-muted mb-0">
                      上下班时间停车搜索需求激增，造成交通拥堵恶性循环
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-4 bg-success-subtle rounded-3 h-100">
                    <div className="fs-1 mb-3">💡</div>
                    <h5 className="fw-semibold mb-3">智能解决方案</h5>
                    <p className="text-muted mb-0">
                      实时数据驱动的停车系统可有效减少搜索时间和排放
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default HeroSection;