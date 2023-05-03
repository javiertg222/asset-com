import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
function Searcher({searcherToParent}) {
  const [search, setSearch] = useState("");
  const searcher = (e) => {e.preventDefault(); setSearch(e.target.value)};
  useEffect(() => {
    searcherToParent(search)
  },);
  
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        aria-label="Search"
        className="me-2"
        value={search}
        onChange={searcher}
      />
    </Form>
  );
}

export default Searcher;
