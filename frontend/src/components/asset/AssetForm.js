import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import AlertData from "../AlertData";
import resolucion from "../../data/resolucion.json";
import tamano from "../../data/tamano.json";
import ram from "../../data/ram.json";
import status from "../../data/status.json";
import location from "../../data/location.json";
import etiquetas from "../../data/etiquetas.json";
import assets from "../../data/assets.json";

function AssetForm() {
  /**Constante estado para los datos del activo a modificar.
   Recupero con el hook useLocation el activo enviado con useNavigate 
   */
  const { state } = useLocation();
  const [alerta, setAlerta] = useState(false);

  //VALIDACIONES
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [activos, setActivos] = useState({
    tipo: state != null ? state.assetData.tipo : "",
    nombre: state != null ? state.assetData.nombre : "",
    n_serie: state != null ? state.assetData.n_serie : "",
    estado: state != null ? state.assetData.estado : "",
    localizacion: state != null ? state.assetData.localizacion : "",
    image: "",
    resolucion: state != null ? state.assetData.resolucion : "",
    tamano: state != null ? state.assetData.tamano : "",
    nucleos: state != null ? state.assetData.nucleos : "",
    ram: state != null ? state.assetData.ram : "",
    etiquetas: [],
  });

  /**
   * Funcion para los cambios en el formulario
   * @param {evento} e
   */
  const handleInputChange = (e) => {
    const { value, checked } = e.target;
    const { etiquetas } = activos;

    //Si están chequeados
    if (checked) {
      setActivos({
        ...activos,
        [e.target.name]: e.target.value,
        etiquetas: [...etiquetas, value],
      });
    }
    // Si no están chequeados
    else {
      setActivos({
        ...activos,
        [e.target.name]: e.target.value,
        etiquetas: activos.etiquetas.filter((e) => e !== value),
      });
    }
  };

  /**
   * Función para manejar el envio del formulario
   * @param {*} e
   * @param {*} activos
   * @returns
   */
  function handleSubmitAsset(activos, e) {
    //Previene al navegador recargar la página
    e.preventDefault();

    // LEER DATOS DEL FORMULARIO

    const form = e.target;
    const formData = new FormData(form);
    formData.append("activos", Object.entries(formData.entries()));

    //Variables para modificar los parámetros del fetch según sea crear/modificar activos
    let url = "";
    let metodo = "";

    if (state != null) {
      url = `http://localhost:3001/activo/${state.assetData.id}`;
      metodo = "PUT";
    } else {
      url = `http://localhost:3001/activo`;
      metodo = "POST";
    }

    // Se pasa formData en el cuerpo directamente:

    fetch(url, { method: metodo, body: formData })
      .then((res) => {
        if (res.ok) {
          setAlerta(true);
          return res.json();
        } else if (res.status === 404) {
          return Promise.reject("error 404");
        } else {
          return Promise.reject("Otro error: " + res.status);
        }
      })
      .catch((error) => console.log(error));

    // Limpiar campos
    e.target.reset();
  }

  return (
    <Container className="m-5">
      {alerta &&
        AlertData(
          `Activo ${state == null ? "añadido" : "modificado"} correctamente!`,
          "success"
        )}
      <Form
        className="m-5"
        id="form-asset"
        method="POST"
        onSubmit={handleSubmit(handleSubmitAsset)}
      >
        <h3>{state == null ? "Crear" : "Modificar"} Activo:</h3>
        <Row className="mb-3">
          <Form.Group as={Col} xs={3} controlId="formGridTipo">
            <Form.Label variant="primary">Activo</Form.Label>
            <Form.Select
              id="tipo"
              size="sm"
              name="tipo"
              defaultValue={activos.tipo}
              onChange={handleInputChange}
            >
              {assets.map((asset) => (
                <option key={asset.id}>{asset.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAssetName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre..."
              defaultValue={activos.nombre}
              onChange={handleInputChange}
              {...register("nombre", {
                required: {
                  value: true,
                  message: "Ingrese un nombre",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.nombre && errors.nombre.message}
            </span>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSerialNumber">
            <Form.Label>Nº de Serie</Form.Label>
            <Form.Control
              type="text"
              name="n_serie"
              placeholder="Número de serie..."
              defaultValue={activos.n_serie}
              onChange={handleInputChange}
              {...register("n_serie", {
                required: {
                  value: true,
                  message: "Ingrese el número de serie",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.n_serie && errors.n_serie.message}
            </span>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              id="estado"
              name="estado"
              aria-label="select estado"
              defaultValue={activos.estado}
              onChange={handleInputChange}
            >
              {status.map((status, index) => (
                <option key={index} value={status.name}>
                  {status.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLocation">
            <Form.Label>Localización</Form.Label>
            <Form.Select
              id="localizacion"
              name="localizacion"
              aria-label="select localizacion"
              defaultValue={activos.localizacion}
              onChange={handleInputChange}
            >
              {location.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formFileSm" as={Col} sm={5} className="mb-3">
            <Form.Label>Seleccione un archivo</Form.Label>
            <Form.Control
              type="file"
              name="image"
              size="sm"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Form.Group>
          {state == null ? (
            <Form.Group as={Col} sm={2} controlId="formGridEtiquetas">
              <Form.Label>Etiquetas:</Form.Label>
              {etiquetas.map((etiqueta) => (
                <Form.Check
                  id={`${etiqueta.id}-${etiqueta.name}`}
                  key={etiqueta.name}
                  type="checkbox"
                  label={etiqueta.name}
                  name="etiquetas"
                  defaultValue={etiqueta.name}
                  onChange={handleInputChange}
                />
              ))}
            </Form.Group>
          ) : (
            ""
          )}
        </Row>
        {activos.tipo === "Monitor" && (
          <Row className="mb-3">
            <Form.Group as={Col} sm={4} controlId="formGridResolucion">
              <Form.Label>Resolución</Form.Label>
              <Form.Select
                name="resolucion"
                defaultValue={activos.resolucion}
                onChange={handleInputChange}
              >
                {resolucion.map((resolucion, index) => (
                  <option key={index}>{resolucion.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} sm={4} controlId="formGridtamano">
              <Form.Label>Tamaño(pulgadas)</Form.Label>
              <Form.Select
                name="tamano"
                defaultValue={activos.tamano}
                onChange={handleInputChange}
              >
                {tamano.map((tamano, index) => (
                  <option key={index}>{tamano.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        )}
        {activos.tipo === "Pc" && (
          <Row className="mb-3">
            <Form.Group as={Col} sm={2} controlId="formGridNucleos">
              <Form.Label>Núcleos</Form.Label>
              <Form.Control
                type="number"
                name="nucleos"
                defaultValue={activos.nucleos}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} controlId="formGridRam">
              <Form.Label>Ram(GB)</Form.Label>
              <Form.Select
                name="ram"
                defaultValue={activos.ram}
                onChange={handleInputChange}
              >
                {ram.map((ram, index) => (
                  <option key={index}>{ram.ram}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        )}
        <Button variant="secondary" type="reset" onClick={() => reset()}>
          Reset
        </Button>{" "}
        <Button variant="primary" type="submit">
          {state == null ? "Crear" : "Modificar"}
        </Button>
      </Form>
    </Container>
  );
}

export default AssetForm;
