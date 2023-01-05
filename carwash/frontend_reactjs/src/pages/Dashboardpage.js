import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

function Dashboardpage() {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1>ระบบจัดการร้านล้างรถแบบง่าย</h1>
          </Col>
        </Row>
        <Row>
          <Col>ส่วนบริการลูกค้า</Col>
          <Col>ส่วนจัดการหลังบ้าย</Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboardpage;
