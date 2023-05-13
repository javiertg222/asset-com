import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "../AlertData";
import roles from "../../data/roles.json";

function UserForm() {
  /**Constante estado para los datos del usuario a modificar.
   Recupero con el hook useLocation el usuario enviado con useNavigate 
   */
  const { state } = useLocation();
  const [alerta, setAlerta] = useState(null);

  //VALIDACIONES FORMULARIO
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [user, setUser] = useState({
    nombre: state != null ? state.userData.nombre : "",
    apellido: state != null ? state.userData.apellido : "",
    apodo: state != null ? state.userData.apodo : "",
    email: state != null ? state.userData.email : "",
    password: "",
    rol: state != null ? state.userData.rol : "",
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
  function handleSubmitUser(user,e) {
    //Previene al navegador recargar la página
    e.preventDefault();

    // LEER DATOS DEL FORMULARIO CUANDO NOOOOOOO HAY FILES
    //   const form = e.target;
    //   const formData = new FormData(form);
    //   const formJson = Object.fromEntries(formData.entries());
    //const data ={
    //     method: metodo,
    //     body: JSON.stringify(formJson),
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },

    // LEER DATOS DEL FORMULARIO CUANDO HAY FILES
    const form = e.target;
    const formData = new FormData(form);
    formData.append("user", Object.entries(formData.entries()));

    let url = "";
    let metodo = "";

    if (state != null) {
      url = `http://localhost:3001/usuario/${state.userData.id}`;
      metodo = "PUT";
    } else {
      url = "http://localhost:3001/usuario";
      metodo = "POST";
    }

    fetch(url, { method: metodo, body: formData })
      .then((res) => {
        if (res.ok) {
          console.log("Todo bien");
          setAlerta(true);
        } else {
          console.log("Respuesta de red OK pero respuesta de HTTP no OK");
        }
      })
      .catch((error) => console.log(error));

    // Limpiar campos
    e.target.reset();
  }


  return (
    <>
      <Container className="m-5">
        {alerta &&
          AlertData(
            `Usuario ${
              state == null ? "añadido" : "modificado"
            } correctamente!`,
            "success"
          )}

        <Form className="m-5"
          id="form-user"
          method="POST"
          onSubmit={handleSubmit(handleSubmitUser)}
        >
          <h3>{state == null ? "Crear" : "Modificar"} Usuario:</h3>
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
                defaultValue={user.apellido }
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
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user.email}
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
                  // validate: (defaultValue) =>
                  //   defaultValue === user.email
                  //     ? null
                  //     : !findEmail(defaultValue) ||
                  //       "Ya existe un usuario con ese email",
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.email && errors.email.message}
              </span>
            </Form.Group>
            {state == null ? (
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  defaultValue={user.password}
                  onChange={handleInputChange}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Ingrese el password",
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
                  {errors.password && errors.password.message}
                </span>
              </Form.Group>
            ) : (
              ""
            )}
            <Form.Group as={Col} controlId="formGridRol">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="rol"
                defaultValue={user.rol}
                onChange={handleInputChange}
              >
                {roles.map((rol, index) => (
                  <option key={index}>{rol.name}</option>
                ))}
              </Form.Select>
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
            {state == null ? "Crear" : "Modificar"}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default UserForm;
