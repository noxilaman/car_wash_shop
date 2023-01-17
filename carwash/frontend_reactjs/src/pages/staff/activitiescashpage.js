import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useParams, useNavigate } from "react-router-dom";

function ActivitiesCashspage() {
  const navigate = useNavigate(); 
    const { id } = useParams();
  const [washData, setWashData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [note, setNote] = useState("");
  
  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/activities/get/" + id, {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            setWashData(response.data);
            setShowLoading(false);
          });
      } catch (err) {
        console.log(err);
          localStorage.setItem("token", "");
          localStorage.setItem("groupname", "");
          navigate("/login");
      }
    })();
  }, []);

  const paidCashStatusHandler = () => {
    postdata('Paid','Cash');
  };

  const paidCardStatusHandler = () => {
    postdata("Paid",'Card');
  };

  const paidTransferStatusHandler = () => {
    postdata("Paid","Transfer");
  };

  const paidCouponStatusHandler = () => {
    postdata("Paid",'Coupon');
  };

  const paidOtherStatusHandler = () => {
    if(note != ""){
      postdata("Paid",note);
    }
    
  };

  const formNoteHandler = event => {
    setNote(event.target.value);
  };

  const postdata = async (status,note) => {
    const postData = {
      id: id,
      status: status,
      note: note,
    };

  //  console.log(postData);

    try {
      const res = await axios.post(
        "http://localhost:8086/api/activities/updatestatus",
        postData,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      // console.log(res.status);
      if (res.status == 200) {
        navigate("/cashier/jobspage");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <Header />
      {!showLoading && (
        <Container fluid>
          <Row className="m-2 p-2">
            <Col className="text-center">
              <h1>
                จ่ายเงิน 
                {washData[0].licensecode} {washData[0].licensecity} (
                {washData[0].carsize})
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              รับรถวันเวลา: {moment(washData[0].createdate).format("YYYY-MM-DD hh:mm")}
            </Col>
            <Col className="text-center">สถานะ: {washData[0].washstatus}</Col>
          </Row>
          <Row>
            <Col className="text-center">งาน: {washData[0].washtype}</Col>
            <Col className="text-center">ราคา: {washData[0].price}</Col>
          </Row>

          <Row className="p-2">
            <Col className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={paidCashStatusHandler}
              >
                จ่ายเงินสด
              </button>
            </Col>
            <Col className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={paidCardStatusHandler}
              >
                จ่ายบัตร
              </button>
            </Col> 
            <Col className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={paidTransferStatusHandler}
              >
                โอนจ่าย
              </button>
            </Col> 
          </Row>
          <Row className="p-2">
          <Col className="text-center">
              <button
                className="btn btn-secondary btn-lg"
                onClick={paidCouponStatusHandler}
              >
                ใช้คูปองส่วนลด
              </button>
            </Col> 
            <Col className="text-center">
              <button
                className="btn btn-secondary btn-lg"
                onClick={paidOtherStatusHandler}
              >
                อื่นๆ
              </button>
            </Col>
            <Col className="text-center">
            <Form.Control
                  type="text"
                  placeholder="ใส่รายละเอียดจ่ายเงิน คูปอง หรือ อื่นๆ"
                  onChange={formNoteHandler}
                />
            </Col>
          </Row>
        </Container>
      )}
      <Footer />
    </div>
  );
}

export default ActivitiesCashspage;
