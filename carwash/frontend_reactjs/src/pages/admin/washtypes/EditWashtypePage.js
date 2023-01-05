import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditWashtypePage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [alertmessage, setAlertmessage] = useState("");

  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/sizecar/" + id, {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            if (response.status !== 200) {
              localStorage.setItem("token", "");
              navigate("/login");
            } else {
              setName(response.data.name);
              setDesc(response.data.desc);
            }

            console.log(response.data);
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
    const formData = new FormData();

    formData.append("name", name);
    formData.append("desc", desc);

    try {
      const res = await axios.put(
        "http://localhost:8086/api/washtype/" + id,
        formData,
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
            <h1>Edit บริการ #{id}</h1>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="ใส่ชื่อ"
                  onChange={formNameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDesc">
                <Form.Label>รายละเอียด</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่รายละเอัยด"
                  value={desc}
                  onChange={formDescHandler}
                />
              </Form.Group>
              <Button variant="primary" onClick={postdata}>
                แก้ไข
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default EditWashtypePage;
