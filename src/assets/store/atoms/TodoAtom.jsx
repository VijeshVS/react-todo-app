import { atom } from "recoil"


export const todoAtom = atom({
    key : 'todo',
    default : []
})

export const searchAtom = atom({
    key:'searchInput',
    default: ''
})
