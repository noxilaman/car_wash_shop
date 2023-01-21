import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PublicHeader from "../../layouts/PublicHeader";
import Footer from "../../layouts/Footer";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useParams, useNavigate } from "react-router-dom";

function MyCarPage() {
  const SERVER_URL = process.env.REACT_APP_WEB_URL;
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
          .get(SERVER_URL + "/api/public/activity/get/" + id)
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
        .get(SERVER_URL + "/api/public/activity/get/" + id)
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
      <PublicHeader />
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
          {washData[0].photo !== "" && washData[0].photo !== null && (
<Row>
            <div className="text-center">
              <img src={ washData[0].photo } className="img-thumbnail" />
            </div>
          </Row>
          )}
          
        </Container>
      )}
      <Footer />
    </div>
  );
}

export default MyCarPage;
