//Mod by Iain Gore 4/25/25

// 4-26-25 Mod Sophia Somers (added theme)
// Modified by Bao Vuong, 5/2/2025 12:24PM
import './App.css'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from './Pages/Landing'
//import { Template } from './Pages/Template'
import { Items } from './Pages/Items'
import { Login } from './Pages/Login'
import { Outfits } from './Pages/Outfits'
import { Recomend } from './Pages/Recomend'
import Navbar from './components/Navbar'
import RegisterPage from './Pages/Register'
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/styling/Theme'
import UserGuide from './Pages/UserGuide'


//This is where we actually make our app
//this file will house all of our pages

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/home" element={<Landing />} />
          <Route path="/recomend" element={<Recomend />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items" element={<Items />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserGuide />} />
        </Routes>

      </Router>
    </ThemeProvider>
  )
}

export default App
