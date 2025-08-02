import { NavLink } from "react-router-dom";
const items = ["Chatbot", "Upload", "Schedule", "Analytics"];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-secondary text-white p-4 space-y-4">
      <h2 className="text-lg font-semibold">JordiBot</h2>
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-pink-700 ${
                isActive ? "bg-pink-600 font-bold" : ""
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}