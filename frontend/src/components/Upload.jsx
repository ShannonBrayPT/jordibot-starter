import React, { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    });
    alert("File uploaded");
  };

  return (
    <div className="p-4 border rounded bg-white h-full flex flex-col gap-2">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default Upload;