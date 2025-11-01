import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Table, Button, Form, Modal } from "react-bootstrap";

const Religious = () => {
  const [religiousList, setReligiousList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    abbreviation: "",
    status: "active",
    logo: null, 
  });

  const API_URL = "https://clonecraftbackend-gydw.vercel.app/api/religious"; // 🔁 Replace with your API base URL

  // Fetch all
  const fetchReligious = async () => {
    try {
      const res = await axios.get(API_URL);
      setReligiousList(res.data.religiousList || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchReligious();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("abbreviation", formData.abbreviation);
      data.append("status", formData.status);
      if (formData.logo) data.append("logo", formData.logo);

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, data);
      } else {
        await axios.post(API_URL, data);
      }

      fetchReligious();
      handleClose();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchReligious();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      title: item.title,
      abbreviation: item.abbreviation,
      status: item.status,
      logo: null,
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({
      title: "",
      abbreviation: "",
      status: "active",
      logo: null,
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Religious Management</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Religious
        </Button>
      </div>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Title</th>
            <th>Abbreviation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {religiousList.length > 0 ? (
            religiousList.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt="logo"
                      style={{ width: 50, height: 50, borderRadius: "8px" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.abbreviation}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    className="me-2"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No entries found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Religious" : "Add Religious"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control
                type="text"
                name="abbreviation"
                value={formData.abbreviation}
                onChange={handleChange}
                placeholder="Enter abbreviation"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editId ? "Update" : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Religious;

