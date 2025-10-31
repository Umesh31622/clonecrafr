
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Card,
//   Button,
//   Table,
//   Badge,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";

// const profilePositions = [
//   "topLeft","topRight","bottomLeft","bottomRight","center",
//   "centerLeft","centerRight","topCenter","bottomCenter",
// ];

// const transitionTypes = [
//   "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//   "slideFromBottomLeft","slideFromBottomRight","slideFromTopLeft","slideFromTopRight",
//   "scale","rotation","bounce","ripple","profileReveal",
// ];

// const orientations = ["landscape","portrait"];

// const Templates = () => {
//   const [templates, setTemplates] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [politicians, setPoliticians] = useState([]);
//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     type: "video",
//     status: "active",
//     parentType: "Category",
//     parentId: "",
//     file: null,
//     profilePosition: "center",
//     transitionType: "fade",
//     orientation: "landscape",
//   });

//   const BASE_URL = "https://clonecraftbackend-gydw.vercel.app/api";

//   // Fetch templates
//   const fetchTemplates = async () => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/templates`);
//       setTemplates(data.templates || []);
//     } catch (err) {
//       console.error("Fetch templates error:", err);
//     }
//   };

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/categories`);
//       setCategories(data.categories || data);
//     } catch (err) {
//       console.error("Fetch categories error:", err);
//     }
//   };

//   // Fetch politicians
//   const fetchPoliticians = async () => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/politicians`);
//       setPoliticians(data.politicians || data);
//     } catch (err) {
//       console.error("Fetch politicians error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTemplates();
//     fetchCategories();
//     fetchPoliticians();
//   }, []);

//   const handleShow = (tpl = null) => {
//     if (tpl) {
//       setEditId(tpl._id);
//       setForm({
//         title: tpl.title,
//         type: tpl.type,
//         status: tpl.status,
//         parentType: tpl.category ? "Category" : "Politician",
//         parentId: tpl.category?._id || tpl.politician?._id || "",
//         file: null,
//         profilePosition: tpl.profilePosition || "center",
//         transitionType: tpl.transitionType || "fade",
//         orientation: tpl.orientation || "landscape",
//       });
//       setFilePreview(tpl.file || null);
//     } else {
//       setEditId(null);
//       setForm({
//         title: "",
//         type: "video",
//         status: "active",
//         parentType: "Category",
//         parentId: "",
//         file: null,
//         profilePosition: "center",
//         transitionType: "fade",
//         orientation: "landscape",
//       });
//       setFilePreview(null);
//     }
//     setShow(true);
//   };

//   const handleClose = () => setShow(false);

//   const handleChange = (e) => {
//     if (e.target.name === "file") {
//       const selectedFile = e.target.files[0];
//       if (!selectedFile) return;
//       setForm({ ...form, file: selectedFile });
//       setFilePreview(URL.createObjectURL(selectedFile));
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.title || !form.parentId) return alert("Title & Parent required!");

//     try {
//       const fd = new FormData();
//       fd.append("title", form.title);
//       fd.append("type", form.type);
//       fd.append("status", form.status);
//       fd.append("orientation", form.orientation);

//       if (form.parentType === "Category") fd.append("category", form.parentId);
//       else fd.append("politician", form.parentId);

//       if (form.type === "video") fd.append("transitionType", form.transitionType);
//       if (form.type === "graphics") fd.append("profilePosition", form.profilePosition);
//       if (form.file) fd.append("file", form.file);

//       const url = editId ? `${BASE_URL}/templates/${editId}` : `${BASE_URL}/templates`;
//       const method = editId ? "put" : "post";

//       await axios[method](url, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       fetchTemplates();
//       handleClose();
//     } catch (err) {
//       console.error("Submit error:", err);
//       alert(err.response?.data?.message || "Error saving template");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this template?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/templates/${id}`);
//       fetchTemplates();
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete template");
//     }
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Templates Management</h2>
//         <Button variant="primary" onClick={() => handleShow()}>
//           <FaPlus className="me-2" /> Add Template
//         </Button>
//       </div>

