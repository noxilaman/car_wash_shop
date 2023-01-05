import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mainpage() {

  const navigate = useNavigate(); 

  const [shopData,setShopData] = useState([])

  const tokenkey = localStorage.getItem("token");
  const userobj = localStorage.getItem("user");

  console.log(userobj);

  useEffect(() => {
    (async () => {
      try {
        const chk = await axios
          .get("http://localhost:8086/api/checkauth", {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            if (response.status !== 200) {
              localStorage.setItem("token", "");
              navigate("/login");
            }
          });

        const res = await axios
          .get("http://localhost:8086/api/shop/", {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            setShopData(response.data);
            console.log(response.data);
          });

      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    })();
  }, []);
  
  const selectShopHandler = (event) => {
    const id = event.target.dataset.id;
    console.log(id);
    localStorage.setItem("shop_id", id);
     navigate("/listpage/"+ id) ;
  };


  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col>ร้าน</Col>
          <Col>รายละเอียด</Col>
          <Col>Action</Col>
        </Row>
        {shopData.map((opt) => (
          <Row>
            <Col>{opt.name}</Col>
            <Col>{opt.tel}</Col>
            <Col>
              <button
                onClick={selectShopHandler}
                data-id={opt.id}
                className="btn btn-primary"
              >
                select
              </button>
            </Col>
          </Row>
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export default Mainpage;
