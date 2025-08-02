import { NavLink } from "react-router-dom";

const items = [
  { name: "Inbox", path: "/inbox" },
  { name: "Chatbot", path: "/chatbot" },
  { name: "Upload", path: "/upload" },
  { name: "Schedule", path: "/schedule" },
  { name: "Analytics", path: "/analytics" },
  { name: "Templates", path: "/templates" },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-60 bg-secondary text-white p-4 space-y-4">
      <h2 className="text-lg font-bold">JordiBot</h2>
      <nav className="flex md:flex-col gap-2 flex-wrap">
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-pink-700 ${
                isActive ? "bg-pink-600 font-bold" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
