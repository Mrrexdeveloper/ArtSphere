// ARTSPHERE — UploadSection.jsx
import { useState, useRef } from "react";

export default function UploadSection({ onUpload }) {
  const [form, setForm]       = useState({ title:'', artist:'', category:'', price:'', medium:'', dimensions:'', desc:'' });
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileRef               = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.title || !form.artist || !form.category || !form.price) return;
    const artwork = {
      _id:         'user_' + Date.now(),
      title:       form.title,
      artist:      form.artist,
      artistId:    'user_' + form.artist.replace(/\s+/g, '_').toLowerCase(),
      category:    form.category,
      price:       parseInt(form.price),
      medium:      form.medium || 'Mixed media',
      dimensions:  form.dimensions || 'N/A',
      description: form.desc || 'A beautiful artwork by ' + form.artist,
      image:       preview || 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&q=80',
      likes:       0,
      year:        new Date().getFullYear(),
      sold:        false,
      featured:    false
    };
    onUpload(artwork);
    setSuccess(true);
  };

  const reset = () => {
    setForm({ title:'', artist:'', category:'', price:'', medium:'', dimensions:'', desc:'' });
    setPreview(null);
    setSuccess(false);
  };

  return (
    <section className="upload-section" id="upload-section">
      <div className="upload-container">
        <div className="upload-info">
          <p className="upload-eyebrow">Artist Portal</p>
          <h2 className="upload-title">Share Your<br/><em>Masterpiece</em></h2>
          <p className="upload-desc">Join hundreds of artists selling their work on ArtSphere. Set your own price, reach collectors across India.</p>
          <ul className="upload-perks">
            <li>✦ Keep 85% of every sale</li>
            <li>✦ Reach 50,000+ art collectors</li>
            <li>✦ Instant payout on purchase</li>
            <li>✦ Free artist profile page</li>
          </ul>
        </div>

        <div className="upload-form-card">
          {success ? (
            <div className="form-success" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div className="success-icon">✓</div>
              <p>Your artwork is now live!</p>
              <button className="btn-ghost-sm" onClick={reset}>Upload Another</button>
            </div>
          ) : (
            <>
              <h3 className="form-title">Upload Artwork</h3>

              {/* Dropzone */}
              <div
                className="upload-dropzone"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" accept="image/*" hidden
                  onChange={e => handleFile(e.target.files[0])}
                />
                {preview
                  ? <img src={preview} className="art-preview" alt="Preview" />
                  : (
                    <div className="dropzone-inner">
                      <div className="dropzone-icon">🖼️</div>
                      <p>Drag & drop your artwork</p>
                      <span>or click to browse</span>
                    </div>
                  )
                }
              </div>

              <div className="form-grid">
                <div className="form-group full">
                  <label>Artwork Title *</label>
                  <input className="form-input" placeholder="e.g. Dancing Ganesha"
                    value={form.title} onChange={e => handleChange('title', e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Artist Name *</label>
                  <input className="form-input" placeholder="Your full name"
                    value={form.artist} onChange={e => handleChange('artist', e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Art Form *</label>
                  <select className="form-input" value={form.category} onChange={e => handleChange('category', e.target.value)}>
                    <option value="">Select category</option>
                    {['graphite','charcoal','acrylic','oil','madhubani','warli','tanjore','miniature','pattachitra','digital'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input className="form-input" type="number" placeholder="e.g. 12000" min="100"
                    value={form.price} onChange={e => handleChange('price', e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Medium</label>
                  <input className="form-input" placeholder="e.g. Canvas, Acrylic"
                    value={form.medium} onChange={e => handleChange('medium', e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Dimensions</label>
                  <input className="form-input" placeholder='e.g. 24"×36"'
                    value={form.dimensions} onChange={e => handleChange('dimensions', e.target.value)}/>
                </div>
                <div className="form-group full">
                  <label>Description</label>
                  <textarea className="form-input form-textarea" rows="3"
                    placeholder="Tell the story behind your artwork…"
                    value={form.desc} onChange={e => handleChange('desc', e.target.value)}/>
                </div>
              </div>

              <button className="btn-primary btn-block" onClick={handleSubmit}>
                <span>Publish Artwork</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}