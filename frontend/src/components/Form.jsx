import React, { useState } from 'react';

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => alert('Upload complete!'))
      .catch((err) => console.error('Upload failed', err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-white bg-gray-800 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-800"
      >
        Upload
      </button>
    </form>
  );
}

export default UploadForm;
