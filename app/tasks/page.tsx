
'use client'
import { useEffect, useState } from 'react'
import { apiGetProperties, apiCreateTask, apiGetTasks } from '../../lib/api'

export default function Tasks() {
  const [props, setProps] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [propertyId, setPropertyId] = useState<number|undefined>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [urgent, setUrgent] = useState(false)
  const [assignee, setAssignee] = useState('')
  const [priority, setPriority] = useState('normal')
  const [due, setDue] = useState('')

  const load = async () => {
    const p = await apiGetProperties(); setProps(p); setPropertyId(p[0]?.id)
    setTasks(await apiGetTasks())
  }
  useEffect(()=>{ load() }, [])

  const add = async () => {
    if(!propertyId || !title) return
    await apiCreateTask({property_id: propertyId, title, description, urgent, status:'open', assignee, priority, due_date: due})
    setTitle(''); setDescription(''); setUrgent(false); setAssignee(''); setPriority('normal'); setDue('')
    setTasks(await apiGetTasks())
  }

  return (
    <div className="col">
      <div className="card">
        <h2 className="h1">Create Maintenance Task</h2>
        <div className="col" style={{maxWidth: 720}}>
          <label>Property</label>
          <select value={propertyId} onChange={e=>setPropertyId(Number(e.target.value))}>
            {props.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} />
          <label>Description</label><textarea value={description} onChange={e=>setDescription(e.target.value)} />
          <div className="row">
            <label className="row"><input type="checkbox" checked={urgent} onChange={e=>setUrgent(e.target.checked)} /> Urgent</label>
            <label>Priority
              <select value={priority} onChange={e=>setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </label>
            <label>Due
              <input value={due} onChange={e=>setDue(e.target.value)} placeholder="YYYY-MM-DD" />
            </label>
            <label>Assignee
              <input value={assignee} onChange={e=>setAssignee(e.target.value)} placeholder="Vendor/Tech name or email" />
            </label>
          </div>
          <button className="btn primary" onClick={add}>Add</button>
        </div>
      </div>
      <div className="list">
        {tasks.map(t=>(
          <div className="card" key={t.id}>
            <div className="h1">{t.title}</div>
            <div>#{t.property_id} • {t.status} {t.urgent ? '• 🔥' : ''} • {t.priority} {t.due_date ? '• due ' + t.due_date : ''}</div>
            <div>{t.assignee ? 'Assigned to: ' + t.assignee : ''}</div>
            <p style={{opacity:.8}}>{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
