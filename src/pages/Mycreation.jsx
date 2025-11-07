// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyCreationAdmin.css";

// const API_URL = "https://clonecraftbackend-gydw.vercel.app/api/mycreations";

// export default function MyCreationAdmin() {
//   const [creations, setCreations] = useState([]);

//   useEffect(() => {
//     fetchCreations();
//   }, []);

//   const fetchCreations = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setCreations(res.data.creations || []);
//     } catch (err) {
//       console.error("Error fetching creations:", err);
//     }
//   };

//   const handleStatus = async (id, status) => {
//     try {
//       await axios.put(`${API_URL}/${id}/status`, { status });
//       fetchCreations();
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="mycreation-admin">
//       <h2>My Creations (Admin Panel)</h2>

//       {creations.length === 0 ? (
//         <p className="empty-state">No creations found.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="mycreation-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>User</th>
//                 <th>Status</th>
//                 <th>Preview</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {creations.map((c) => (
//                 <tr key={c._id}>
//                   <td>{c.title}</td>
//                   <td>{c.user?.name || "Unknown"}</td>
//                   <td>
//                     <span
//                       className={`status-pill ${
//                         c.status === "approved"
//                           ? "status-approved"
//                           : c.status === "rejected"
//                           ? "status-rejected"
//                           : "status-pending"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>
//                   <td>
//                     <a
//                       href={c.file}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="preview-link"
//                     >
//                       🔗 View
//                     </a>
//                   </td>
//                   <td>
//                     {c.status === "pending" ? (
//                       <div className="actions">
//                         <button
//                           className="btn btn-approve"
//                           onClick={() => handleStatus(c._id, "approved")}
//                         >
//                           Approve
//                         </button>
//                         <button
//                           className="btn btn-reject"
//                           onClick={() => handleStatus(c._id, "rejected")}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     ) : (
//                       <span className="no-action">—</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyCreationAdmin.css";

const API_URL = "https://clonecraftbackend-gydw.vercel.app/api/mycreations";

export default function MyCreationAdmin() {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    fetchCreations();
  }, []);

  const fetchCreations = async () => {
    try {
      const res = await axios.get(API_URL);
      setCreations(res.data.creations || []);
    } catch (err) {
      console.error("Error fetching creations:", err);
    }
  };

  const handleStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}/status`, { status: newStatus });
      fetchCreations();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="mycreation-admin">
      <h2>🎨 My Creations (Admin Panel)</h2>

      {creations.length === 0 ? (
        <p className="empty-state">No creations found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="mycreation-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>User</th>
                <th>Status</th>
                <th>Preview</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {creations.map((c) => (
                <tr key={c._id}>
                  <td>{c.title || "Untitled"}</td>
                  <td>{c.user?.name || "Unknown"}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        c.status === "approved"
                          ? "status-approved"
                          : c.status === "rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    {c.file ? (
                      <a
                        href={c.file}
                        target="_blank"
                        rel="noreferrer"
                        className="preview-link"
                      >
                        🔗 View File
                      </a>
                    ) : (
                      <span className="no-file">No file</span>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      {c.status === "pending" && (
                        <>
                          <button
                            className="btn btn-approve"
                            onClick={() => handleStatus(c._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-reject"
                            onClick={() => handleStatus(c._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {c.status === "approved" && (
                        <button
                          className="btn btn-reject"
                          onClick={() => handleStatus(c._id, "rejected")}
                        >
                          Reject
                        </button>
                      )}

                      {c.status === "rejected" && (
                        <button
                          className="btn btn-approve"
                          onClick={() => handleStatus(c._id, "approved")}
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
