import React, { useState } from 'react';

export default function UploadMedia() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const fileType = selected.type.startsWith('video') ? 'video' : 'image';
    setType(fileType);
    setFile(selected);
  };

  const handleSubmit = async () => {
    if (!file) return alert('Please select a file first.');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      alert('Upload successful: ' + result.filename);
    } catch (err) {
      alert('Upload failed.');
    }
  };

  return (
    <div className="p-4 border rounded mb-4 shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Upload Media</h2>
      <input type="file" onChange={handleFileChange} />
      {file && <p className="mt-2">Selected {type}: {file.name}</p>}
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
}