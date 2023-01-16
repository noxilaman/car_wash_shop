import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, useParams } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const tokenkey = localStorage.getItem("token");
  const groupname = localStorage.getItem("groupname");

  let userobj = [];

  const storedData = localStorage.getItem("user");
  if (!storedData) {
    console.log("Local storage is empty");
  } else {
    console.log(storedData);
    userobj = JSON.parse(storedData);
  }

  const logoutHandler = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("groupname", "");
    navigate("/login");
  };
  console.log(groupname);

  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <img src="/uploads/logo/demo.png" className="logoimg"></img>
        <Navbar.Brand href="/">Car Wash App [{groupname}]</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {tokenkey !== null &&
            tokenkey.length > 0 &&
            groupname !== null &&
            groupname == "Admin" && (
              <Nav className="me-auto">
                <Nav.Link href="/dashboardpage">Dashboard</Nav.Link>
                <Nav.Link href={"/washpage"}>ล้างรถ</Nav.Link>
                <Nav.Link href={"/listpage"}>รายการ</Nav.Link>
                <NavDropdown title="Main Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/admin/group/list">
                    group
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/user/list">
                    พนักงาน
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/carsize/list">
                    ขนาดรถ
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/washtype/list">
                    บริการ
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/price/list">
                    ราคาบริการ
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </Nav>
            )}

          {tokenkey !== null &&
            tokenkey.length > 0 &&
            groupname !== null &&
            groupname === "Reception" && (
              <Nav className="me-auto">
              <Nav.Link href="/listpage">Dashboard</Nav.Link>
              <Nav.Link href={"/washpage"}>ล้างรถ</Nav.Link>
              <Nav.Link href={"/dashboardpage"}>รายการ</Nav.Link>
                <Nav.Link href="#" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </Nav>
            )}

          {tokenkey !== null &&
            tokenkey.length > 0 &&
            groupname !== null &&
            groupname === "Washman" && (
              <Nav className="me-auto">
                <Nav.Link href="/dashboardpage">Dashboard</Nav.Link>
                <Nav.Link href={"/staff/jobspage"}>รายการ</Nav.Link>
                <Nav.Link href="#" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </Nav>
            )}

{tokenkey !== null &&
            tokenkey.length > 0 &&
            groupname !== null &&
            groupname.trim() === "Cashier" && (
              <Nav className="me-auto">
                <Nav.Link href="/dashboardpage">Dashboard</Nav.Link>
                <Nav.Link href={"/cashier/jobspage"}>รายการ</Nav.Link>
                <Nav.Link href="#" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </Nav>
            )}

          {(tokenkey === null || tokenkey.length === 0) && (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
