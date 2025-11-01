// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Card, Form, Button, Alert, Table } from "react-bootstrap";

// const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:7000";

// const Reports = () => {
//   const [form, setForm] = useState({ email: "", description: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [reports, setReports] = useState([]);

//   // Fetch all reports
//   const fetchReports = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/reports`);
//       setReports(res.data.data || []);
//     } catch (err) {
//       console.error("Fetch reports error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.email || !form.description) {
//       setMessage("Please fill all fields");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`${BASE_URL}/api/reports`, form);
//       setMessage("Report added successfully!");
//       setForm({ email: "", description: "" });
//       fetchReports();
//     } catch (err) {
//       setMessage("Error adding report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container style={{ maxWidth: "800px", marginTop: "30px" }}>
//       <Card className="shadow-sm p-4">
//         <h3 className="mb-4">Add Report</h3>
//         {message && <Alert variant="info">{message}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={form.email}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               name="description"
//               placeholder="Enter description"
//               value={form.description}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </Form>
//       </Card>

//       <Card className="shadow-sm p-4 mt-4">
//         <h4>Saved Reports</h4>
//         <Table bordered hover responsive className="mt-3">
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Description</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.length > 0 ? (
//               reports.map((r) => (
//                 <tr key={r._id}>
//                   <td>{r.email}</td>
//                   <td>{r.description}</td>
//                   <td>{new Date(r.createdAt).toLocaleString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center">
//                   No reports found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </Card>
//     </Container>
//   );
// };

// export default Reports;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Table,
  Modal,
} from "react-bootstrap";

const BASE_URL = process.env.REACT_APP_API_URL || "https://clonecraftbackend-gydw.vercel.app";

const Reports = () => {
  const [form, setForm] = useState({ email: "", description: "" });
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ id: "", email: "", description: "" });

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/reports`);
      setReports(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/reports`, form);
      setMessage("Report added successfully!");
      setForm({ email: "", description: "" });
      fetchReports();
    } catch (err) {
      setMessage("Error adding report");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/reports/${id}`);
      setMessage("Report deleted successfully!");
      fetchReports();
    } catch (err) {
      setMessage("Error deleting report");
    }
  };

  const openEditModal = (report) => {
    setEditData({
      id: report._id,
      email: report.email,
      description: report.description,
    });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/api/reports/${editData.id}`, {
        email: editData.email,
        description: editData.description,
      });
      setMessage("Report updated successfully!");
      setEditModal(false);
      fetchReports();
    } catch (err) {
      setMessage("Error updating report");
    }
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "30px" }}>
      <Card className="shadow-sm p-4">
        <h3 className="mb-4">Add Report</h3>
        {message && <Alert variant="info">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Form>
      </Card>

      <Card className="shadow-sm p-4 mt-4">
        <h4>All Reports</h4>
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Email</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((r) => (
                <tr key={r._id}>
                  <td>{r.email}</td>
                  <td>{r.description}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => openEditModal(r)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(r._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={editData.description}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Reports;
