import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import AlertData from "../AlertData";

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
      error
        ? AlertData("Algo ha salido mal...", "danger")
        : loading
        ? AlertData("Loading document...", "success")
        : AlertData("Download PDF!", "success")
    }
  </PDFDownloadLink>
);

export default Pdf;
