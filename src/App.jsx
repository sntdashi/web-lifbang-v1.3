import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Publications from './pages/Publications'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import AuthRoute from './components/AuthRoute'
import AdminLogin from './pages/AdminLogin'
import ScrollToTop from "./components/ScrollToTop";

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-maroon-grid text-gray-100">
      <Navbar/>
      <main className="flex-1">
      <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/publikasi' element={<Publications/>} />
          <Route path='/galeri' element={<Gallery/>} />
          <Route path='/kontak' element={<Contact/>} />
          <Route path='/admin' element={<AuthRoute><Admin/></AuthRoute>} />
          <Route path='/admin-login' element={<AdminLogin/>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}
