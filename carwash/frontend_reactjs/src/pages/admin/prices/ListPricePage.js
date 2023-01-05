import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListPricePage() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/price/list", {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            if (response.status === 200) {
              setUserList(response.data);
            } else {
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

  const deletePriceHandler = async (event) => {
    const id = event.target.dataset.id;

    try {
      const res = await axios.delete(
        "http://localhost:8086/api/price/" + id,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      console.log(res.status);
      if (res.status === 200) {
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
            <h1>รายการ ราคา บริการ</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href={"/admin/price/create/"} className="btn btn-info">
              สร้างราคา บริการ
            </a>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ขนาด</th>
                  <th>บริการ</th>
                  <th>ราคา</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((opt) => (
                  <tr>
                    <td>{opt.car_size_name}</td>
                    <td>{opt.wash_type_name}</td>
                    <td>{opt.price}</td>
                    <td>
                      <a
                        href={"/admin/price/edit/" + opt.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </a>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        data-id={opt.id}
                        onClick={deletePriceHandler}
                      >
                        Delete
                      </button>
                    </td>
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

export default ListPricePage;
