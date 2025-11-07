

// // import React, { useEffect, useState } from "react";
// // import { Container, Card, Button, Table, Modal, Form, Image } from "react-bootstrap";
// // import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// // import axios from "axios";

// // const Categories = () => {
// //   const [categories, setCategories] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editId, setEditId] = useState(null);
// //   const [form, setForm] = useState({
// //     name: "",
// //     orientation: "portrait",
// //     file: null,
// //   });
// //   const [previewUrl, setPreviewUrl] = useState(null);
// //   const [showPreview, setShowPreview] = useState(false);
// //   const [objectUrl, setObjectUrl] = useState(null);

// //   const BASE_URL = "https://clonecraftbackend-gydw.vercel.app/.app/api/categories";

// //   // Fetch categories
// //   const fetchCategories = async () => {
// //     try {
// //       const { data } = await axios.get(BASE_URL);
// //       setCategories(data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategories();
// //     return () => {
// //       // cleanup objectUrl on component unmount
// //       if (objectUrl) URL.revokeObjectURL(objectUrl);
// //     };
// //   }, [objectUrl]);

// //   // Show Add/Edit form
// //   const handleShowForm = (cat = null) => {
// //     if (cat) {
// //       setEditId(cat._id);
// //       setForm({
// //         name: cat.name,
// //         orientation: cat.orientation,
// //         file: null,
// //       });
// //       setPreviewUrl(`https://clonecraftbackend-gydw.vercel.app/.app${cat.filePath}`);
// //     } else {
// //       setEditId(null);
// //       setForm({ name: "", orientation: "portrait", file: null });
// //       setPreviewUrl(null);
// //     }
// //     setShowForm(true);
// //   };

// //   const handleCloseForm = () => {
// //     setShowForm(false);
// //     if (objectUrl) {
// //       URL.revokeObjectURL(objectUrl);
// //       setObjectUrl(null);
// //     }
// //   };

// //   // Handle form change
// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (name === "file" && files.length > 0) {
// //       if (objectUrl) URL.revokeObjectURL(objectUrl); // revoke previous
// //       const file = files[0];
// //       const url = URL.createObjectURL(file);
// //       setForm({ ...form, file });
// //       setPreviewUrl(url);
// //       setObjectUrl(url);
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   // Submit Add/Edit
// //   const handleSubmit = async () => {
// //     try {
// //       if (!form.name) {
// //         alert("Please enter category name!");
// //         return;
// //       }

// //       const fd = new FormData();
// //       fd.append("name", form.name);
// //       fd.append("orientation", form.orientation);
// //       if (form.file) fd.append("file", form.file);

// //       if (editId) {
// //         await axios.put(`${BASE_URL}/${editId}`, fd, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //       } else {
// //         await axios.post(BASE_URL, fd, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //       }

// //       fetchCategories();
// //       handleCloseForm();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Something went wrong!");
// //     }
// //   };

// //   // Delete category
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this category?")) return;
// //     try {
// //       await axios.delete(`${BASE_URL}/${id}`);
// //       fetchCategories();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Preview modal
// //   const handlePreview = (cat) => {
// //     setPreviewUrl(`https://clonecraftbackend-gydw.vercel.app/.app${cat.filePath}`);
// //     setShowPreview(true);
// //   };

// //   return (
// //     <Container fluid className="p-3">
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2 className="fw-bold">Categories Management</h2>
// //         <Button variant="primary" onClick={() => handleShowForm()}>
// //           <FaPlus className="me-2" /> Add Category
// //         </Button>
// //       </div>

// //       <Card className="shadow-sm">
// //         <Card.Body>
// //           <Table responsive hover bordered className="align-middle">
// //             <thead className="table-dark">
// //               <tr>
// //                 <th>Preview</th>
// //                 <th>Name</th>
// //                 <th>Orientation</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {categories.length > 0 ? (
// //                 categories.map((cat) => (
// //                   <tr key={cat._id}>
// //                     <td style={{ width: "120px" }}>
// //                       {cat.filePath?.endsWith(".mp4") || cat.filePath?.endsWith(".mov") ? (
// //                         <video
// //                           src={`https://clonecraftbackend-gydw.vercel.app/.app${cat.filePath}`}
// //                           width="100"
// //                           height="70"
// //                           controls
// //                         />
// //                       ) : (
// //                         <Image
// //                           src={`https://clonecraftbackend-gydw.vercel.app/.app${cat.filePath}`}
// //                           alt={cat.name}
// //                           width="100"
// //                           height="70"
// //                           style={{ objectFit: "cover" }}
// //                           rounded
// //                         />
// //                       )}
// //                     </td>
// //                     <td>{cat.name}</td>
// //                     <td>{cat.orientation}</td>
// //                     <td>
// //                       <Button
// //                         variant="info"
// //                         size="sm"
// //                         className="me-2"
// //                         onClick={() => handlePreview(cat)}
// //                       >
// //                         Preview
// //                       </Button>
// //                       <Button
// //                         variant="primary"
// //                         size="sm"
// //                         className="me-2"
// //                         onClick={() => handleShowForm(cat)}
// //                       >
// //                         <FaEdit />
// //                       </Button>
// //                       <Button
// //                         variant="danger"
// //                         size="sm"
// //                         onClick={() => handleDelete(cat._id)}
// //                       >
// //                         <FaTrash />
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="4" className="text-center text-muted">
// //                     No categories found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </Table>
// //         </Card.Body>
// //       </Card>

