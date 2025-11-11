import React, {useEffect, useState} from 'react'
import { supabase } from '../lib/supabaseClient'
import { Navigate } from 'react-router-dom'

export default function AuthRoute({children}){
  const [loading,setLoading]=useState(true)
  const [user,setUser]=useState(null)
  useEffect(()=>{
    supabase.auth.getSession().then(r=>{
      setUser(r.data.session?.user ?? null)
      setLoading(false)
    })
  },[])
  if(loading) return <div className="pt-28">Checking auth...</div>
  if(!user) return <Navigate to='/admin-login' replace />
  return children
}
