import Card from "react-bootstrap/Card";

function Cards({ src, title, text }) {
  return(
  <Card>
    <Card.Img
      className="m-2"
      variant="top"
      src={src}
      style={{ height: "5rem" }}
    />

    <Card.Body >
      <Card.Title>{title}</Card.Title>
      <Card.Text>{text}</Card.Text>
    </Card.Body>
  </Card>
  );
}

export default Cards;
