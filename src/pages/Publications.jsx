import React, {useEffect, useState} from 'react'
import { supabase } from '../lib/supabaseClient'
import Card from '../components/Card'

export default function Publications(){
  const [pubs,setPubs]=useState([])
  useEffect(()=> supabase.from('publications').select('*').order('date',{ascending:false}).then(r=>setPubs(r.data || [])),[])
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4" style={{color:'#5b2a86'}}>Publikasi</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {pubs.map(p=>(
            <Card key={p.id}>
              <h3 className="font-semibold" style={{color:'#6b0f1a'}}>{p.title}</h3>
              <p className="text-sm text-gray-300">{p.excerpt}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
