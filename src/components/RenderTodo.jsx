import {useState,memo} from "react";
import { backendUrl } from "../config";
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { notify } from "../utils/notify";
import { useNavigate } from "react-router-dom";

export const RenderTodo = memo(({setUpdate})=>{
    const [title,setTitle] = useState("")
    const [desc,setdesc] = useState("")
    const navigate = useNavigate();

    function logout(){
        localStorage.setItem('token',"")
        notify("User logged out successfully!!",'d')
        navigate('/')
    }

    const updateTodos = async ()=>{
        await axios.post(backendUrl+'/todos',{
                title:title,
                description:desc
            },{
            headers:{
                authorization : localStorage.getItem('token')
            }
        })
        setUpdate(c=>!c)
        setTitle("")
        setdesc("")
    }

    return <div className="flex flex-col h-fit items-center">
        <ToastContainer/>
        <button onClick={logout} className="m-4 hover:scale-105 self-end font-bold text-white w-20 h-7 bg-black rounded-xl">Logout</button>
        <h1 className="text-3xl mt-8 font-bold text-red-700">My Todos</h1>
        <input value = {title} placeholder="Enter the title"
        type="text" className='mt-10 w-96 h-9 border-2 rounded-xl pl-2 text-md border-gray-400' onChange={(e)=>setTitle(e.target.value)}></input><br/>
        <input value={desc}  placeholder="Enter the description"
        type="text" className='w-96 h-9 border-2 rounded-xl pl-2 text-md border-gray-400' onChange={(e)=>setdesc(e.target.value)}></input> <br />
        <button className='rounded-xl w-20 h-9 hover:scale-110 bg-black text-white font-bold text-sm'
        onClick={updateTodos}>Add todo</button>
    </div>
})