//       <Card>
//         <Card.Body>
//           <Table responsive hover>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Type</th>
//                 <th>Parent</th>
//                 <th>Orientation</th>
//                 <th>Profile Position</th>
//                 <th>Transition Type</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {templates.map((tpl) => (
//                 <tr key={tpl._id}>
//                   <td>{tpl.title}</td>
//                   <td><Badge bg={tpl.type==="video"?"primary":"success"}>{tpl.type}</Badge></td>
//                   <td>{tpl.category?.name || tpl.politician?.title}</td>
//                   <td>{tpl.orientation}</td>
//                   <td>{tpl.profilePosition}</td>
//                   <td>{tpl.transitionType}</td>
//                   <td><Badge bg={tpl.status==="active"?"success":"secondary"}>{tpl.status}</Badge></td>
//                   <td>
//                     <Button variant="outline-primary" size="sm" className="me-2" onClick={()=>handleShow(tpl)}><FaEdit/></Button>
//                     <Button variant="outline-danger" size="sm" onClick={()=>handleDelete(tpl._id)}><FaTrash/></Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       <Modal show={show} onHide={handleClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control name="title" value={form.title} onChange={handleChange} />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Type</Form.Label>
//               <Form.Select name="type" value={form.type} onChange={handleChange}>
//                 <option value="video">Video</option>
//                 <option value="graphics">Graphics</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Parent</Form.Label>
//               <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
//                 <option value="Category">Category</option>
//                 <option value="Politician">Politician</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Select {form.parentType}</Form.Label>
//               <Form.Select name="parentId" value={form.parentId} onChange={handleChange}>
//                 <option value="">Choose {form.parentType}</option>
//                 {(form.parentType === "Category" ? categories : politicians).map(p => (
//                   <option key={p._id} value={p._id}>{p.name || p.title}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Orientation</Form.Label>
//               <Form.Select name="orientation" value={form.orientation} onChange={handleChange}>
//                 {orientations.map(o => <option key={o} value={o}>{o}</option>)}
//               </Form.Select>
//             </Form.Group>

//             {form.type === "video" && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Transition Type</Form.Label>
//                 <Form.Select name="transitionType" value={form.transitionType} onChange={handleChange}>
//                   {transitionTypes.map(t => <option key={t} value={t}>{t}</option>)}
//                 </Form.Select>
//               </Form.Group>
//             )}

//             {form.type === "graphics" && (
//               <Form.Group className="mb-3">
//                 <Form.Label>Profile Position</Form.Label>
//                 <Form.Select name="profilePosition" value={form.profilePosition} onChange={handleChange}>
//                   {profilePositions.map(p => <option key={p} value={p}>{p}</option>)}
//                 </Form.Select>
//               </Form.Group>
//             )}

