import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Auth from "./pages/auth";
import Items from "./pages/items";
import ItemDetail from "./pages/ItemDetail";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { ThemeContext, themes } from './contex/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setThemeMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", nextMode);
      return nextMode;
    });
  };

  const theme = themes[themeMode];
  const themeContextValue = { mode: themeMode, theme, toggleTheme };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader fullPage label="Loading..." size="lg" />;
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div
        className="app-shell"
        data-theme={themeMode}
        style={Object.fromEntries(
          Object.entries(theme.colors).map(([key, value]) => [`--color-${key}`, value]),
        )}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth user={user} />} />
            <Route path="/" element={<Items user={user} />} />
            <Route path="/items/:id" element={<ItemDetail user={user} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>

  );
}

export default App;
