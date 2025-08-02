import { useEffect, useState } from "react";

export function Templates() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("/api/templates")
      .then(res => res.json())
      .then(data => setTemplates(data.templates));
  }, []);

  return (
    <div className="text-white max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">DM Templates</h2>
      <ul className="list-disc ml-6">
        {templates.map((t, i) => (
          <li key={i}><strong>{t.label}</strong>: {t.message}</li>
        ))}
      </ul>
    </div>
  );
}
