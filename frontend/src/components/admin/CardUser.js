import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Modal, Button } from "react-bootstrap";

function CardUser(props) {

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card bg="primary" style={{ width: "18rem" }}>
            <ListGroup variant="flush">
            <ListGroup.Item><b>FOTO:</b> {props.user.id_user}</ListGroup.Item>
              <ListGroup.Item><b>ID:</b> {props.user.id_user}</ListGroup.Item>
              <ListGroup.Item><b>NOMBRE:</b> {props.user.name_user}</ListGroup.Item>
              <ListGroup.Item><b>APELLIDO:</b> {props.user.nickname_user}</ListGroup.Item>
              <ListGroup.Item><b>APODO:</b> {props.user.nickname_user}</ListGroup.Item>
              <ListGroup.Item><b>EMAIL:</b> {props.user.email_user}</ListGroup.Item>
              <ListGroup.Item><b>ROL:</b> {props.user.name_rol}</ListGroup.Item>
              <ListGroup.Item><b>FECHA:</b> {props.user.fecha}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardUser;
