import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Auth from "./pages/auth";
import Items from "./pages/items";
import ItemDetail from "./pages/ItemDetail";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth user={user} />} />
        <Route path="/" element={<Items user={user} />} />
        <Route path="/items/:id" element={<ItemDetail user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
