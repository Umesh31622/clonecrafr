import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PoliticianTemplateManager.css';

const API_URL = 'https://clonecraftbackend-gydw.vercel.app/api/politician-templates';

const PoliticianTemplateManager = ({ token }) => {
  const [templates, setTemplates] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [politicianId, setPoliticianId] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setTemplates(res.data.data);
    } catch (err) { console.error(err); }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!politicianId) return alert('Select Politician');

    setLoading(true);
    const formData = new FormData();
    formData.append('politicianId', politicianId);
    formData.append('templateTitle', title);
    formData.append('templateDescription', description);
    images.forEach(img => formData.append('templateImages', img));

    try {
      await axios.post(API_URL, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type':'multipart/form-data' } });
      setTitle(''); setDescription(''); setImages([]);
      fetchTemplates();
    } catch (err) {
      console.error(err);
      alert('Failed to save template');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this template?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchTemplates();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="politician-template-container">
      <h2>Politician Templates</h2>
      <form onSubmit={handleSubmit} className="template-form">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="text" placeholder="Politician ID" value={politicianId} onChange={e => setPoliticianId(e.target.value)} required />

        <div className="image-upload-wrapper">
          {images.map((img, i) => (
            <div key={i} className="image-preview">
              <img src={URL.createObjectURL(img)} alt="" />
              <span className="remove-image" onClick={() => handleRemoveImage(i)}>×</span>
            </div>
          ))}
          <label className="add-image-btn">
            +
            <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display:'none' }}/>
          </label>
        </div>

        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Template'}</button>
      </form>

      <div className="template-list">
        {templates.map(tpl => (
          <div key={tpl._id} className="template-card">
            <h4>{tpl.templateTitle}</h4>
            <p>{tpl.templateDescription}</p>
            <div className="template-images">
              {tpl.templateImages.map((img, i) => (
                <img key={i} src={img} alt="" />
              ))}
            </div>
            <button className="delete-btn" onClick={() => handleDelete(tpl._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticianTemplateManager;
