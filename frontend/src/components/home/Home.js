import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  CardGroup,
} from "react-bootstrap";
import CardHome from "./CardHome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/app.css";
import getEstadisticas from "../../utils/estadisticas";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Home() {
  const [loanding, setLoanding] = useState(true);
  const [estadisticas, setEstadisticas] = useState([]);
  useEffect(() => {
    getEstadisticas("http://localhost:3001/estadisticas", setEstadisticas);
    setLoanding(false);
  }, []);

  console.log(estadisticas);

  if (loanding) {
    return (
      <Alert key="info" variant="info">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Cargando...
      </Alert>
    );
  } else {
    //Datos para las gráficas
    const options = {};
    const dataDonuts = {
      labels: ["Baja", "Alta", "Mantenimiento"],
      datasets: [
        {
          label: ["Activos"],
          data: [
            estadisticas.baja,
            estadisticas.alta,
            estadisticas.mantenimiento,
          ],
          backgroundColor: ["#dc3545", "#198754", "#e4a11b"],
          hoverOffset: 4,
        },
      ],
    };

    const datos = [
      {
        title: "Usuarios",
        color: "#dc3545",
        counter: estadisticas.usuarios,
      },
      {
        title: "Activos",
        color: "#198754",
        counter: estadisticas.activos,
      },
      {
        title: "Localización",
        color: "#e4a11b",
        counter: estadisticas.empresa,
      },
    ];
    return (
      <>
        <Container className="m-5">
          <Row>
            <Col>
              <Card style={{ width: "20rem" }}>
                <Card.Body>
                  <Card.Title>Activos</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Activos registrados por estado
                  </Card.Subtitle>
                  <Card.Text>
                    <Doughnut data={dataDonuts} options={options} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="8">
              <CardGroup>
                {datos.map((dato) => (
                  <Card.Link
                    as={Link}
                    className="link"
                    to={dato.title === "Usuarios" ? "/admin/users" : "/assets"}
                  >
                    <CardHome
                      data={{
                        title: dato.title,
                        color: dato.color,
                        counter: dato.counter,
                      }}
                    />
                  </Card.Link>
                ))}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
