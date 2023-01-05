import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateWashtypePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [alertmessage, setAlertmessage] = useState("");
  
  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
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
      } catch (err) {
        console.log(err);
        localStorage.setItem("token", "");
        navigate("/login");
      }
    })();
  }, []);

  const formNameHandler = (event) => {
    setName(event.target.value);
  };

  const formDescHandler = (event) => {
    setDesc(event.target.value);
  };

  const postdata = async () => {
    const postData = {
      name: name,
      desc: desc,
    };

    try {
      const res = await axios.post(
        "http://localhost:8086/api/washtype",
        postData,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      console.log(res.status);
      if (res.status == 200) {
        navigate("/admin/washtype/list");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1>Create บริการ</h1>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formFname">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่ชื่อ"
                  onChange={formNameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLname">
                <Form.Label>รายละเอียด</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่นามสกุล"
                  onChange={formDescHandler}
                />
              </Form.Group>
              <Button variant="primary" onClick={postdata}>
                สร้าง
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default CreateWashtypePage;
