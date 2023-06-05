import React from "react";
import { Alert, Container } from "react-bootstrap";

export default function Ayuda() {
  return (
    <Container className="m-5">
      <Alert variant="light">
        <Alert.Heading>Ayuda al Usuario</Alert.Heading>
        <p>
          Para acceder a la guía de uso de ASSETCOM:{" "}
          <Alert.Link href="manual.pdf" target="_blank">Manual</Alert.Link>
        </p>
        <hr />
        <p className="mb-0">
          Puede indicarnos sus indicencias, consultas o peticiones en el email
          soporte@assetcom.es o en el teléfono 666999666
        </p>
      </Alert>
    </Container>
  );
}
