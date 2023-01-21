
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function Cashspage() {
  const SERVER_URL = process.env.REACT_APP_WEB_URL;
  const navigate = useNavigate(); 
  const [washList, setWashList] = useState([]);
  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get(SERVER_URL + "/api/activities/listByCashier", {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            if(response.status == 200){
              setWashList(response.data);
            }else{

          localStorage.setItem("token", "");
          localStorage.setItem("groupname", "");
              navigate("/login");
            }
          });
      } catch (err) {
        
        console.log(err);
          localStorage.setItem("token", "");
          localStorage.setItem("groupname", "");
          navigate("/login");
      }
    })();
  }, []);

  setInterval(async () => {
    try {
      const res = await axios
        .get(SERVER_URL + "/api/activities/listByCashier", {
          headers: {
            "x-access-token": tokenkey,
          },
        })
        .then(function (response) {
          if(response.status == 200){
            setWashList(response.data);
          }else{

        localStorage.setItem("token", "");
        localStorage.setItem("groupname", "");
            navigate("/login");
          }    

        });
    } catch (err) {
      console.log(err);

      localStorage.setItem("token", "");
      localStorage.setItem("groupname", "");
          navigate("/login");
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
                  <th>ขนาดรถ</th>
                  <th>ประเภท</th>
                  <th>สถานะ</th>
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
                    <td>{opt.carsize}</td>
                    <td>{opt.washtype}<br/>{opt.washprice}</td>
                    <td>{opt.washstatus}</td>
                    <td>
                        <a href={
                          "/staff/activitiescashier/" +
                          opt.id
                        }>
                      <QRCodeCanvas
                        value={
                          
                          "/staff/activitiescashier/" +
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

export default Cashspage;
