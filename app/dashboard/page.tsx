
'use client'
import useS from '../../lib/store'
import { useEffect } from 'react'
import { apiMe } from '../../lib/api'
export default function Dashboard() {
  const me = useS(s=>s.me); const setMe = useS(s=>s.setMe)
  useEffect(()=>{ apiMe().then(setMe).catch(()=>{}) }, [])
  return (
    <div className="card">
      <h2 className="h1">Welcome, {me?.name || 'friend'} 👋</h2>
      <p>Plan: <span className="badge">{me?.plan || 'free'}</span></p>
      <p>Use the nav to manage properties, maintenance, messages, and billing.</p>
    </div>
  )
}
