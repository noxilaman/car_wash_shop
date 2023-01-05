import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useParams, useNavigate } from "react-router-dom";

function MyCarPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [washData, setWashData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [updateDate, setUpdateDate] = useState(true);

  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/public/activity/get/" + id)
          .then(function (response) {
            setWashData(response.data);
            setShowLoading(false);

            const d = new Date();
            let text = d.toLocaleString();
                      setUpdateDate(text);
          });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  setInterval(async () => {
    try {
      const res = await axios
        .get("http://localhost:8086/api/public/activity/get/" + id)
        .then(function (response) {
            const d = new Date();
let text = d.toLocaleString();
          setWashData(response.data);
          setShowLoading(false);
          setUpdateDate(text);
        });
    } catch (err) {
      console.log(err);
    }
  }, 60000);

  return (
    <div>
      <Header />
      {!showLoading && (
        <Container fluid>
          <Row>
            <Col className="text-center">
              <h1>
                {washData[0].licensecode} {washData[0].licensecity} (
                {washData[0].carsize})
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <h2>
                รับรถวันเวลา:
                {moment(washData[0].createdate).format("YYYY-MM-DD hh:mm")}
              </h2>
            </Col>
          </Row>
          <Row>
            <h2>
              <Col className="text-center">สถานะ: {washData[0].washstatus}</Col>
            </h2>
          </Row>
          <Row>
            <h2>
              <Col className="text-center">{washData[0].washtype}</Col>
            </h2>
          </Row>
          <Row>
            <h2>
              <Col className="text-center">ราคา: {washData[0].price}</Col>
            </h2>
          </Row>
          <Row>
            <h2>
              <Col className="text-center">Update: {updateDate}</Col>
            </h2>
          </Row>
        </Container>
      )}
      <Footer />
    </div>
  );
}

export default MyCarPage;
