
import { useEffect, useState } from "react";

export default function OnlyFansInbox() {
  const [replies, setReplies] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard/replies")
      .then(res => res.json())
      .then(data => setReplies(data.replies || []));
  }, []);

  const filtered = replies.filter(r =>
    r.sender.toLowerCase().includes(filterUser.toLowerCase())
  );

  const handleEdit = (index, content) => {
    setEditingIndex(index);
    setEditText(content);
  };

  const saveEdit = (index) => {
    const updated = [...replies];
    updated[index].response = editText;
    setReplies(updated);
    setEditingIndex(null);
  };

  const handleUpload = async (replyId) => {
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("reply_to", replyId);
    await fetch("/api/upload-media", {
      method: "POST",
      body: formData
    });
    setUploadFile(null);
    setUploadingId(null);
    window.location.reload();
  };

  return (
    <div className="text-white max-w-screen-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">📨 OnlyFans AI Inbox</h2>
      <input
        className="text-black w-full p-2 rounded"
        placeholder="Filter by username..."
        value={filterUser}
        onChange={(e) => setFilterUser(e.target.value)}
      />
      {filtered.map((msg, i) => (
        <div key={i} className="bg-gray-800 p-4 rounded-lg space-y-2">
          <p className="text-pink-400 font-semibold">@{msg.sender}</p>
          <div className="bg-gray-700 p-2 rounded text-sm">💬 {msg.original}</div>

          {msg.media_url && (
            <div className="mt-2">
              {msg.media_url.endsWith(".mp4") ? (
                <video src={msg.media_url} controls className="rounded max-w-full" />
              ) : (
                <img src={msg.media_url} alt="Attachment" className="rounded max-w-full" />
              )}
            </div>
          )}

          <div className="flex items-start space-x-2">
            {editingIndex === i ? (
              <>
                <textarea
                  className="text-black p-2 rounded flex-1"
                  rows={3}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="bg-green-600 px-2 py-1 rounded" onClick={() => saveEdit(i)}>Save</button>
                <button className="text-gray-300" onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              <div className="bg-pink-900 p-2 rounded text-sm flex-1">
                🤖 {msg.response}
                <button className="ml-2 text-sm underline text-blue-300" onClick={() => handleEdit(i, msg.response)}>
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Upload Media */}
          <div className="mt-2">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setUploadFile(e.target.files[0])}
              className="text-sm text-gray-200"
            />
            <button
              className="ml-2 bg-purple-600 px-2 py-1 text-sm rounded"
              onClick={() => handleUpload(msg.id)}
              disabled={!uploadFile}
            >
              Upload Media
            </button>
          </div>

          <div className="text-xs text-gray-400">🕒 {new Date(msg.timestamp).toLocaleString()}</div>
        </div>
      ))}

      {/* Gallery */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">🖼 Uploaded Media Gallery</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {replies.filter(r => r.media_url).map((r, i) => (
            <div key={i} className="bg-gray-700 p-2 rounded">
              {r.media_url.endsWith(".mp4") ? (
                <video src={r.media_url} controls className="rounded w-full" />
              ) : (
                <img src={r.media_url} className="rounded w-full" />
              )}
              <div className="text-xs text-gray-300 mt-1">@{r.sender}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
