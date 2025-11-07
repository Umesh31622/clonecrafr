// import React, { useEffect, useState } from "react";
// import { Container, Card, Button, Table, Badge, Modal, Form } from "react-bootstrap";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";

// const Politician = () => {
//   const [politicians, setPoliticians] = useState([]);
//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [form, setForm] = useState({
//     title: "",
//     abbreviation: "",
//     status: "active", 
//     logo: null,
//   });
//   const [filePreview, setFilePreview] = useState(null);

//   const BASE_URL = "https://clonecraftbackend-gydw.vercel.app/api"; // change to live

//   const fetchPoliticians = async () => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/politicians`);
//       setPoliticians(data.politicians || []);
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => { fetchPoliticians(); }, []);

//   const handleShow = (pl = null) => {
//     if (pl) {
//       setEditId(pl._id);
//       setForm({ title: pl.title, abbreviation: pl.abbreviation, status: pl.status, logo: null });
//       setFilePreview(pl.logo || null);
//     } else {
//       setEditId(null);
//       setForm({ title: "", abbreviation: "", status: "active", logo: null });
//       setFilePreview(null);
//     }
//     setShow(true);
//   };
//   const handleClose = () => setShow(false);

//   const handleChange = (e) => {
//     if (e.target.name === "logo") {
//       const file = e.target.files[0];
//       setForm({ ...form, logo: file });
//       setFilePreview(URL.createObjectURL(file));
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.title || !form.abbreviation) return alert("Title & Abbreviation required!");

//     try {
//       const fd = new FormData();
//       fd.append("title", form.title);
//       fd.append("abbreviation", form.abbreviation);
//       fd.append("status", form.status);
//       if (form.logo) fd.append("logo", form.logo);

//       const url = editId ? `${BASE_URL}/politicians/${editId}` : `${BASE_URL}/politicians`;
//       const method = editId ? "put" : "post";

//       await axios[method](url, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       fetchPoliticians();
//       handleClose();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error saving politician");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this politician?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/politicians/${id}`);
//       fetchPoliticians();
//     } catch (err) { console.error(err); alert("Failed to delete"); }
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Politicians Management</h2>
//         <Button variant="primary" onClick={() => handleShow()}>
//           <FaPlus className="me-2" /> Add Politician
//         </Button>
//       </div>

//       <Card>
//         <Card.Body>
//           <Table responsive hover>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Abbreviation</th>
//                 <th>Logo</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {politicians.map(p => (
//                 <tr key={p._id}>
//                   <td>{p.title}</td>
//                   <td>{p.abbreviation}</td>
//                   <td>{p.logo && <img src={p.logo} alt="logo" style={{ height:50 }} />}</td>
//                   <td><Badge bg={p.status==="active"?"success":"secondary"}>{p.status}</Badge></td>
//                   <td>
//                     <Button variant="outline-primary" size="sm" className="me-2" onClick={()=>handleShow(p)}><FaEdit/></Button>
//                     <Button variant="outline-danger" size="sm" onClick={()=>handleDelete(p._id)}><FaTrash/></Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       <Modal show={show} onHide={handleClose} size="md">
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit Politician" : "Add Politician"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control name="title" value={form.title} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Abbreviation</Form.Label>
//               <Form.Control name="abbreviation" value={form.abbreviation} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Logo</Form.Label>
//               <Form.Control type="file" name="logo" onChange={handleChange} />
//               {filePreview && <img src={filePreview} alt="logo-preview" style={{ maxWidth:"100%", maxHeight:"150px", marginTop:"10px" }}/>}
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Status</Form.Label>
//               <Form.Select name="status" value={form.status} onChange={handleChange}>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//           <Button variant="primary" onClick={handleSubmit}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };


// export default Politician;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Image } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const API_URL = "https://clonecraftbackend-gydw.vercel.app/api/politicians";
const RELIGIOUS_API = "https://clonecraftbackend-gydw.vercel.app/api/religious";
const LANGUAGE_API = "https://clonecraftbackend-gydw.vercel.app/api/languages";

const PoliticianManager = () => {
  const [politicians, setPoliticians] = useState([]);
  const [religiousList, setReligiousList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    abbreviation: "",
    status: "active",
    religious: "",
    language: "",
    file: null,
    preview: "",
  });

  // Fetch data
  const fetchData = async () => {
    const [polRes, relRes, langRes] = await Promise.all([
      axios.get(API_URL),
      axios.get(RELIGIOUS_API),
      axios.get(LANGUAGE_API),
    ]);
    setPoliticians(polRes.data.politicians || []);
    setReligiousList(relRes.data.religiousList || relRes.data);
    setLanguageList(langRes.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      const file = files[0];
      setFormData({ ...formData, file, preview: URL.createObjectURL(file) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v && k !== "preview") data.append(k, v);
    });

    if (editing) await axios.put(`${API_URL}/${editing._id}`, data);
    else await axios.post(API_URL, data);

    handleClose();
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this politician?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setFormData({
      title: item.title,
      abbreviation: item.abbreviation,
      status: item.status,
      religious: item.religious?._id || "",
      language: item.language?._id || "",
      file: null,
      preview: item.logo || "",
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      title: "",
      abbreviation: "",
      status: "active",
      religious: "",
      language: "",
      file: null,
      preview: "",
    });
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Politician List</h4>
        <Button onClick={() => setShowModal(true)}>
          <FaPlus /> Add Politician
        </Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Title</th>
            <th>Abbreviation</th>
            <th>Status</th>
            <th>Religion</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {politicians.length ? (
            politicians.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>
                  {p.logo ? (
                    <Image src={p.logo} rounded width="60" height="60" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{p.title}</td>
                <td>{p.abbreviation}</td>
                <td>{p.status}</td>
                <td>{p.religious?.title || "—"}</td>
                <td>{p.language?.name || "—"}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(p)}>
                    <FaEdit />
                  </Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(p._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit Politician" : "Add Politician"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Abbreviation</Form.Label>
              <Form.Control
                type="text"
                name="abbreviation"
                value={formData.abbreviation}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Religious</Form.Label>
              <Form.Select
                name="religious"
                value={formData.religious}
                onChange={handleChange}
              >
                <option value="">Select Religious</option>
                {religiousList.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Language</Form.Label>
              <Form.Select
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">Select Language</option>
                {languageList.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Logo</Form.Label>
              <Form.Control type="file" name="file" onChange={handleChange} />
              {formData.preview && (
                <div className="text-center mt-2">
                  <Image src={formData.preview} width="100" height="100" rounded />
                </div>
              )}
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary">
              {editing ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PoliticianManager;


