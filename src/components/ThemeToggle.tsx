import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getIcon = () => {
    return theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 border border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary hover:bg-background transition-all duration-200"
      aria-label="Toggle theme"
    >
      {getIcon()}
    </button>
  );
}
