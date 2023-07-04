import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Products from './pages/Products';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
          <Home />
        </>} /> 
        <Route path="/Products" element={<>
          <Products />
        </>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
