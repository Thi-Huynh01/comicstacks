import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ComicsList from './pages/ComicstList/ComicsList';
import ComicsDetail from './pages/ComicsDetail/ComicsDetail'
import ComicsLandPage from './pages/ComicsLandPage/ComicsLandPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  },[theme])

  return (
    <div className={`container ${theme}`}>
      <Router>
          <Navbar theme={theme} setTheme={setTheme}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/comics" element={<ComicsLandPage/>} />
          <Route path="/comics/our-stack" element={<ComicsList/>} />
          <Route path="/comics/our-stack/:slug" element={<ComicsDetail/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
