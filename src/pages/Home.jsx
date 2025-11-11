import React, {useEffect, useState} from 'react'
import Card from '../components/Card'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

export default function Home(){
  const [pubs,setPubs]=useState([])
  useEffect(()=>{
    supabase.from('publications').select('*').order('date',{ascending:false}).then(r=>setPubs(r.data || []))
  },[])
  return (
    <div className="pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.header initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mb-8">
          <div className="rounded-2xl p-8 bg-gradient-to-r from-[#6b0f1a] to-[#5b2a86] text-white shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold">Riset & Inovasi — DEPT LITBANG</h1>
            <p className="mt-2 text-sm opacity-90">Tempat eksperimen & publikasi karya mahasiswa.</p>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <section className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold" style={{color:'#5b2a86'}}>Publikasi Terbaru</h2>
            <div className="space-y-4">
              {pubs.length===0 && <Card><div>Belum ada publikasi.</div></Card>}
              {pubs.map(p=>(
                <Card key={p.id}>
                  <h3 className="font-semibold text-lg" style={{color:'#6b0f1a'}}>{p.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{p.excerpt}</p>
                  <div className="mt-3 text-xs text-gray-400">{p.authors} • {new Date(p.date).toLocaleDateString()}</div>
                </Card>
              ))}
            </div>
          </section>

          <aside>
            <div className="p-4 rounded-xl bg-white/3 shadow">
              <h3 className="font-semibold text-indigo-200">Tentang DEPT LITBANG</h3>
              <p className="text-sm text-gray-300 mt-2">Mendorong penelitian & publikasi mahasiswa Teknik Informatika.</p>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-white/3 shadow">
              <h4 className="font-medium">Contact</h4>
              <p className="text-xs text-gray-400 mt-2">litbang@example.edu</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
