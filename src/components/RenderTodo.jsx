import {useState,memo, useContext} from "react";
import { useRecoilState } from "recoil";
import { todoAtom } from "../assets/store/atoms/TodoAtom";


export const RenderTodo = memo(()=>{
    const [title,setTitle] = useState("")
    const [desc,setdesc] = useState("")
    const [todo,setTodo] = useRecoilState(todoAtom)

    const updateTodos = ()=>{
        if(!title || !desc){
            //notify
            return;
        }
        setTodo([...todo,{
            id: Math.floor(Math.random()*1000),
            title: title,
            description: desc,
            completed: 0
        }])
        setTitle("")
        setdesc("")
    }

    return <div className="flex flex-col h-fit items-center">
        <h1 className="text-3xl font-bold text-red-700">My Todos</h1>
        <input value = {title} placeholder="Enter the title"
        type="text" className='mt-10 w-96 h-9 border-2 rounded-xl pl-2 text-md border-gray-400' onChange={(e)=>setTitle(e.target.value)}></input><br/>
        <input value={desc}  placeholder="Enter the description"
        type="text" className='w-96 h-9 border-2 rounded-xl pl-2 text-md border-gray-400' onChange={(e)=>setdesc(e.target.value)}></input> <br />
        <button className='rounded-xl w-20 h-9 hover:scale-110 bg-black text-white font-bold text-sm'
        onClick={updateTodos}>Add todo</button>
    </div>
})
