import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Loginpage() {

  const SERVER_URL = process.env.REACT_APP_WEB_URL;

  console.log(SERVER_URL);

  const navigate = useNavigate(); 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState("");

    const emailHandler = event => {
    setEmail(event.target.value);
  }

  const passwordHandler = event => {
     setPassword(event.target.value);
  }

  const postdata = async () => {
    if(!email){
      setAlertMessage("Email is empty!");
      return;
    }

    if (!password) {
      setAlertMessage("Password is empty!");
      return;
    }

    const postData = {
      email: email,
      password: password
    };

    try {
      const res = await axios.post(
        SERVER_URL + "/api/user/login",
        postData,
        {
          headers: {
            "x-access-token": "token-value",
          },
        }
      );

      console.log(res.status);
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));

        const res2 = await axios
          .get(SERVER_URL + "/api/group/" + res.data.group_id, {
            headers: {
              "x-access-token": res.data.token,
            },
          })
          .then(function (response) {
            console.log(response.data.name);
              localStorage.setItem("groupname", response.data.name);
              if(response.data.name == 'Washman'){
                navigate("/staff/jobspage");
              }else{
                navigate("/");
              }
          });

        
        
      }else{
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        setAlertMessage(res.data.message);
      }
    } catch (err) {
      console.log(err);
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      setAlertMessage(err.response.data.message);
    }
  };

    return (
      <div>
        <Header />
        <Container fluid>
          <Row>
            <Col className="text-center">
              <h1>Login</h1>
            </Col>
          </Row>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ใส่ Email"
                    onChange={emailHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="ใส่ Password"
                    onChange={passwordHandler}
                  />
                  <Form.Label className="text-danger">{alertMessage}</Form.Label>
                </Form.Group>
                
                <Button variant="primary" onClick={postdata}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Footer />
      </div>
    );
}

export default Loginpage;