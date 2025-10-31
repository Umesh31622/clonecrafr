
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./FrameManager.css";

// const API_BASE = "https://clonecraftbackend-gydw.vercel.app/api/frames"; // Backend URL

// const FrameManager = () => {
//   const [frames, setFrames] = useState([]);
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Get token from localStorage
//   const token = localStorage.getItem("token");

//   // 🔹 Axios config with token
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   // 🔹 Fetch Frames
//   const fetchFrames = async () => {
//     try {
//       const { data } = await axios.get(API_BASE, config);
//       setFrames(data.data || []);
//     } catch (error) {
//       console.error("Fetch Frames Error:", error);
//       if (error.response?.status === 401) {
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "/authpage";
//       } else {
//         toast.error("Error fetching frames");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchFrames();
//   }, []);

//   // 🔹 Image Preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // 🔹 Submit (Add / Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || (!image && !editId)) return toast.warn("Please fill all fields");

//     const formData = new FormData();
//     formData.append("title", title);
//     if (image) formData.append("image", image);

//     setLoading(true);

//     try {
//       if (editId) {
//         await axios.put(`${API_BASE}/${editId}`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Frame updated successfully");
//       } else {
//         await axios.post(API_BASE, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Frame added successfully");
//       }

//       setTitle("");
//       setImage(null);
//       setPreview("");
//       setEditId(null);
//       fetchFrames();
//     } catch (err) {
//       console.error("Submit Error:", err);
//       if (err.response?.status === 401) {
//         toast.error("Unauthorized access. Please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "/authpage";
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Edit
//   const handleEdit = (frame) => {
//     setTitle(frame.title);
//     setPreview(frame.image);
//     setEditId(frame._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🔹 Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this frame?")) return;
//     try {
//       await axios.delete(`${API_BASE}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Frame deleted");
//       fetchFrames();
//     } catch (error) {
//       console.error("Delete Error:", error);
//       if (error.response?.status === 401) {
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "/authpage";
//       } else {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   return (
//     <div className="frame-container">
//       <h2 className="page-title">{editId ? "Edit Frame" : "Add New Frame"}</h2>

//       {/* Form Section */}
//       <form onSubmit={handleSubmit} className="frame-form">
//         <div className="form-group">
//           <label>Frame Title</label>
//           <input
//             type="text"
//             placeholder="Enter Frame Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         {preview && (
//           <div className="preview-wrapper">
//             <img src={preview} alt="Preview" className="preview-image" />
//           </div>
//         )}

//         <button type="submit" disabled={loading} className="btn-submit">
//           {loading ? "Saving..." : editId ? "Update Frame" : "Add Frame"}
//         </button>
//       </form>
// {/* Search Bar */}
// <div className="search-bar">
//   <input
//     type="text"
//     placeholder="Search frames..."
//     onChange={(e) => {
//       const search = e.target.value.toLowerCase();
//       setFrames((prev) =>
//         prev.filter((f) => f.title.toLowerCase().includes(search))
//       );
//       if (e.target.value === "") fetchFrames();
//     }}
//   />
// </div>

//       {/* Frame List */}
//       <div className="frame-list">
//         <h3>All Frames</h3>
//         {frames.length === 0 ? (
//           <p className="no-data">No frames added yet.</p>
//         ) : (
//           <div className="frame-grid">
//             {frames.map((frame) => (
//               <div key={frame._id} className="frame-card">
//                 <img src={frame.image} alt={frame.title} />
//                 <h4>{frame.title}</h4>
//                 <div className="btn-group">
//                   <button onClick={() => handleEdit(frame)} className="btn-edit">
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(frame._id)} className="btn-delete">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FrameManager;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FrameManager.css";

const API_BASE = "https://clonecraftbackend-gydw.vercel.app/api/frames"; // change to your backend URL

const FrameManager = () => {
  const [frames, setFrames] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);
  const [frameType, setFrameType] = useState("default");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchFrames = async () => {
    try {
      const { data } = await axios.get(API_BASE, config);
      setFrames(data.data || []);
    } catch (error) {
      console.error("Fetch Frames Error:", error);
      toast.error("Error fetching frames");
    }
  };

  useEffect(() => {
    fetchFrames();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!image && !editId)) return toast.warn("Please fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("frameType", frameType);
    if (image) formData.append("image", image);

    setLoading(true);

    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Frame updated successfully");
      } else {
        await axios.post(API_BASE, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Frame added successfully");
      }

      setTitle("");
      setImage(null);
      setPreview("");
      setEditId(null);
      setHeight(300);
      setWidth(300);
      setFrameType("default");
      fetchFrames();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (frame) => {
    setTitle(frame.title);
    setHeight(frame.height);
    setWidth(frame.width);
    setFrameType(frame.frameType);
    setPreview(frame.image);
    setEditId(frame._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this frame?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, config);
      toast.success("Frame deleted");
      fetchFrames();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="frame-container">
      <h2 className="page-title">{editId ? "Edit Frame" : "Add New Frame"}</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="frame-form">
        <div className="form-group">
          <label>Frame Title</label>
          <input
            type="text"
            placeholder="Enter Frame Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Frame Height (px)</label>
          <input
            type="number"
            placeholder="e.g. 300"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Frame Width (px)</label>
          <input
            type="number"
            placeholder="e.g. 300"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Frame Type</label>
          <select value={frameType} onChange={(e) => setFrameType(e.target.value)}>
            <option value="default">Default</option>
            <option value="square">Square</option>
            <option value="circle">Circle</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
          <div className="preview-wrapper">
            <img
              src={preview}
              alt="Preview"
              className={`preview-image ${frameType}`}
              style={{
                height: `${height}px`,
                width: `${width}px`,
                borderRadius: frameType === "circle" ? "50%" : "10px",
              }}
            />
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? "Saving..." : editId ? "Update Frame" : "Add Frame"}
        </button>
      </form>

      {/* Frame List */}
      <div className="frame-list">
        <h3>All Frames</h3>
        {frames.length === 0 ? (
          <p className="no-data">No frames added yet.</p>
        ) : (
          <div className="frame-grid">
            {frames.map((frame) => (
              <div
                key={frame._id}
                className="frame-card"
                style={{
                  height: `${frame.height}px`,
                  width: `${frame.width}px`,
                  borderRadius: frame.frameType === "circle" ? "50%" : "10px",
                }}
              >
                <img
                  src={frame.image}
                  alt={frame.title}
                  style={{
                    height: `${frame.height}px`,
                    width: `${frame.width}px`,
                    borderRadius: frame.frameType === "circle" ? "50%" : "10px",
                    objectFit: "cover",
                  }}
                />
                <h4>{frame.title}</h4>
                <div className="btn-group">
                  <button onClick={() => handleEdit(frame)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(frame._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameManager;
