import React, {useState} from 'react'
export default function Contact(){
  const [sent,setSent]=useState(false)
  const handle=e=>{ e.preventDefault(); setSent(true) }
  return (
    <div className="pt-28 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-semibold" style={{color:'#5b2a86'}}>Kontak</h1>
        {sent ? <div className="p-4 bg-green-600/20 rounded">Terima kasih! (simulasi)</div> : (
          <form onSubmit={handle} className="space-y-3 mt-4">
            <input required placeholder="Nama" className="w-full p-3 border rounded bg-white/5"/>
            <input required type="email" placeholder="Email" className="w-full p-3 border rounded bg-white/5"/>
            <textarea required placeholder="Pesan" className="w-full p-3 border rounded h-32 bg-white/5"/>
            <button className="btn-primary">Kirim</button>
          </form>
        )}
      </div>
    </div>
  )
}
