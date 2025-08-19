import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from './Pages/Landing';
import Document from './Pages/Document';
import Support from './Pages/Support';

const Home = () => <div>Home</div>
const About = () => <div>About</div>

const App = () => {
  return (
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/docs" element={<Document />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App