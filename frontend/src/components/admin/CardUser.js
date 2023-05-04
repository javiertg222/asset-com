import {Card, ListGroup, Image} from "react-bootstrap";
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
            <ListGroup.Item><b>FOTO:</b><Image className="m-1" src={props.user.image} style={{height:60 , width:50,}}  thumbnail/></ListGroup.Item>
              <ListGroup.Item><b>ID:</b> {props.user.id}</ListGroup.Item>
              <ListGroup.Item><b>NOMBRE:</b> {props.user.nombre}</ListGroup.Item>
              <ListGroup.Item><b>APELLIDO:</b> {props.user.apellido}</ListGroup.Item>
              <ListGroup.Item><b>APODO:</b> {props.user.apodo}</ListGroup.Item>
              <ListGroup.Item><b>EMAIL:</b> {props.user.email}</ListGroup.Item>
              <ListGroup.Item><b>ROL:</b> {props.user.rol}</ListGroup.Item>
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
