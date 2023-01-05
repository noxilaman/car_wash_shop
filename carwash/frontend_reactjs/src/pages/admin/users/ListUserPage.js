import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListUserPage() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const tokenkey = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://localhost:8086/api/user/list", {
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

  const deleteUserHandler = async (event)=> {
    const id = event.target.dataset.id;

    try {
      const res = await axios.delete(
        "http://localhost:8086/api/user/" + id,
        {
          headers: {
            "x-access-token": tokenkey,
          },
        }
      );

      console.log(res.status);
      if (res.status === 200) {
        navigate("/admin/user/list");
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
            <h1>รายการ User</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href={"/admin/user/create/"} className="btn btn-info">
              สร้าง User
            </a>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Group</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((opt) => (
                  <tr>
                    <td>
                      {opt.fname} - {opt.lname}
                    </td>
                    <td>{opt.email}</td>
                    <td>{opt.mobile}</td>
                    <td>{opt.groupname}</td>
                    <td>
                      <a
                        href={"/admin/user/edit/" + opt.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </a>
                      <a
                        href={"/admin/user/editgroup/" + opt.id}
                        className="btn btn-secondary"
                      >
                        Edit Group
                      </a>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        data-id={opt.id}
                        onClick={deleteUserHandler}
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

export default ListUserPage;
