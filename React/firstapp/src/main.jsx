import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Todos from './pages/todo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Todos />
  </StrictMode>,
)
