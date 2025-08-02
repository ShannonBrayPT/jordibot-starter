import React, { useState } from "react";

const MediaUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/media/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setStatus(`Uploaded: ${data.filename}`);
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default MediaUpload;
