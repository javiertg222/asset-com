import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "../AlertData";
import { getUser } from "../../utils/users";

function Perfil() {
  const [alerta, setAlerta] = useState(null);
  const [show, setShow] = useState(true);

  //VALIDACIONES FORMULARIO
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    apodo: "",
    image: "",
  });

  /**
   * Recoge los datos del evento onChange del formulario
   * @param {evento} e
   */
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Método para enviar el formulario
   * @param {evento} e
   * @param {usuario} user
   */
  function handleSubmitUser(user, e) {
    //Previene al navegador recargar la página
    e.preventDefault();

    // LEER DATOS DEL FORMULARIO CUANDO HAY FILES
    const form = e.target;
    const formData = new FormData(form);
    formData.append("user", Object.entries(formData.entries()));

    const url = `http://localhost:3001/perfil/${user.id}`;
    const metodo = "PUT";

    fetch(url, { method: metodo, body: formData })
      .then((res) => {
        if (res.ok) {
          console.log("Todo bien");
        } else {
          console.log("Respuesta de red OK pero respuesta de HTTP no OK");
        }
        return res.json();
      })
      .then((data) => {
        setAlerta(data);
      })
      .catch((error) =>
        console.log("Hubo un problema con la petición Fetch:" + error.message)
      );

    // Limpiar campos
    e.target.reset();
  }
  useEffect(() => {
    getUser("http://localhost:3001/usuario", setUser);
  }, []);
  console.log(user);

  return (
    <>
      <Container className="m-5">
        {alerta?.message &&
          show &&
          AlertData(alerta?.message, "success", setShow)}
        {alerta?.error && show && AlertData(alerta?.error, "danger", setShow)}

        <Form
          className="m-5"
          id="form-user"
          method="POST"
          onSubmit={handleSubmit(handleSubmitUser)}
        >
          <h3>Perfil:</h3>
          <Row className="mb-6">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Enter name"
                defaultValue={user.nombre}
                onChange={handleInputChange}
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "Ingrese el nombre",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.nombre && errors.nombre.message}
              </span>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Enter apellido"
                defaultValue={user.apellido}
                onChange={handleInputChange}
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "Ingrese el apellido",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.apellido && errors.apellido.message}
              </span>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridNickName">
              <Form.Label>Apodo</Form.Label>
              <Form.Control
                type="text"
                name="apodo"
                placeholder="Nick Name"
                defaultValue={user.apodo}
                onChange={handleInputChange}
                {...register("apodo", {
                  required: {
                    value: true,
                    message: "Ingrese el apodo",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.apodo && errors.apodo.message}
              </span>
            </Form.Group>
          </Row>
          <Form.Group controlId="formFileSm" as={Col} sm={5} className="mb-3">
            <Form.Label>Foto</Form.Label>
            <Form.Control
              type="file"
              name="image"
              size="sm"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="secondary" type="reset" onClick={() => reset()}>
            Reset
          </Button>{" "}
          <Button variant="primary" type="submit">
            Modificar
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Perfil;
