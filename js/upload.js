/**
 * ARTSPHERE — upload.js
 * Artist upload portal: file preview, form validation, submit
 */

const Upload = (() => {
  let selectedFile = null;
  let previewUrl   = null;

  function init() {
    setupDropzone();
    setupForm();
    document.getElementById('openUploadBtn')?.addEventListener('click', () => {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('uploadAnother')?.addEventListener('click', resetForm);
  }

  function setupDropzone() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('artFile');
    const preview   = document.getElementById('artPreview');
    const inner     = document.getElementById('dropzoneInner');
    if (!dropzone) return;

    // Click to select
    dropzone.addEventListener('click', (e) => {
      if (e.target !== fileInput) fileInput.click();
    });

    // File selected via input
    fileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) handleFile(e.target.files[0]);
    });

    // Drag & drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) handleFile(file);
      else Toast.show('Please drop an image file', 'error');
    });

    function handleFile(file) {
      if (file.size > 15 * 1024 * 1024) {
        Toast.show('Image must be under 15MB', 'error'); return;
      }
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewUrl = e.target.result;
        preview.src = previewUrl;
        preview.style.display = 'block';
        inner.style.display   = 'none';
      };
      reader.readAsDataURL(file);
    }
  }

  function setupForm() {
    document.getElementById('submitArtBtn')?.addEventListener('click', handleSubmit);
  }

  function handleSubmit() {
    const title     = document.getElementById('artTitle')?.value.trim();
    const artist    = document.getElementById('artistName')?.value.trim();
    const category  = document.getElementById('artCategory')?.value;
    const price     = parseInt(document.getElementById('artPrice')?.value);
    const medium    = document.getElementById('artMedium')?.value.trim();
    const dimensions= document.getElementById('artDimensions')?.value.trim();
    const desc      = document.getElementById('artDesc')?.value.trim();

    // Validation
    if (!title)    { Toast.show('Please enter a title', 'error'); return; }
    if (!artist)   { Toast.show('Please enter your name', 'error'); return; }
    if (!category) { Toast.show('Please select an art form', 'error'); return; }
    if (!price || price < 100) { Toast.show('Please enter a valid price (min ₹100)', 'error'); return; }

    // Build artwork object
    const newArtwork = {
      _id:        'user_' + Date.now(),
      title,
      artist,
      artistId:   'user_' + artist.replace(/\s+/g,'_').toLowerCase(),
      category,
      price,
      medium:     medium || 'Mixed media',
      dimensions: dimensions || 'N/A',
      description: desc || 'A beautiful artwork by ' + artist,
      image:      previewUrl || 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&q=80',
      likes:      0,
      year:       new Date().getFullYear(),
      sold:       false,
      featured:   false
    };

    // Save to localStorage (MongoDB write in backend)
    saveToLocal(newArtwork);

    // Add to gallery
    Gallery.addArtwork(newArtwork);

    // Show success
    showSuccess();
    Toast.show('🎨 Your artwork is now live!', 'success');
  }

  function saveToLocal(artwork) {
    try {
      const existing = JSON.parse(localStorage.getItem('artsphere_uploads') || '[]');
      existing.push(artwork);
      localStorage.setItem('artsphere_uploads', JSON.stringify(existing));
    } catch(e) { console.warn('localStorage unavailable:', e); }
  }

  function showSuccess() {
    const form    = document.getElementById('uploadFormCard');
    const success = document.getElementById('formSuccess');
    if (form && success) {
      // Hide form fields
      form.querySelectorAll('.upload-dropzone, .form-grid, #submitArtBtn, .form-title').forEach(el => {
        el.style.display = 'none';
      });
      success.style.display = 'flex';
      success.style.flexDirection = 'column';
      success.style.alignItems = 'center';
    }
  }

  function resetForm() {
    selectedFile = null;
    previewUrl   = null;

    // Reset preview
    const preview = document.getElementById('artPreview');
    const inner   = document.getElementById('dropzoneInner');
    if (preview) { preview.style.display = 'none'; preview.src = ''; }
    if (inner)     inner.style.display = 'flex';

    // Reset inputs
    ['artTitle','artistName','artMedium','artDimensions','artDesc'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('artCategory').value = '';
    document.getElementById('artPrice').value    = '';
    document.getElementById('artFile').value     = '';

    // Show form again
    const form    = document.getElementById('uploadFormCard');
    const success = document.getElementById('formSuccess');
    if (form) {
      form.querySelectorAll('.upload-dropzone, .form-grid, #submitArtBtn, .form-title').forEach(el => {
        el.style.display = '';
      });
    }
    if (success) success.style.display = 'none';
  }

  return { init, resetForm };
})();