import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import Alert from "react-bootstrap/Alert";

const Pdf = (assets) => (
  <PDFDownloadLink
    document={<MyDocument data={assets} />}
    fileName={new Date() + ".pdf"}
    style={{
      marginLeft: 50,
      textAlign: "right",
    }}
  >
    {(blob, url, loading, error) =>
      error ? (
        <Alert key="danger" variant="danger">
          "Algo ha salido mal..."
        </Alert>
      ) : loading ? (
        <Alert key="success" variant="success">
          "Loading document..."
        </Alert>
      ) : (
        <Alert key="success" variant="success">
          "Download PDF!"
        </Alert>
      )
    }
  </PDFDownloadLink>
);

export default Pdf;
