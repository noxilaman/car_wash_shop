import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, useParams } from "react-router-dom";

function PublicHeader() {


  const navigate = useNavigate()
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <img src="/uploads/logo/demo.png" className="logoimg"></img>
        <Navbar.Brand href="#">Car Wash App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default PublicHeader;
