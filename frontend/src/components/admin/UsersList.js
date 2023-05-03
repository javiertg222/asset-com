import { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AlertData from "../AlertData";
import CardUser from "./CardUser";
import Searcher from "../Searcher";
import { FaSearch } from "react-icons/fa";

function UsersList() {
  //Constante estado para enviar los datos de un usuario al formulario para modificar
  const navigate = useNavigate();
  //Constante estado para todos los usuarios
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  //Constante estado para mostrar una tarjeta con los datos de un usuario
  const [pulsado, setPulsado] = useState(false);
  /**
   * Buscar y filtrar usuarios
   */
  const [search, setSearch] = useState("");
  const searcherToUserList = (datosSearch) => {
    setSearch(datosSearch);
  };
  let result = !search
    ? users
    : users.filter(
        (user) =>
          user.name_user
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(search.toLowerCase()) ||
          user.nickname_user
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(search.toLowerCase())
      );

  /**
   * Obtener los usuarios de la api para mostrarlos en la tabla
   */

  function listUsers() {
    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }
  /**
   * Borrar usuarios
   * @param {*} id
   */
  function deleteUser(id) {
    fetch(`http://localhost:3001/api/user/delete/${id}`, { method: "DELETE" })
      .then((res) => {
        console.log(res.json());
        listUsers();
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <>
      <Container className="m-6" fluid>
        <Row className="justify-content-md-center mt-3">
          <Col md="auto" lg="3">
            <Searcher searcherToParent={searcherToUserList} />
          </Col>
          <Col md="auto">
            <FaSearch size={"1.4em"} />
          </Col>
        </Row>
        <Button
          className="m-3"
          as={Link}
          to="/admin/users/form"
          variant="primary"
        >
          Nuevo Usuario
        </Button>
        <Table hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apodo</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha Creación/Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!users ? (
              <tr>
                <td>{AlertData("No hay usuarios para mostrar.", "warning")}</td>
              </tr>
            ) : (
              result.map((user, index) => (
                <>
                  <tr key={user.id_user}>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.id_user}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.name_user}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.nickname_user}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.email_user}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.name_rol}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.fecha}
                    </td>
                    <td>
                      <Button
                        variant="outline-success"
                        /**
                        Con el Hook usenavigate podemos pasar a una ruta un segundo parámetro como objeto.
                        En este caso paso los datos de un usuario según la fila de usuario.
                        */
                        onClick={() =>
                          navigate("/admin/users/form", {
                            state: { userData: user },
                          })
                        }
                      >
                        Modificar
                      </Button>{" "}
                      <Button
                        onClick={() => deleteUser(user.id_user)}
                        variant="outline-danger"
                      >
                        Borrar
                      </Button>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </Table>
      </Container>
      {pulsado ? (
        <CardUser user={user} show={pulsado} onHide={() => setPulsado(false)} />
      ) : (
        ""
      )}
    </>
  );
}

export default UsersList;
