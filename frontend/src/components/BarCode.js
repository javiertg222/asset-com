import { Modal, Button } from "react-bootstrap";
import CreateBarCode from "../utils/createBarCode";
import { FaPrint } from "react-icons/fa";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function BarCode() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  if (!show) {
    navigate("/assets");
  }
  //const handleShow = () => setShow(true);

  //Impresión del código de barras
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Código de Barras Generado</Modal.Title>
      </Modal.Header>

      <Modal.Body ref={componentRef}>{CreateBarCode(state.assetData)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          <FaPrint size={"1.7em"} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BarCode;
