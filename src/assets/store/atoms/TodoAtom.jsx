import { atom } from "recoil"
import axios from 'axios'
import {backendUrl} from '../../../config'

export const todoAtom = atom({
    key : 'todo',
    default : []
})

export const searchAtom = atom({
    key:'searchInput',
    get : async ({get})=>{
        const response = await axios.get('')
    }
})
