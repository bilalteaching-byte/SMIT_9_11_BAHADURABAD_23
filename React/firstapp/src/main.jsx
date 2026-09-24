import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Todos from './pages/todo.jsx'
import LearninUseEffect from './pages/learningUseEffect.jsx'
import Stopwatch from './pages/Stopwatch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Todos /> */}
    {/* <LearninUseEffect /> */}
    {/* <Stopwatch /> */}
  </StrictMode>,
)
