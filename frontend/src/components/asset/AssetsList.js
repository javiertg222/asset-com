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
import { getAssets, deleteAsset } from "../../utils/assets";

function AssetsList() {
  /**
   * Cambia de color el status de la tabla según sea "Alta, "Pendiente" o "Baja"
   * @param {*} asset
   * @returns
   */
  const estilo = (asset) => {
    if (asset.estado === "Alta") {
      return "#198754";
    }
    if (asset.estado === "Mantenimiento") {
      return "#e4a11b ";
    }
    if (asset.estado === "Baja") {
      return "#dc3545";
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

  let result = !search
    ? assets
    : assets.filter(
        (asset) =>
          asset.nombre
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(search.toLowerCase()) ||
          asset.n_serie.toLowerCase().includes(search.toLowerCase())
      );

  useEffect(() => {
    getAssets("http://localhost:3001/activos", setAssets);
  }, [assets]);

  return (
    <>
      <Container className="m-6">
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
        <Table hover responsive size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Nº Serie</th>
              <th>Estado</th>
              <th>Localización</th>
              <th>Resolución</th>
              <th>Tamaño(")</th>
              <th>Núcleos</th>
              <th>Ram(GB)</th>
              <th>Tipo</th>
              <th>Fecha Creación/Modificación</th>
              <th>Código de Barras</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!result ? (
              <tr>
                <td>{AlertData("No hay activos para mostrar.", "warning")}</td>
              </tr>
            ) : (
              result.map((asset) => (
                <>
                  <tr key={asset.id}>
                    <td>{asset.id}</td>
                    <td>
                      <Image
                        src={asset.image}
                        style={{ height: 45, width: 45 }}
                        thumbnail
                      />
                    </td>
                    <td>{asset.nombre}</td>
                    <td>{asset.n_serie}</td>
                    <td style={{ color: estilo(asset) }}>{asset.estado}</td>
                    <td>{asset.localizacion}</td>
                    <td>{asset.resolucion}</td>
                    <td>{asset.tamano}</td>
                    <td>{asset.nucleos}</td>
                    <td>{asset.ram}</td>
                    <td>{asset.tipo}</td>
                    <td>{asset.fecha}</td>
                    <td>
                      <Button
                        variant="light"
                        onClick={() =>
                          navigate("/barcode", {
                            state: { assetData: asset.n_serie },
                          })
                        }
                      >
                        <FaBarcode size={"2.8em"} />
                      </Button>
                    </td>
                    <td>
                      <Button className="mb-1" size="sm"
                        variant="outline-success"
                        onClick={() =>
                          navigate("/assets/form", {
                            state: { assetData: asset },
                          })
                        }
                      >
                        Modificar
                      </Button>
                      <Button size="sm"
                        onClick={() => deleteAsset(asset.id, asset.tipo)}
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
