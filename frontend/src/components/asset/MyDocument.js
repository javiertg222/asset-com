import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    border: 1,
    margin: 10,
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
  },
  head: {
    textAlign: "center",
    fontSize: 30,
  },
  list: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    padding: 5,
    margin: 5,
  },
});
function MyDocument(props) {
  const assets = props.data.data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.head}>Activos</Text>
          <View style={styles.list}>
            {assets.map((asset, index) => (
              <Text style={styles.list} key={index}>{`${asset.id_asset} ${asset.name_asset} ${asset.serial_number} ${asset.status} ${asset.location} ${asset.fecha} `}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;
