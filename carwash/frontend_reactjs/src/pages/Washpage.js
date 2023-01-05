import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function Washpage() {
  const navigate = useNavigate(); 
  let { shopid } = useParams();
  const [licensename,setLicensename] = useState('');
  const [city,setCity] = useState('');
  const [sizeId,setSizeId] = useState('');
  const [washTypeId,setWashTypeId] = useState('');
  const [carSizes,setCarSize] = useState([]);
  const [price,setPrice] = useState(0);
  const [washTypes, setWashTypes] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const tokenkey = localStorage.getItem("token");
  const shop_id = shopid ||  localStorage.getItem("shop_id");

  const [postResult,setPostResult] = useState(null);

  // const washTypeId = useRef();

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

    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  })();
},[]);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const licenseNameHandler = event => {
    setLicensename(event.target.value);
  }

  const cityHandler = event => {
    setCity(event.target.value);
  }
  
  const sizeIdHandler = event => {
    setSizeId(event.target.value);
     console.log(sizeId);
  priceHandler(washTypeId,event.target.value);
  }

  const washTypeIdHandler = event => {
     setWashTypeId(event.target.value);
    // console.log(washTypeId.current);
    priceHandler(event.target.value, sizeId);
  }

  const selectFileHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const priceHandler = async (wtid,scid) => {
    try {
      if (
        wtid !== "" &&
        scid !== "" &&
        wtid !== "Open this select menu" &&
        scid !== "Open this select menu"
      ) {
        const res2 = await axios
          .get(
            "http://localhost:8086/api/price/getselected/" + shop_id + "/" + wtid + "/" + scid
            , {
              headers: {
                "x-access-token": tokenkey,
              },
            })
          .then(function (response) {
            // setWashTypes(response.data);
            if(response.data !== null){
              console.log(response.data[0].price);
              setPrice(response.data[0].price);
            }else{
              console.log(response);
            }
            
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postdata = async () => {

    const formData = new FormData();

    formData.append('licensename', licensename);
    formData.append('city', city);
    formData.append('sizeId', sizeId);
    formData.append('washTypeId', washTypeId);
    formData.append('price', price);
    formData.append("shop_id", shop_id);
    if (selectedFile){
      formData.append("File", selectedFile);
    } 

    console.log(formData);

    try {
      const res = await axios.post("http://localhost:8086/api/washcar/create", formData, {
        headers: {
          "x-access-token": tokenkey,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      if(res.status == 200){
        navigate("/listpage/" + shop_id);
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col className="text-center">
            <h1>Washpage</h1>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formLicenseName">
                <Form.Label>ทะเบียนรถ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่ทะเบียนรถ"
                  onChange={licenseNameHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLicenseCity">
                <Form.Label>จังหวัด</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ใส่ทะเบียนจังหวัด"
                  onChange={cityHandler}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>รูปรถ</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={selectFileHandler} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formLicenseName">
                <Form.Label>ขนาดรถ</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={sizeId}
                  onChange={sizeIdHandler}
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
                  onChange={washTypeIdHandler}
                >
                  <option>Open this select menu</option>
                  {washTypes.map((opt) => (
                    <option value={opt.id}>{opt.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>ราคา</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ราคา"
                  value={price}
                />
              </Form.Group>
              <Button variant="primary" onClick={postdata}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default Washpage;
