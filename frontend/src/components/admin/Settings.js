import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "../AlertData";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getConfiguration } from "../../utils/configuration";
import decodeToken from "../../utils/decodeToken";

function Settings() {
  const [alerta, setAlerta] = useState(false);
  const [config, setConfig] = useState([]);

  //Contante para los datos(id) del usuario/token
  const [user, setUser] = useState(null);
  //VALIDACIONES
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [datos, setDatos] = useState({
    titulo: "",
    image: "",
  });
  /**
   * Recoge los datos del evento onChange del formulario
   * @param {*} e
   */
  const handleInputChange = (e) => {
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
      url = `http://localhost:3001/configuracion/${config[0].id}/${user}`;
      metodo = "PUT";
    } else {
      url = `http://localhost:3001/configuracion/${user}`;
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    //Decodificar el token para utilizar el nombre de usuario
    const decode = decodeToken(token);
    setUser(decode.user.id);
    getConfiguration("http://localhost:3001/configuracion", setConfig);
  }, [setConfig]);

  return (
    <Container className="m-5">
      {alerta && AlertData("Configuración añadida!", "success")}

      <Form
        id="form-config"
        method="POST"
        onSubmit={handleSubmit(handleSubmitConfig)}
      >
        <h1>Configuración</h1>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                placeholder="Título..."
                defaultValue={config.length !== 0 && config[0].titulo ? config[0].titulo : ""}
                onChange={handleInputChange}
                {...register("titulo", {
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
                {errors.titulo && errors.titulo.message}
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
