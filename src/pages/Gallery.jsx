import React, {useEffect, useState} from 'react'
import { supabase } from '../lib/supabaseClient'
import { motion } from 'framer-motion'

export default function Gallery(){
  const [gals,setGals]=useState([])
  useEffect(()=>{
    supabase.from('gallery').select('*').order('created_at',{ascending:false}).then(r=>setGals(r.data || []))
  },[])
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4" style={{color:'#5b2a86'}}>Galeri</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gals.length===0 && <div className="text-gray-400">Belum ada foto.</div>}
          {gals.map(g=>(
            <motion.div key={g.id} whileHover={{scale:1.03}} className="rounded-xl overflow-hidden shadow">
              <img src={g.url} alt={g.caption} className="w-full h-40 object-cover"/>
              <div className="p-2 text-sm text-gray-300">{g.caption}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
