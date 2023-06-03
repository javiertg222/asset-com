import Alert from "react-bootstrap/Alert";

function AlertData(message, color, setShow) {
  return (
    <Alert key={color} variant={color} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  );
}

export default AlertData;
