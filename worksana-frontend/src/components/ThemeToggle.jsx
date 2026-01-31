import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-25 h-8 rounded-full transition-colors duration-300
        ${isDark ? "bg-slate-800" : "bg-gray-300"}`}
    >
      {/* Center text */}
      <span
        className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium
          ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {isDark ? "DARK" : "LIGHT"}
      </span>

      {/* Toggle knob */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white
          flex items-center justify-center transition-transform duration-300
          ${isDark ? "translate-x-12" : "translate-x-0"}`}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
