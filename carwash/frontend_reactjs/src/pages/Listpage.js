import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { format } from "date-fns";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function Listpage() {
  let { shop_id } = useParams();
  const navigate = useNavigate();
  const [WashList, setWashList] = useState([]);

  const tokenkey = localStorage.getItem("token");
    useEffect(() => {
      (async () => {
        try {
          const res = await axios
            .get("http://localhost:8086/api/activities/listByShop/" + shop_id, {
              headers: {
                "x-access-token": tokenkey,
              },
            })
            .then(function (response) {
              if (response.status === 200) {
                setWashList(response.data);
              } else {
                localStorage.setItem("token", "");
                localStorage.setItem("shop_id", "");
                navigate("/login");
              }
            });
        } catch (err) {
          console.log(err);
          localStorage.setItem("token", "");
          localStorage.setItem("shop_id", "");
          navigate("/login");
        }
      })();
    }, []);

  setInterval(async () => {
    try {
      const res = await axios
        .get("http://localhost:8086/api/activities/listByShop/" + shop_id, {
          headers: {
            "x-access-token": tokenkey,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            setWashList(response.data);
          } else {
            localStorage.setItem("token", "");
            localStorage.setItem("shop_id", "");
            navigate("/login");
          }
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
          <Col className="coldashboard">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/zayvsHj-SwU?controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Col>
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
                {WashList.map((opt) => (
                  <tr>
                    <td>{moment(opt.createdate).format("YYYY-MM-DD hh:mm")}</td>
                    <td>
                      {opt.licensecode} - {opt.licensecity}
                    </td>
                    <td>{opt.carsize}</td>
                    <td>{opt.washtype}</td>
                    <td>{opt.washstatus}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Listpage;
