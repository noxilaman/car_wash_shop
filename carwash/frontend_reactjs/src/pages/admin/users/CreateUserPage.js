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

function CreateUserPage() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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

  const formFnameHandler = (event) => {
    setFname(event.target.value);
  };

  const formLnameHandler = (event) => {
    setLname(event.target.value);
  };

  const formMobileHandler = (event) => {
    setMobile(event.target.value);
  };

  const formEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const formPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const formRePasswordHandler = (event) => {
    setRePassword(event.target.value);
  };

  const checkMatchPass = () => {
      if(password !== rePassword){
        setAlertmessage("Password ไม่ตรงกัน");
        setRePassword("");
      }else{
        setAlertmessage("");
      }
  }

  const postdata = async () => {
    const postData = {
      fname: fname,
      lname: lname,
      mobile: mobile,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:8086/api/user",
        postData,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      console.log(res.status);
      if (res.status == 200) {
        navigate("/admin/user/list");
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
            <h1>Create User</h1>
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
                  onChange={formFnameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLname">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่นามสกุล"
                  onChange={formLnameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMobile">
                <Form.Label>เบอร์มือถือ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่เบอร์มือถือ"
                  onChange={formMobileHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่ Email"
                  onChange={formEmailHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ใส่ Password"
                  onBlur={checkMatchPass}
                  onChange={formPasswordHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRePassword">
                <Form.Label>Re-Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ใส่ Re-Password"
                  value={rePassword}
                  onBlur={checkMatchPass}
                  onChange={formRePasswordHandler}
                />
                <Form.Label className="text-danger">{alertmessage}</Form.Label>
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

export default CreateUserPage;
