import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import users from "../../imagenes/users.svg";
import settings from "../../imagenes/settings.svg";
import database from "../../imagenes/database.svg";

function Administration() {
  return (
    <>
      <Container className="m-6" fluid>
        <Row xs={1} md={3} className="m-3">
          <Col>
            <Link style={{ textDecoration: "none" }} to="users">
              <Cards
                src={users}
                title="Usuarios"
                text="Espacio para administrar usuarios"
              />
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: "none" }} to="settings">
              <Cards
                src={settings}
                title="Configuración"
                text="Espacio para configurar el sitio"
              />
            </Link>
          </Col>
          <Col>
            <Link style={{ textDecoration: "none" }} to="backups">
              <Cards
                src={database}
                title="Copias de seguridad"
                text="Espacio para los backups"
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Administration;
