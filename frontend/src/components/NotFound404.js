import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function NotFound404() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>¡¡¡Vaya algo ha salido mal... Error 404!!!</Alert.Heading>
      </Alert>
    );
  }else{
    return <Navigate to="/"/> 
  }
}

export default NotFound404;
