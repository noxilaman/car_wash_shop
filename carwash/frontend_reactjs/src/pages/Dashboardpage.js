
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function Dashboardpage() {
  const SERVER_URL = process.env.REACT_APP_WEB_URL;
  const navigate = useNavigate(); 
  const [washList, setWashList] = useState([]);
  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get(SERVER_URL + "/api/activities/list", {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            if(response.status == 200){
              setWashList(response.data);
            }else{
              navigate("/login");
            }
          });
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    })();
  }, []);

  setInterval(async () => {
    try {
      const res = await axios
        .get(SERVER_URL + "/api/activities/list", {
          headers: {
            "x-access-token": tokenkey,
          },
        })
        .then(function (response) {
          setWashList(response.data);      

        });
    } catch (err) {
      console.log(err);
    }
  }, 50000);
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1>รายการล้างรถ</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>วันเวลา</th>
                  <th>ทะเบียนรถ</th>
                  <th>Photo</th>
                  <th>ขนาดรถ</th>
                  <th>ประเภท</th>
                  <th>สถานะ</th>
                  <th>QR CODE link สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {washList !== null && (
                washList.map((opt) => (
                  <tr>
                    <td>{moment(opt.createdate).format("YYYY-MM-DD hh:mm")}</td>
                    <td>
                      {opt.licensecode} - {opt.licensecity}
                    </td>
                    <td>
                      {opt.photo !== "" && opt.photo !== null && (
                        <div>
                          <img src={opt.photo} className="img-thumbnail"></img>
                        </div>
                      )}
                    </td>
                    <td>{opt.carsize}</td>
                    <td>{opt.washtype}</td>
                    <td>{opt.washstatus}</td>
                    <td>
                        <a href={
                          "/mycar/view/" +
                          opt.id
                        }>
                      <QRCodeCanvas
                        value={
                          
                          "/mycar/view/" +
                          opt.id
                        }
                      />
                      </a>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboardpage;
