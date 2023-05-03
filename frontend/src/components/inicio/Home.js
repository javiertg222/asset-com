import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import CardHome from "./CardHome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/app.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Home() {
  const [loanding, setLoanding] = useState(true);
  const [estadisticas, setEstadisticas] = useState([]);
  useEffect(() => {
      fetch("http://localhost:3001/api/estadisticas")
        .then((res) => res.json())
        .then((data) => {
          setEstadisticas(data);
          setLoanding(false);
        })
        .catch((error) => console.log(error));
  }, []);

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
          estadisticas[1].cant,
          estadisticas[0].cant,
          estadisticas[2].cant,
        ],
        backgroundColor: ["#DC4C64", "#14A44D", "#E4A11B"],
        hoverOffset: 4,
      },
    ],
  };

  const datos = [
    {
      title: "Usuarios",
      color: "info",
      counter: estadisticas[3].cant,
    },
    {
      title: "Activos",
      color: "success",
      counter: estadisticas[0].total,
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
          {datos.map((dato, index) => (
            <Col key={index}>
              <Link
                className="link"
                to={dato.title === "Usuarios" ? "/admin/users" : "assets"}
              >
                <CardHome
                  data={{
                    title: dato.title,
                    color: dato.color,
                    counter: dato.counter,
                  }}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
}

export default Home;
