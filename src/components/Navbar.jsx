import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

export default function Navbar(){
  const [open,setOpen] = useState(false)
  const [user,setUser] = useState(null)
  const nav = useNavigate()
  useEffect(()=>{
    supabase.auth.getUser().then(res=> setUser(res.data.user || null))
    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return ()=> sub?.data?.subscription?.unsubscribe?.()
  },[])

  const logout = async ()=>{
    await supabase.auth.signOut()
    nav('/')
  }

  return (
    <motion.nav initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.35}}
      className="fixed w-full z-40 bg-white/6 backdrop-blur-md border-b border-white/6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to='/' className="text-xl font-bold" style={{color:'var(--maroon)'}}>DEPT LITBANG</Link>
        <div className="hidden md:flex gap-6 items-center text-sm">
          <Link to='/' className="hover:text-purpledeep">Home</Link>
          <Link to='/publikasi' className="hover:text-purpledeep">Publikasi</Link>
          <Link to='/galeri' className="hover:text-purpledeep">Galeri</Link>
          <Link to='/kontak' className="hover:text-purpledeep">Kontak</Link>
          <Link to='/admin' className="px-3 py-1 rounded-md text-white btn-primary">Admin</Link>
          {user ? <button onClick={logout} className="text-sm px-2 py-1 border rounded">Logout</button> : <Link to='/admin-login' className="text-sm px-2 py-1 border rounded">Login</Link>}
        </div>
        <button className="md:hidden px-2 py-1" onClick={()=>setOpen(!open)}>☰</button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4">
          <Link to='/' className="block py-2">Home</Link>
          <Link to='/publikasi' className="block py-2">Publikasi</Link>
          <Link to='/galeri' className="block py-2">Galeri</Link>
          <Link to='/kontak' className="block py-2">Kontak</Link>
          <Link to='/admin-login' className="block py-2">Admin</Link>
        </div>
      )}
    </motion.nav>
  )
}
