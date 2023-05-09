import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container aria-label="contentinfo" className="border-top" fluid="md" style={{fontSize: '0.7rem' }}>
      <Row className="mt-3">
        <Col sm={3}>Proyecto creado por Assetcom 2023</Col>
        <Col sm={8}>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img
              alt="Licencia de Creative Commons"
              src="https://i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </a>
          <span className="m-3">Esta obra está bajo una</span>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            licencia de Creative Commons Reconocimiento 4.0 Internacional
          </a>
        </Col>
        <Col sm={1}>
          <a
            className="text-muted"
            target="_blank"
            href="https://github.com/javiertg222/asset-com.git"
            rel="noreferrer"
            aria-label="enlace a github"
          >
            <i className="bi bi-github" style={{ fontSize: "1.8rem" }} />
          </a>
        </Col>
      </Row>
    </Container>
  );
}
