import React, { useEffect, useState } from "react";
import { Container, Card, Button, Table, Badge, Modal, Form } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const Politician = () => {
  const [politicians, setPoliticians] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    abbreviation: "",
    status: "active",
    logo: null,
  });
  const [filePreview, setFilePreview] = useState(null);

  const BASE_URL = "https://clonecraftbackend-gydw.vercel.app/api"; // change to live

  const fetchPoliticians = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/politicians`);
      setPoliticians(data.politicians || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPoliticians(); }, []);

  const handleShow = (pl = null) => {
    if (pl) {
      setEditId(pl._id);
      setForm({ title: pl.title, abbreviation: pl.abbreviation, status: pl.status, logo: null });
      setFilePreview(pl.logo || null);
    } else {
      setEditId(null);
      setForm({ title: "", abbreviation: "", status: "active", logo: null });
      setFilePreview(null);
    }
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      const file = e.target.files[0];
      setForm({ ...form, logo: file });
      setFilePreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.abbreviation) return alert("Title & Abbreviation required!");

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("abbreviation", form.abbreviation);
      fd.append("status", form.status);
      if (form.logo) fd.append("logo", form.logo);

      const url = editId ? `${BASE_URL}/politicians/${editId}` : `${BASE_URL}/politicians`;
      const method = editId ? "put" : "post";

      await axios[method](url, fd, { headers: { "Content-Type": "multipart/form-data" } });
      fetchPoliticians();
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving politician");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this politician?")) return;
    try {
      await axios.delete(`${BASE_URL}/politicians/${id}`);
      fetchPoliticians();
    } catch (err) { console.error(err); alert("Failed to delete"); }
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Politicians Management</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-2" /> Add Politician
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Abbreviation</th>
                <th>Logo</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {politicians.map(p => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.abbreviation}</td>
                  <td>{p.logo && <img src={p.logo} alt="logo" style={{ height:50 }} />}</td>
                  <td><Badge bg={p.status==="active"?"success":"secondary"}>{p.status}</Badge></td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={()=>handleShow(p)}><FaEdit/></Button>
                    <Button variant="outline-danger" size="sm" onClick={()=>handleDelete(p._id)}><FaTrash/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Politician" : "Add Politician"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control name="abbreviation" value={form.abbreviation} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="file" name="logo" onChange={handleChange} />
              {filePreview && <img src={filePreview} alt="logo-preview" style={{ maxWidth:"100%", maxHeight:"150px", marginTop:"10px" }}/>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Politician;
