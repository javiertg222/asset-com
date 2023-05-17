import { Card } from "react-bootstrap";
import "../../css/app.css";

function CardHome(props) {

  return (
    <Card className="m-2" style={{ width: "20rem", backgroundColor: props.data.color}}>
      <Card.Body>
        <Card.Title className="card-title">{props.data.title}</Card.Title>
        <Card.Text as="div" className={typeof props.data.counter==='object'?'card-counter-localizacion' :'card-counter'}>{props.data.counter}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardHome;
