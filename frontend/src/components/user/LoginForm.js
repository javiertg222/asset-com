import { Button, Form, Stack, Card } from "react-bootstrap";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/authContext";

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  //Valores del formulario
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  //Mensajes repuesta validación servidor
  const [mensaje, setMensaje] = useState(null);
  //Función login del contexto
  const { login } = useAuthContext();
  /**
   * Recoge los datos del evento onChange del formulario
   * @param {*} e
   */
  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  /**
   * Función para enviar el formulario
   * @param {*} credentials
   * @param {*} e
   */
  function handleSubmitCredentials(credentials, e) {
    //Previene al navegador recargar la página
    e.preventDefault();
    //LEER DATOS DEL FORMULARIO
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    fetch("http://localhost:3001/login", {
      method: form.method,
      body: JSON.stringify(formJson),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMensaje(data.mensaje);
        //Si el servidor envía un token(ok) entonces la autenticación es correcta
        if (data.ok) {
          //Guardamos el token en el navegador
          login(data.token)
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Stack gap={2} className="col-md-3 mx-auto m-3">
      <Card className="text-center">
        <Card.Header role="heading" aria-level="1">
          INICIO DE SESIÓN
        </Card.Header>
        <Card.Body>
          <Form method="POST" onSubmit={handleSubmit(handleSubmitCredentials)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleInputChange}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Ingrese el email",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ingrese un email válido!",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.email && errors.email.message}
              </span>
              <Form.Text className="text-muted">
                No compartas este email con nadie.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Ingrese el password",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.password && errors.password.message}
              </span>
            </Form.Group>
            <span className="text-danger text-small d-block mb-2">
              {mensaje}
            </span>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Recordarme" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Stack>
  );
}

export default LoginForm;
