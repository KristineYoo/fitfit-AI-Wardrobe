import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing } from './Pages/Landing'


//This is where we actually make our app
//this file will house all of our pages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </Router>
  )
}

export default App
