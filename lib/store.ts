
'use client'
import { create } from 'zustand'
type Me = { id:number; email:string; name:string; plan:string } | null
type S = { me: Me, setMe: (m:Me)=>void }
const useS = create<S>(set=>({
  me: null,
  setMe: (m)=> set({me:m})
}))
export default useS
