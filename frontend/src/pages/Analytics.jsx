import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then(res => res.json())
      .then(res =>
        setData([
          { label: "Likes", value: res.likes },
          { label: "Subs", value: res.subs },
          { label: "DMs", value: res.dms },
          { label: "Revenue", value: res.revenue },
        ])
      );
  }, []);

  return (
    <div className="text-white max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#999' }} />
          <Bar dataKey="value" fill="#FF0066" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
