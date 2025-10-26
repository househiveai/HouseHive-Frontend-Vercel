
'use client'
import { useState } from 'react'
import { apiCreateCheckout, apiBillingPortal } from '../../lib/api'

export default function Billing() {
  const [status, setStatus] = useState('')
  const go = async (plan: 'cohost'|'pro'|'agency') => {
    try{
      const { url } = await apiCreateCheckout(plan)
      window.location.href = url
    } catch(e:any){ setStatus(e.message) }
  }
  const portal = async () => {
    try {
      const res:any = await apiBillingPortal()
      window.location.href = res.url
    } catch(e:any){ setStatus(e.message) }
  }
  return (
    <div className="col">
      <div className="card">
        <h2 className="h1">Choose a Plan</h2>
        <div className="row">
          <button className="btn primary" onClick={()=>go('cohost')}>Co-Host</button>
          <button className="btn primary" onClick={()=>go('pro')}>Pro</button>
          <button className="btn primary" onClick={()=>go('agency')}>Agency</button>
          <button className="btn" onClick={portal}>Manage Subscription</button>
        </div>
        {!!status && <p>{status}</p>}
      </div>
    </div>
  )
}
