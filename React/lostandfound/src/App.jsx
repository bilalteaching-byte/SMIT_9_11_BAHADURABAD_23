import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Auth from './pages/auth'
import Items from './pages/items'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser=>", currentUser)
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={<Items />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
