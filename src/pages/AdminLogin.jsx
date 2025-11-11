import React, {useState} from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState('')
  const nav = useNavigate()
  const handleEmail = async (e)=>{ e.preventDefault(); const { error } = await supabase.auth.signInWithPassword({email, password: pass}); if(!error) nav('/admin') }
  const handleGoogle = async ()=>{ await supabase.auth.signInWithOAuth({provider:'google'}) }
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl mb-4" style={{color:'#5b2a86'}}>Login Admin</h1>
        <form onSubmit={handleEmail} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded bg-white/5" required/>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" className="w-full p-3 border rounded bg-white/5" required/>
          <button className="btn-primary w-full">Login</button>
        </form>
        <div className="mt-3 text-center">
          <button onClick={handleGoogle} className="px-3 py-2 border rounded">Login with Google</button>
        </div>
      </div>
    </div>
  )
}
