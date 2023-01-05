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

function EditPricePage() {
  let { id } = useParams();


  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [sizeId,setSizeId] = useState('');
  const [washTypeId,setWashTypeId] = useState('');
  const [carSizes,setCarSize] = useState([]);
  const [washTypes, setWashTypes] = useState([]);
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
          .then(async function (response) {

            if (response.status !== 200) {
              localStorage.setItem("token", "");
              navigate("/login");
            }

            

          });

          const res1 = await axios
            .get("http://localhost:8086/api/sizecar/getall", {
              headers: {
                "x-access-token": tokenkey,
              },
            })
            .then(function (response) {
              setCarSize(response.data);
              console.log(response.data);
            });
    
          const res2 = await axios
            .get("http://localhost:8086/api/washtype/getall", {
              headers: {
                "x-access-token": tokenkey,
              },
            })
            .then(function (response) {
              setWashTypes(response.data);
              console.log(response.data);
            });

            const res3 = await axios
          .get("http://localhost:8086/api/price/" + id, {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            if (response.status !== 200) {
              localStorage.setItem("token", "");
              navigate("/login");
            } else {
              setSizeId(response.data.car_size_id);
              setWashTypeId(response.data.wash_type_id);
              setPrice(response.data.price);
            }

            console.log(response.data);
          })

      } catch (err) {
        console.log(err);
        localStorage.setItem("token", "");
        navigate("/login");
      }
    })();
  }, []);

  const formPriceHandler = (event) => {
    setPrice(event.target.value);
  };

  const formSizeCarHandler = (event) => {
    setSizeId(event.target.value);
  };

  const formWashTypeHandler = (event) => {
    setWashTypeId(event.target.value);
  };

  const postdata = async () => {
    const formData = new FormData();

    formData.append("price", price);

    try {
      const res = await axios.put(
        "http://localhost:8086/api/price/" + id,
        formData,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      console.log(res.status);
      if (res.status == 200) {
        navigate("/admin/price/list");
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
            <h1>Create ราคา บริการ</h1>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="formLicenseName">
                <Form.Label>ขนาดรถ</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={sizeId}
                  onChange={formSizeCarHandler}
                >
                  <option>Open this select menu</option>
                  {carSizes.map((opt) => (
                    <option value={opt.id}>{opt.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLicenseCity">
                <Form.Label>บริการ</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={washTypeId}
                  onChange={formWashTypeHandler}
                >
                  <option>Open this select menu</option>
                  {washTypes.map((opt) => (
                    <option value={opt.id}>{opt.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFname">
                <Form.Label>ราคา</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ใส่ชื่อ"
                  value={price}
                  onChange={formPriceHandler}
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

export default EditPricePage;
