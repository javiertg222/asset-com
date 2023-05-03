import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  ButtonToolbar,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AlertData from "../AlertData";
import { FaBarcode, FaFilePdf, FaSearch } from "react-icons/fa";
import Pdf from "./Pdf";
import Searcher from "../Searcher";

function AssetsList() {

  /**
   * Cambia de color el status de la tabla según sea "Alta, "Pendiente" o "Baja"
   * @param {*} asset
   * @returns
   */
  const estilo = (asset) => {
    if (asset.status === "Alta") {
      return "#14A44D";
    }
    if (asset.status === "Pendiente") {
      return "#E4A11B";
    }
    if (asset.status === "Baja") {
      return "#DC4C64";
    }
  };
  //Constante estado para enviar los datos de un activo al formulario para modificar
  const navigate = useNavigate();
  //Constante estado para todos los activos
  const [assets, setAssets] = useState([]);
  const [pulsado, setPulsado] = useState(false);
  //Constante para el buscador
  const [search, setSearch] = useState("");
  const searcherToAssets = (datosSearch) => {
    setSearch(datosSearch);
  };
  const result = !search
    ? assets
    : assets.filter(
        (asset) =>
          asset.name_asset
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(search.toLowerCase()) ||
          asset.serial_number.toLowerCase().includes(search.toLowerCase())
      );

  /**
   * Obtener los activos de la api para mostrarlos en la tabla
   */
  function listAssets() {
    fetch("http://localhost:3001/api/assets")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((error) => console.log(error));
  }
  /**
   * Borrar usuarios
   * @param {*} id
   */
  function deleteAsset(id) {
    fetch(`http://localhost:3001/api/asset/delete/${id}`, { method: "DELETE" })
      .then((res) => {
        res.json();
        listAssets();
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    listAssets();
  }, []);

  return (
    <>
      <Container className="m-6" fluid>
        <Row className="justify-content-md-center mt-3">
          <Col md="auto" lg="3">
            <Searcher searcherToParent={searcherToAssets} />
          </Col>
          <Col md="auto">
            <FaSearch size={"1.4em"} />
          </Col>
        </Row>
        {pulsado ? <Pdf data={assets} /> : null}
        <ButtonToolbar
          className="justify-content-between"
          aria-label="Toolbar with Button groups"
        >
          <Button className="m-3" as={Link} to="/assets/form" variant="primary">
            Nuevo Activo
          </Button>
          <Button
            className="justify-content-between m-3"
            onClick={() => setPulsado(true)}
            variant="danger"
            title="Exportar PDF"
          >
            <FaFilePdf size={"1.5em"} />
          </Button>
        </ButtonToolbar>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Nº Serie</th>
              <th>Estado</th>
              <th>Localización</th>
              <th>Fecha Creación/Modificación</th>
              <th>Código de Barras</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!assets ? (
              <tr>
                <td>{AlertData("No hay activos para mostrar.", "warning")}</td>
              </tr>
            ) : (
              result.map((asset, index) => (
                <>
                  <tr key={index}>
                    <td>{asset.id_asset}</td>
                    <td>
                      <Image src={asset.image} style={{height:45 , width:45,}}  thumbnail/>
                    </td>
                    <td>{asset.name_asset}</td>
                    <td>{asset.serial_number}</td>
                    <td style={{ color: estilo(asset) }}>{asset.status}</td>
                    <td>{asset.location}</td>
                    <td>{asset.fecha}</td>
                    <td>
                      <Button
                        variant="light"
                        onClick={() =>
                          navigate("/barcode", {
                            state: { assetData: asset.serial_number },
                          })
                        }
                      >
                        <FaBarcode size={"2.8em"} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-success"
                        onClick={() =>
                          navigate("/assets/form", {
                            state: { assetData: asset },
                          })
                        }
                      >
                        Modificar
                      </Button>{" "}
                      <Button
                        onClick={() => deleteAsset(asset.id_asset)}
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
    </>
  );
}

export default AssetsList;