// //       {/* Add/Edit Modal */}
// //       <Modal show={showForm} onHide={handleCloseForm} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>{editId ? "Edit Category" : "Add Category"}</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Name</Form.Label>
// //               <Form.Control
// //                 name="name"
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 placeholder="Enter category name"
// //               />
// //             </Form.Group>

// //             <Form.Group className="mb-3">
// //               <Form.Label>Orientation</Form.Label>
// //               <Form.Select
// //                 name="orientation"
// //                 value={form.orientation}
// //                 onChange={handleChange}
// //               >
// //                 <option value="portrait">Portrait</option>
// //                 <option value="landscape">Landscape</option>
// //               </Form.Select>
// //             </Form.Group>

// //             <Form.Group className="mb-3">
// //               <Form.Label>Upload Image / Video</Form.Label>
// //               <Form.Control type="file" name="file" onChange={handleChange} />
// //               {previewUrl && (
// //                 <div className="mt-3 text-center">
// //                   {previewUrl.endsWith(".mp4") || previewUrl.endsWith(".mov") ? (
// //                     <video
// //                       src={previewUrl}
// //                       width="200"
// //                       height="120"
// //                       controls
// //                       className="rounded"
// //                     />
// //                   ) : (
// //                     <Image
// //                       src={previewUrl}
// //                       alt="Preview"
// //                       width="200"
// //                       height="120"
// //                       className="rounded"
// //                     />
// //                   )}
// //                 </div>
// //               )}
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleCloseForm}>
// //             Cancel
// //           </Button>
// //           <Button variant="primary" onClick={handleSubmit}>
// //             Save
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>

// //       {/* Preview Modal */}
// //       <Modal
// //         show={showPreview}
// //         onHide={() => setShowPreview(false)}
// //         centered
// //         size="lg"
// //       >
// //         <Modal.Header closeButton>
// //           <Modal.Title>Preview</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body className="text-center">
// //           {previewUrl?.endsWith(".mp4") || previewUrl?.endsWith(".mov") ? (
// //             <video
// //               src={previewUrl}
// //               width="100%"
// //               height="auto"
// //               controls
// //               className="rounded"
// //             />
// //           ) : (
// //             <Image src={previewUrl} width="100%" height="auto" className="rounded" />
// //           )}
// //         </Modal.Body>
// //       </Modal>
// //     </Container>
// //   );
// // };

// // export default Categories;
// import React, { useEffect, useState } from "react";
// import { Container, Card, Button, Table, Modal, Form, Image } from "react-bootstrap";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [form, setForm] = useState({ name: "", orientation: "portrait", file: null });
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const BASE_URL = "https://clonecraftbackend-gydw.vercel.app/api/categories";

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get(BASE_URL);
//       setCategories(data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleShowForm = (cat = null) => {
//     if (cat) {
//       setEditId(cat._id);
//       setForm({ name: cat.name, orientation: cat.orientation, file: null });
//       setPreviewUrl(cat.filePath);
//     } else {
//       setEditId(null);
//       setForm({ name: "", orientation: "portrait", file: null });
//       setPreviewUrl(null);
//     }
//     setShowForm(true);
//   };

//   const handleCloseForm = () => setShowForm(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "file" && files.length > 0) {
//       const file = files[0];
//       const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
//       if (!allowedTypes.includes(file.type)) return alert("Only image files allowed");
//       setForm({ ...form, file });
//       setPreviewUrl(URL.createObjectURL(file));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!form.name) return alert("Name required");

//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("orientation", form.orientation);
//       if (form.file) fd.append("file", form.file);

//       if (editId) await axios.put(`${BASE_URL}/${editId}`, fd);
//       else await axios.post(BASE_URL, fd);

//       fetchCategories();
//       handleCloseForm();
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this category?")) return;
//     await axios.delete(`${BASE_URL}/${id}`);
//     fetchCategories();
//   };

//   return (
//     <Container className="p-3">
//       <div className="d-flex justify-content-between mb-3">
//         <h2>Categories Management</h2>
//         <Button onClick={() => handleShowForm()}><FaPlus /> Add Category</Button>
//       </div>

