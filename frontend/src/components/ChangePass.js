import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useState } from "react";

function ChangePass() {
  //VALIDACIONES
  const {
    register,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [datos, setDatos] = useState();

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

  function handleSubmitPassword(datos, e) {
    //Previene al navegador recargar la página
    e.preventDefault();

    // LEER DATOS DEL FORMULARIO

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
  }
  return (
    <>
      <Container className="m-5">
        <h3>Cambiar la contraseña:</h3>
        <Row>
          <Col sm={6}>
            <Form method="POST" onSubmit={handleSubmit(handleSubmitPassword)}>
              <Form.Group className="mb-3" controlId="formBasicPasswordOld">
                <Form.Label>Contraseña actual</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Ingrese la contraseña actual",
                    },
                    validate: {},
                  })}
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.password && errors.password.message}
                </span>{" "}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordNew">
                <Form.Label>Contraseña nueva</Form.Label>
                <Form.Control
                  type="newPassword"
                  placeholder=" New Password"
                  onChange={handleInputChange}
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "Ingrese la nueva contraseña",
                    },
                    maxLength: {
                      value: 30,
                      message: "No puede contener más de 30 caracteres",
                    },
                    minLength: {
                      value: 8,
                      message: "Mínimo 8 carácteres",
                    },

                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&])[A-Za-z\d@!%*?&][^'\s]/g,
                      message: "Debe contener mayús. min. dígitos y @!%*?&",
                    },
                  })}
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.newPassword && errors.newPassword.message}
                </span>{" "}
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPasswordNewRepeat"
              >
                <Form.Label>Repita la contraseña nueva</Form.Label>
                <Form.Control
                  type="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleInputChange}
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Repita la nueva contraseña",
                    },
                    validate: (match) => {
                      const newPassword = getValues("newPassword");
                      return (
                        match === newPassword || "Las contraseñas no coinciden!"
                      );
                    },
                  })}
                />
                 <span className="text-danger text-small d-block mb-2">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </span>{" "}
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col sm={6}>sm=6</Col>
        </Row>
      </Container>
    </>
  );
}

export default ChangePass;
