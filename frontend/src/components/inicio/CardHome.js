import { Card } from "react-bootstrap";
import "../../css/app.css";

function CardHome(props) {
  return (
    <Card style={{ width: "20rem" }} bg={props.data.color}>
      <Card.Body>
        <Card.Title className="card-title">{props.data.title}</Card.Title>
        <Card.Text className="card-counter">{props.data.counter}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardHome;
