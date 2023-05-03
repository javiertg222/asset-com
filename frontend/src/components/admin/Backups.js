import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AlertData from "../AlertData";
function Backups() {
  //Constantes de estado para tratar los backups de la aplicación
  const [status, setStatus] = useState(false);
  const [backup, setBackup] = useState();

/**
 * Función para manejar el evento que desencadena el backup
 * @param {*} e 
 */
  const handleBackup = (e) => {
    fetch("http://localhost:3001/api/backup")
      .then((response) => response.json())
      .then((datos) => {
        setBackup(datos);
        setStatus(true);
      });
  };

  return (
    <Container className="m-5 justify-content-md-center">
      {status
        ? AlertData(backup.ok || backup.notok, backup.ok ? "success" : "danger")
        : null}
      <h6 className="m-3 text-center" style={{ color: "#6c757d" }}>
        Pulse el aquí para realizar una copia de seguridad de la base de datos
      </h6>
      <Row>
        <Col className="text-center">
          <Button onClick={handleBackup} variant="primary" size="lg">
            Copia de seguridad
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Backups;
