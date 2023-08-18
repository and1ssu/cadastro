

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import  Dashboard  from './pages/Dashboard/Dashboard'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
