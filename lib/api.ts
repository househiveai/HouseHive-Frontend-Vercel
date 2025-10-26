
'use client'
type ChatTurn = { role: 'user'|'assistant'|'system'; content: string }
const API = process.env.NEXT_PUBLIC_API_BASE || 'https://househive-backend-server-1.onrender.com/api'
function token() { return typeof window!=='undefined' ? (localStorage.getItem('token') || '') : '' }

async function j(method: string, path: string, body?: any, form?: boolean) {
  const url = API + path
  const headers: any = {}
  if(!form) headers['Content-Type'] = 'application/json'
  const t = token()
  if (t) headers['Authorization'] = `Bearer ${t}`
  const opts: any = { method, headers }
  if (body) opts.body = form ? body : JSON.stringify(body)
  const res = await fetch(url, opts)
  if(!res.ok) {
    let msg = await res.text()
    try { const j = JSON.parse(msg); msg = j.detail || msg } catch { }
    throw new Error(msg || res.statusText)
  }
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export async function apiRegister(payload: {email:string,password:string,name:string}){ return j('POST','/auth/register', payload) }
export async function apiLogin(email: string, password: string){
  const form = new FormData(); form.append('username', email); form.append('password', password)
  const data = await j('POST','/auth/login', form, true)
  localStorage.setItem('token', data.access_token)
  return data
}
export async function apiMe(){ return j('GET','/auth/me') }

export async function apiGetProperties(){ return j('GET','/properties') }
export async function apiCreateProperty(payload: {name:string,address:string,notes:string}){ return j('POST','/properties', payload) }

export async function apiGetTasks(){ return j('GET','/tasks') }
export async function apiCreateTask(payload: any){ return j('POST','/tasks', payload) }

export async function apiChat(messages: ChatTurn[], system_prompt?: string){ return j('POST','/ai/chat', { messages, system_prompt }) }

export async function apiCreateCheckout(plan: 'cohost'|'pro'|'agency'){ return j('POST','/stripe/checkout?plan='+plan) }
export async function apiBillingPortal(){ return j('POST','/stripe/portal') }
