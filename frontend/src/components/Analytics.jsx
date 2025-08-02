import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [data, setData] = useState({ views: 0, likes: 0 });

  useEffect(() => {
    fetch("http://localhost:8000/analytics/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2>Analytics</h2>
      <p>Views: {data.views}</p>
      <p>Likes: {data.likes}</p>
    </div>
  );
};

export default Analytics;
