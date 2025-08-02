import { useState } from "react";

export function Upload() {
  const [files, setFiles] = useState([]);
  const [tag, setTag] = useState("");
  const [uploaded, setUploaded] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("tags", tag);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    setUploaded(result.uploaded);
  };

  return (
    <div className="text-white max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Upload Content</h2>
      <input type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
      <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" className="text-black p-1 w-full" />
      <button onClick={handleUpload} className="bg-pink-600 px-4 py-2 rounded">Upload</button>

      <ul className="mt-4 list-disc ml-6">
        {uploaded.map((f, i) => (
          <li key={i}>{f.filename}</li>
        ))}
      </ul>
    </div>
  );
}
