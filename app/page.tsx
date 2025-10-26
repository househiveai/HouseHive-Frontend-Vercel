
'use client'
import { useState } from 'react'
import { apiLogin, apiRegister } from '../lib/api'
export default function Home() {
  const [email, setEmail] = useState('demo@househive.ai')
  const [password, setPassword] = useState('demo1234')
  const [name, setName] = useState('Demo User')
  const [mode, setMode] = useState<'login'|'register'>('login')
  const [msg, setMsg] = useState<string>('')
  const submit = async () => {
    try {
      if (mode === 'register') {
        await apiRegister({email, password, name}); setMsg('Registered! Now log in.'); setMode('login'); return
      }
      await apiLogin(email, password); window.location.href = '/dashboard'
    } catch (e:any) { setMsg(e.message || 'Error') }
  }
  return (
    <div className="container">
      <h2 className="h1">{mode === 'login' ? 'Login' : 'Create your account'}</h2>
      <div className="col" style={{maxWidth: 420}}>
        {mode==='register' && (<><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} /></>)}
        <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="row">
          <button className="btn primary" onClick={submit}>{mode==='login' ? 'Login' : 'Register'}</button>
          <button className="btn" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Need an account?':'Already have an account?'}</button>
        </div>
        {!!msg && <p>{msg}</p>}
      </div>
    </div>
  )
}
