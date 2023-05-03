import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "../AlertData";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

function Settings() {
  const [alerta, setAlerta] = useState(false);
  const [config, setConfig] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/settings")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((error) => console.log(error));
  }, []);

  //VALIDACIONES
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [datos, setDatos] = useState({ title: "", image: "" });
  /**
   * Recoge los datos del evento onChange del formulario
   * @param {*} e
   */
  const handleInputChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitConfig = (datos, e) => {
    e.preventDefault();
    // LEER DATOS DEL FORMULARIO

    const form = e.target;
    const formData = new FormData(form);
    formData.append("datos", Object.entries(formData.entries()));

    //Variables para modificar los parámetros del fetch según sea añadir/modificar configuración 
    let url = "";
    let metodo = "";

    if (config.length !== 0) {
      url = `http://localhost:3001/api/setting/update/${config[0].id}`;
      metodo = "PUT";
    } else {
      url = "http://localhost:3001/api/setting";
      metodo = "POST";
    }

    // Se pasa formData en el cuerpo directamente:

    fetch(url, {
      method: metodo,
      body: formData,
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "multipart/form-data",
      // },
    })
      .then((res) => {
        if (res.status === 200) {
          setAlerta(true);
        }
      })
      .catch((error) => console.error(error));

    // Limpiar campos
    e.target.reset();
  };

  return (
    <Container className="m-5">
      {alerta ? AlertData("Configuración añadida!", "success") : null}

      <Form
        id="form-config"
        method="POST"
        onSubmit={handleSubmit(handleSubmitConfig)}
      >
        <h3>Configuración:</h3>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Título..."
                defaultValue={
                  config.length !== 0 ? config[0].title : datos.title
                }
                onChange={handleInputChange}
                {...register("title", {
                  required: {
                    value: true,
                    message: "Ingrese un título",
                  },
                  maxLength: {
                    value: 40,
                    message: "No puede contener más de 40 caracteres",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.title && errors.title.message}
              </span>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group controlId="formFileSm" as={Col} className="mb-3">
              <Form.Label>Imagen:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                size="sm"
                accept="image/*"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="secondary" type="reset" onClick={() => reset()}>
          Reset
        </Button>{" "}
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default Settings;
