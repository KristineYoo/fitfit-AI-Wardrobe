import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing } from './Pages/Landing'
import { Template } from './Pages/Template'
import { Items } from './Pages/Items'
import { Login } from './Pages/Login'
import { Outfits } from './Pages/Outfits'
import Navbar from './components/Navbar'


//This is where we actually make our app
//this file will house all of our pages

function App() {
  return (
    <Router>
     
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Landing/>}/>
          <Route path="/template" element={<Template/>}/>
          <Route path="/outfits" element={<Outfits/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/items" element={<Items/>}/>
        </Routes>

    </Router>
  )
}

export default App