//       <Card>
//         <Card.Body>
//           <Table responsive hover bordered>
//             <thead className="table-dark">
//               <tr>
//                 <th>Preview</th>
//                 <th>Name</th>
//                 <th>Orientation</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.length > 0 ? categories.map((cat) => (
//                 <tr key={cat._id}>
//                   <td>
//                     {cat.filePath && <Image src={cat.filePath} width={100} height={70} style={{ objectFit: "cover" }} />}
//                   </td>
//                   <td>{cat.name}</td>
//                   <td>{cat.orientation}</td>
//                   <td>
//                     <Button size="sm" className="me-2" onClick={() => handleShowForm(cat)}><FaEdit /></Button>
//                     <Button size="sm" variant="danger" onClick={() => handleDelete(cat._id)}><FaTrash /></Button>
//                     <Button size="sm" variant="info" className="ms-2" onClick={() => { setPreviewUrl(cat.filePath); setShowPreview(true); }}>Preview</Button>
//                   </td>
//                 </tr>
//               )) : <tr><td colSpan={4} className="text-center">No categories</td></tr>}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       {/* Add/Edit Modal */}
//       <Modal show={showForm} onHide={handleCloseForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit" : "Add"} Category</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control name="name" value={form.name} onChange={handleChange} />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Orientation</Form.Label>
//               <Form.Select name="orientation" value={form.orientation} onChange={handleChange}>
//                 <option value="portrait">Portrait</option>
//                 <option value="landscape">Landscape</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Image</Form.Label>
//               <Form.Control type="file" name="file" accept="image/*" onChange={handleChange} />
//               {previewUrl && <Image src={previewUrl} width={200} height={120} style={{ objectFit: "cover" }} />}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseForm}>Cancel</Button>
//           <Button variant="primary" onClick={handleSubmit}>Save</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Preview Modal */}
//       <Modal show={!!showPreview} onHide={() => setShowPreview(false)}>
//         <Modal.Header closeButton><Modal.Title>Preview</Modal.Title></Modal.Header>
//         <Modal.Body className="text-center">
//           <Image src={previewUrl} width="100%" style={{ objectFit: "cover" }} />
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Categories;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "https://clonecraftbackend-gydw.vercel.app/api/categories";
const RELIGIOUS_API = "https://clonecraftbackend-gydw.vercel.app/api/religious";
const LANGUAGE_API = "https://clonecraftbackend-gydw.vercel.app/api/languages";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [religiousList, setReligiousList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    orientation: "portrait",
    status: "active",
    religious: "",
    language: "",
    file: null,
    preview: "",
  });

  // Fetch all data
  const fetchAllData = async () => {
    try {
      const [catRes, relRes, langRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(RELIGIOUS_API),
        axios.get(LANGUAGE_API),
      ]);
      setCategories(catRes.data);
      setReligiousList(relRes.data.religiousList || relRes.data);
      setLanguageList(langRes.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        file,
        preview: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val && key !== "preview") data.append(key, val);
      });

      if (editingCategory) {
        await axios.put(`${API_URL}/${editingCategory._id}`, data);
      } else {
        await axios.post(API_URL, data);
      }

      handleClose();
      fetchAllData();
    } catch (error) {
      console.error("❌ Save error:", error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchAllData();
    }
  };

  // Edit
  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      orientation: cat.orientation,
      status: cat.status,
      religious: cat.religious?._id || "",
      language: cat.language?._id || "",
      file: null,
      preview: cat.filePath || "",
    });
    setShowModal(true);
  };

  // Close
  const handleClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      orientation: "portrait",
      status: "active",
      religious: "",
      language: "",
      file: null,
      preview: "",
    });
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow-sm">
        <Row className="align-items-center mb-3">
          <Col>
            <h4 className="fw-bold mb-0">📁 Category List</h4>
          </Col>
          <Col className="text-end">
            <Button onClick={() => setShowModal(true)}>
              <FaPlus className="me-2" /> Add Category
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Preview</th>
              <th>Name</th>
              <th>Orientation</th>
              <th>Status</th>
              <th>Religious</th>
              <th>Language</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>
                    {cat.filePath ? (
                      <Image
                        src={cat.filePath}
                        alt={cat.name}
                        rounded
                        width="60"
                        height="60"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{cat.name}</td>
                  <td>{cat.orientation}</td>
                  <td>{cat.status}</td>
                  <td>{cat.religious?.title || "—"}</td>
                  <td>{cat.language?.name || "—"}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(cat)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(cat._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Orientation</Form.Label>
              <Form.Select
                name="orientation"
                value={formData.orientation}
                onChange={handleChange}
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </Form.Select>
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

            {/* Religious Dropdown */}
            <Form.Group className="mb-3">
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

            {/* Language Dropdown */}
            <Form.Group className="mb-3">
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
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
              />
              {formData.preview && (
                <div className="mt-2 text-center">
                  <Image
                    src={formData.preview}
                    alt="Preview"
                    rounded
                    width="120"
                    height="120"
                  />
                </div>
              )}
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="primary">
                {editingCategory ? "Update" : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
