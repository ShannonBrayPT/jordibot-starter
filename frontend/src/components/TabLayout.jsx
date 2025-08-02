// frontend/src/components/TabLayout.jsx
import React, { useState } from "react";

const TabLayout = ({ tabs }) => {
  const [active, setActive] = useState(Object.keys(tabs)[0]);

  return (
    <div className="p-4">
      <div className="flex space-x-4 border-b mb-4">
        {Object.keys(tabs).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`py-2 px-4 font-medium ${
              active === key ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div>{tabs[active]}</div>
    </div>
  );
};

export default TabLayout;
