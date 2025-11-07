import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LanguageManager.css";

const API_URL = "https://clonecraftbackend-gydw.vercel.app/api/languages";

export default function LanguageManager() {
  const [languages, setLanguages] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", nativeName: "", flag: "" });
  const [editId, setEditId] = useState(null);

  // Fetch all
  const fetchLanguages = async () => {
    const res = await axios.get(API_URL);
    setLanguages(res.data);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ code: "", name: "", nativeName: "", flag: "" });
    setEditId(null);
    fetchLanguages();
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchLanguages();
    }
  };

  // Handle edit
  const handleEdit = (lang) => {
    setEditId(lang._id);
    setForm(lang);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="language-container">
      <h2>🌐 Language Manager</h2>

      <form className="language-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            placeholder="Code (en, hi, etc.)"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />
          <input
            placeholder="Language Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Native Name"
            value={form.nativeName}
            onChange={(e) => setForm({ ...form, nativeName: e.target.value })}
            required
          />
          <input
            placeholder="Flag Emoji (🇮🇳)"
            value={form.flag}
            onChange={(e) => setForm({ ...form, flag: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-btn">
          {editId ? "Update Language" : "Add Language"}
        </button>
      </form>

      <table className="language-table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Code</th>
            <th>Name</th>
            <th>Native</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No languages found</td>
            </tr>
          ) : (
            languages.map((lang) => (
              <tr key={lang._id}>
                <td>{lang.flag}</td>
                <td>{lang.code}</td>
                <td>{lang.name}</td>
                <td>{lang.nativeName}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(lang)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(lang._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
