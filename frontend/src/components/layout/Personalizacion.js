import { Image, Col } from "react-bootstrap";
/**
   * Espacio para la imagen corporativa
   * @returns
   */

const Personalizacion = (props) => {
    return (
      <Col md="auto">
        <Image
          src={props.data[0].image}
          style={{ width: 150, height: 35 }}
          thumbnail
          alt="imagen corporativa"
        />
      </Col>
    );
  };

  export default Personalizacion;
