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

function ActivitiesJobspage() {
  const navigate = useNavigate(); 
    const { id } = useParams();
  const [washData, setWashData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  
  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/activities/get/" + id, {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            setWashData(response.data);
            setShowLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const washUpdateStatusHandler = () => {
    postdata('Washing');
  };

  const cleanUpdateStatusHandler = () => {
    postdata("Cleaning");
  };

  const waxUpdateStatusHandler = () => {
    postdata("waxing");
  };

  const endUpdateStatusHandler = () => {
    postdata("End");
  };
  const postdata = async (status) => {
    const postData = {
      id: id,
      status: status,
    };

  //  console.log(postData);

    try {
      const res = await axios.post(
        "http://localhost:8086/api/activities/updatestatus",
        postData,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      // console.log(res.status);
      if (res.status == 200) {
        navigate("/staff/jobspage");
      }
    } catch (err) {
      console.log(err);
    }
  };


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
              รับรถวันเวลา:
              {moment(washData[0].createdate).format("YYYY-MM-DD hh:mm")}
            </Col>
            <Col className="text-center">สถานะ: {washData[0].washstatus}</Col>
          </Row>
          <Row>
            <Col className="text-center">{washData[0].washtype}</Col>
            <Col className="text-center">ราคา: {washData[0].price}</Col>
          </Row>

          <Row>
            <Col className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={washUpdateStatusHandler}
              >
                ล้างรถ
              </button>
            </Col>
            <Col className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={cleanUpdateStatusHandler}
              >
                เช็ดรถ ดูดฝุ่น
              </button>
            </Col> 
            <Col className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={waxUpdateStatusHandler}
              >
                เครือบสี
              </button>
            </Col> 
            <Col className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={endUpdateStatusHandler}
              >
                จบงาน
              </button>
            </Col>
          </Row>
        </Container>
      )}
      <Footer />
    </div>
  );
}

export default ActivitiesJobspage;
