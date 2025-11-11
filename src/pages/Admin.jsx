import React, {useEffect, useState} from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Admin(){
  const [pubs,setPubs]=useState([])
  const [gals,setGals]=useState([])
  const [form,setForm]=useState({title:'',authors:'',excerpt:''})
  const [galForm,setGalForm]=useState({url:'',caption:''})
  useEffect(()=>{ fetchAll() },[])

  async function fetchAll(){
    const { data: publications } = await supabase.from('publications').select('*').order('date',{ascending:false})
    setPubs(publications || [])
    const { data: gallery } = await supabase.from('gallery').select('*').order('created_at',{ascending:false})
    setGals(gallery || [])
  }

  async function submitPub(e){
    e.preventDefault()
    await supabase.from('publications').insert([{...form, date: new Date()}])
    setForm({title:'',authors:'',excerpt:''})
    fetchAll()
  }
  async function deletePub(id){
    await supabase.from('publications').delete().eq('id',id)
    fetchAll()
  }
  async function submitGal(e){
    e.preventDefault()
    await supabase.from('gallery').insert([{...galForm, created_at: new Date()}])
    setGalForm({url:'',caption:''})
    fetchAll()
  }
  async function deleteGal(id){
    await supabase.from('gallery').delete().eq('id',id)
    fetchAll()
  }

  return (
    <div className="pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4" style={{color:'#5b2a86'}}>Admin Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 p-4 bg-white/5 rounded-xl">
            <h2 className="font-semibold mb-2">Publikasi</h2>
            <ul className="space-y-2">
              {pubs.map(p=>(
                <li key={p.id} className="flex justify-between items-center p-2 border rounded bg-white/5">
                  <div>
                    <div className="font-medium text-gray-100">{p.title}</div>
                    <div className="text-xs text-gray-300">{p.authors}</div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={()=>deletePub(p.id)} className="px-2 py-1 border rounded">Hapus</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={submitPub} className="p-4 bg-white/5 rounded-xl">
            <h3 className="font-medium mb-2">Tambah Publikasi</h3>
            <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required placeholder="Judul" className="w-full p-2 border rounded mb-2 bg-white/5"/>
            <input value={form.authors} onChange={e=>setForm({...form,authors:e.target.value})} required placeholder="Penulis" className="w-full p-2 border rounded mb-2 bg-white/5"/>
            <textarea value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} required placeholder="Ringkasan" className="w-full p-2 border rounded mb-2 bg-white/5"/>
            <button className="btn-primary">Simpan</button>
          </form>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="font-medium mb-2">Galeri</h3>
            <ul className="space-y-2">
              {gals.map(g=>(
                <li key={g.id} className="flex justify-between items-center p-2 border rounded bg-white/5">
                  <div className="text-sm text-gray-200">{g.caption}</div>
                  <div><button onClick={()=>deleteGal(g.id)} className="px-2 py-1 border rounded">Hapus</button></div>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={submitGal} className="p-4 bg-white/5 rounded-xl">
            <h3 className="font-medium mb-2">Tambah Foto (URL)</h3>
            <input value={galForm.url} onChange={e=>setGalForm({...galForm,url:e.target.value})} required placeholder="URL gambar" className="w-full p-2 border rounded mb-2 bg-white/5"/>
            <input value={galForm.caption} onChange={e=>setGalForm({...galForm,caption:e.target.value})} required placeholder="Caption" className="w-full p-2 border rounded mb-2 bg-white/5"/>
            <button className="btn-primary">Upload (insert)</button>
          </form>
        </div>
      </div>
    </div>
  )
}
