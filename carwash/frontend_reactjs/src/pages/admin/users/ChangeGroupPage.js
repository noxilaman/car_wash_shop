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

function ChangeGroupPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [groupsList, setGroupsList] = useState([]);
  const [groupid, setGroupid] = useState("");
  const [alertmessage, setAlertmessage] = useState("");

  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res1 = await axios
        .get("http://localhost:8086/api/group/getall", {
          headers: {
            "x-access-token": tokenkey,
          },
        })
        .then(function (response) {
            setGroupsList(response.data);
          console.log(response.data);
        });

        const res = await axios
          .get("http://localhost:8086/api/user/" + id, {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            if (response.status !== 200) {
              localStorage.setItem("token", "");
              navigate("/login");
            } else {
              setFname(response.data.fname);
              setLname(response.data.lname);
              setEmail(response.data.email);
              setMobile(response.data.mobile);
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

  const formGroupHandler = (event) => {
    setGroupid(event.target.value);
  };
  

  const postdata = async () => {
    const formData = new FormData();

    formData.append("group_id", groupid);

    try {
      const res = await axios.post(
        "http://localhost:8086/api/user/updategroup/" + id,
        formData,
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
            <h1>Edit Group User #{id}</h1>
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
                  value={fname}
                  onChange={formFnameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLname">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่นามสกุล"
                  value={lname}
                  onChange={formLnameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMobile">
                <Form.Label>เบอร์มือถือ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่เบอร์มือถือ"
                  value={mobile}
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
                  value={email}
                  readOnly={true}
                  onChange={formEmailHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLicenseCity">
                <Form.Label>บริการ</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={groupid}
                  onChange={formGroupHandler}
                >
                  <option>Open this select menu</option>
                  {groupsList.map((opt) => (
                    <option value={opt.id}>{opt.name}</option>
                  ))}
                </Form.Select>
                <Form.Label className="text-danger">{alertmessage}</Form.Label>
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

export default ChangeGroupPage;
