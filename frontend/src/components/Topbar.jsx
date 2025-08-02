import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Topbar() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-secondary shadow">
      <span className="font-bold text-pink-600">Dashboard</span>
      <button onClick={() => setDark(!dark)}>
        {dark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-black" />}
      </button>
    </header>
  );
}