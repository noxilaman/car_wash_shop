import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListGroupPage() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/group", {
            headers: {
              "x-access-token": tokenkey,
            },
          })
          .then(function (response) {
            console.log(response);
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

  const deleteCarSizeHandler = async (event) => {
    const id = event.target.dataset.id;

    try {
      const res = await axios.delete(
        "http://localhost:8086/api/group/" + id,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      console.log(res.status);
      if (res.status === 200) {
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
            <h1>รายการ กลุ่ม</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href={"/admin/group/create/"} className="btn btn-info">
              สร้างกลุ่ม
            </a>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Desc</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((opt) => (
                  <tr>
                    <td>{opt.name}</td>
                    <td>{opt.desc}</td>
                    <td>
                      <a
                        href={"/admin/group/edit/" + opt.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </a>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        data-id={opt.id}
                        onClick={deleteCarSizeHandler}
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

export default ListGroupPage;
