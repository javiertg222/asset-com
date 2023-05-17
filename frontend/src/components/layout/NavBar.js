import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import decodeToken from "../../utils/decodeToken";
import { getConfiguration } from "../../utils/configuration";
import Personalizacion from "./Personalizacion";

function NavBar() {
  //Decodificar el token para utilixar el nombre de usuario
  const decode = decodeToken;
  console.log(decode);

  const [config, setConfig] = useState([]);
  useEffect(() => {
    getConfiguration("http://localhost:3001/configuracion", setConfig);
  }, []);

  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Inicio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/assets">
              Assets
            </Nav.Link>
            <Nav.Link as={Link} to="#ayuda">
              Ayuda
            </Nav.Link>
            <NavDropdown title="Perfil" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login">
                {/*decode ? decode.token.name : "Perfil"*/}
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/password">
                Cambiar Contraseña
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Row>
          <Col md="auto" style={{ color: "white", fontSize: "1.3em" }}>
            {config.length !== 0 && config[0].titulo ? config[0].titulo : ""}
          </Col>
          {config.length !== 0 && config[0].image ? <Personalizacion data={config} />:""}
          <Col md="auto">
            <Link to="/admin" title="Administración">
              <RiAdminFill style={{ color: "white" }} size={"2em"} />
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavBar;
