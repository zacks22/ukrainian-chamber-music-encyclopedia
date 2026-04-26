import './DarkModeToggle.css';
import { useTheme } from '../hooks/useTheme';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