//             <Form.Group className="mb-3">
//               <Form.Label>Status</Form.Label>
//               <Form.Select name="status" value={form.status} onChange={handleChange}>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>File</Form.Label>
//               <Form.Control type="file" name="file" onChange={handleChange} />
//               {filePreview && (
//                 form.type === "video" ?
//                 <video src={filePreview} controls width="100%" className="mt-2"/> :
//                 <img src={filePreview} alt="preview" width="100%" className="mt-2"/>
//               )}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Close</Button>
//           <Button variant="primary" onClick={handleSubmit}>{editId ? "Update" : "Save"}</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Templates;
// src/components/Templates.jsx
import React, { useEffect, useState } from "react";
import {
  Container, Card, Button, Table, Badge, Modal, Form, InputGroup, Row, Col
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";

const profilePositions = [
  "topLeft","topRight","bottomLeft","bottomRight","center",
  "centerLeft","centerRight","topCenter","bottomCenter"
];

const transitionTypes = [
  "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
  "scale","rotation","bounce","ripple"
];

const orientations = ["landscape","portrait"];
const placements = ["above","below"];

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [frames, setFrames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [politicians, setPoliticians] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "video",
    status: "active",
    parentType: "Category",
    parentId: "",
    file: null,
    frame: "",
    transitionPlacement: "below",
    profilePosition: "center",
    transitionType: "fade",
    orientation: "landscape",
  });

  const BASE_URL = "https://clonecraftbackend-gydw.vercel.app/api";

  const fetchTemplates = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/templates`);
      setTemplates(data.templates || []);
    } catch (err) {
      console.error("Fetch templates error:", err);
    }
  };

  const fetchFrames = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/frames`);
      setFrames(data.data || []);
    } catch (err) {
      console.error("Fetch frames error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`);
      setCategories(data.categories || data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  const fetchPoliticians = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/politicians`);
      setPoliticians(data.politicians || data);
    } catch (err) {
      console.error("Fetch politicians error:", err);
    }
  };

  useEffect(() => {
    fetchTemplates();
    fetchFrames();
    fetchCategories();
    fetchPoliticians();
  }, []);

  const handleShow = (tpl = null) => {
    if (tpl) {
      setEditId(tpl._id);
      setForm({
        title: tpl.title,
        type: tpl.type,
        status: tpl.status,
        parentType: tpl.category ? "Category" : "Politician",
        parentId: tpl.category?._id || tpl.politician?._id || "",
        file: null,
        frame: tpl.frame?._id || "",
        transitionPlacement: tpl.transitionPlacement || "below",
        profilePosition: tpl.profilePosition || "center",
        transitionType: tpl.transitionType || "fade",
        orientation: tpl.orientation || "landscape",
      });
      setFilePreview(tpl.file || null);
    } else {
      setEditId(null);
      setForm({
        title: "",
        type: "video",
        status: "active",
        parentType: "Category",
        parentId: "",
        file: null,
        frame: "",
        transitionPlacement: "below",
        profilePosition: "center",
        transitionType: "fade",
        orientation: "landscape",
      });
      setFilePreview(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const selectedFile = files && files[0];
      if (!selectedFile) return;
      setForm((f) => ({ ...f, file: selectedFile }));
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.parentId) return alert("Title & Parent required!");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("type", form.type);
      fd.append("status", form.status);
      fd.append("orientation", form.orientation);
      fd.append("transitionPlacement", form.transitionPlacement);
      if (form.frame) fd.append("frame", form.frame);
      if (form.parentType === "Category") fd.append("category", form.parentId);
      else fd.append("politician", form.parentId);
      if (form.type === "video") fd.append("transitionType", form.transitionType);
      if (form.type === "graphics") fd.append("profilePosition", form.profilePosition);
      if (form.file) fd.append("file", form.file);

      const url = editId ? `${BASE_URL}/templates/${editId}` : `${BASE_URL}/templates`;
      const method = editId ? "put" : "post";
      await axios[method](url, fd, { headers: { "Content-Type": "multipart/form-data" } });
      await fetchTemplates();
      setShow(false);
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.message || "Error saving template");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      await axios.delete(`${BASE_URL}/templates/${id}`);
      fetchTemplates();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete template");
    }
  };

  const filtered = templates.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid>
      <Row className="align-items-center mb-3">
        <Col><h2>Templates</h2></Col>
        <Col md="5">
          <InputGroup>
            <Form.Control
              placeholder="Search by title or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-secondary"><FaSearch /></Button>
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button onClick={() => handleShow()}><FaPlus className="me-2" />Add Template</Button>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Type</th>
                <th>Parent</th>
                <th>Frame</th>
                <th>Transition</th>
                <th>Placement</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tpl) => (
                <tr key={tpl._id}>
                  <td style={{ width: 100 }}>
                    {tpl.file ? (
                      tpl.type === "video" ? (
                        <video src={tpl.file} width="120" height="70" style={{ objectFit: "cover" }} />
                      ) : (
                        <img src={tpl.file} alt={tpl.title} width="120" height="70" style={{ objectFit: "cover", borderRadius: 6 }} />
                      )
                    ) : (
                      <div style={{ width: 120, height: 70, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", borderRadius: 6 }}>No file</div>
                    )}
                  </td>
                  <td>{tpl.title}</td>
                  <td><Badge bg={tpl.type === "video" ? "primary" : "success"}>{tpl.type}</Badge></td>
                  <td>{tpl.category?.name || tpl.politician?.title || "-"}</td>
                  <td>{tpl.frame?.title || "-"}</td>
                  <td>{tpl.transitionType}</td>
                  <td>{tpl.transitionPlacement}</td>
                  <td><Badge bg={tpl.status === "active" ? "success" : "secondary"}>{tpl.status}</Badge></td>
                  <td>
                    <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleShow(tpl)}> <FaEdit /> </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(tpl._id)}> <FaTrash /> </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="9" className="text-center text-muted">No templates found</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" value={form.title} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select name="type" value={form.type} onChange={handleChange}>
                    <option value="video">Video</option>
                    <option value="graphics">Graphics</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Parent Type</Form.Label>
                  <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
                    <option value="Category">Category</option>
                    <option value="Politician">Politician</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select {form.parentType}</Form.Label>
                  <Form.Select name="parentId" value={form.parentId} onChange={handleChange}>
                    <option value="">Choose</option>
                    {(form.parentType === "Category" ? categories : politicians).map(p => (
                      <option key={p._id} value={p._id}>{p.name || p.title}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Frame</Form.Label>
                  <Form.Select name="frame" value={form.frame} onChange={handleChange}>
                    <option value="">No Frame</option>
                    {frames.map(f => <option key={f._id} value={f._id}>{f.title}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Transition Placement</Form.Label>
                  <Form.Select name="transitionPlacement" value={form.transitionPlacement} onChange={handleChange}>
                    {placements.map(p => <option key={p} value={p}>{p}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Orientation</Form.Label>
                  <Form.Select name="orientation" value={form.orientation} onChange={handleChange}>
                    {orientations.map(o => <option key={o} value={o}>{o}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                {form.type === "video" ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Transition Type</Form.Label>
                    <Form.Select name="transitionType" value={form.transitionType} onChange={handleChange}>
                      {transitionTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </Form.Select>
                  </Form.Group>
                ) : (
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Position</Form.Label>
                    <Form.Select name="profilePosition" value={form.profilePosition} onChange={handleChange}>
                      {profilePositions.map(p => <option key={p} value={p}>{p}</option>)}
                    </Form.Select>
                  </Form.Group>
                )}
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>File (image or video)</Form.Label>
              <Form.Control type="file" name="file" onChange={handleChange} />
              {filePreview && (
                form.type === "video"
                  ? <video src={filePreview} controls width="100%" className="mt-2" />
                  : <img src={filePreview} alt="preview" width="100%" className="mt-2" />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : editId ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Templates;
