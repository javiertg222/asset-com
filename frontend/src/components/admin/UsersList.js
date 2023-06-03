import { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AlertData from "../AlertData";
import CardUser from "./CardUser";
import Searcher from "../Searcher";
import { FaSearch } from "react-icons/fa";
import { getUsers, deleteUser } from "../../utils/users";

function UsersList() {
  //Constante estado para enviar los datos de un usuario al formulario para modificar
  const navigate = useNavigate();
  //Constante estado para todos los usuarios
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  //Constante estado para mostrar una tarjeta con los datos de un usuario
  const [pulsado, setPulsado] = useState(false);
  const [show, setShow] = useState(true);
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
          user.nombre
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(search.toLowerCase()) ||
          user.apodo
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(search.toLowerCase())
      );

  useEffect(() => {
    getUsers("http://localhost:3001/usuarios", setUsers);
  }, [users]);
  return (
    <>
      <Container className="m-6">
        <Row className="justify-content-md-center mt-3">
          <Col md="auto" lg="3">
            <Searcher searcherToParent={searcherToUserList} />
          </Col>
          <Col md="auto">
            <FaSearch size={"1.4em"} />
          </Col>
        </Row>
        {users?.error && show && AlertData(users?.error, "danger", setShow)}
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
            {!users.length ? (
              <tr>
                <td>
                  {AlertData(
                    "No hay usuarios para mostrar.",
                    "warning",
                    setShow
                  )}
                </td>
              </tr>
            ) : (
              result.map((user) => (
                <>
                  <tr>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.id}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.nombre}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.apodo}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.email}
                    </td>
                    <td
                      onClick={() => {
                        setUser(user);
                        setPulsado(true);
                      }}
                    >
                      {user.rol}
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
                        size="sm"
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
                        size="sm"
                        onClick={() => deleteUser(user.id)}
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
