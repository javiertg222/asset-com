import Alert from "react-bootstrap/Alert";

function AlertData(message, color) {
  return (
    <Alert key={color} variant={color}>
      {message}
    </Alert>
  );
}

export default AlertData;
