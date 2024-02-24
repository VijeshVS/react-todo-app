import {useState,memo, useContext} from "react";
import { useRecoilState } from "recoil";
import { todoAtom } from "../assets/store/atoms/TodoAtom";


export const RenderTodo = memo(()=>{
    const [title,setTitle] = useState("")
    const [desc,setdesc] = useState("")
    const [todo,setTodo] = useRecoilState(todoAtom)

    return <div>

        <label style={{fontSize :20,color:"yellow",fontWeight : "bold"}}>Title</label>
        
        <input value = {title} style={{padding:10,margin:10,marginLeft:75,width:250,fontSize:17}} type="text" 
        onChange={(e)=>setTitle(e.target.value)}></input><br/>
        <label style={{fontSize :20,color:"yellow",fontWeight: "bold"}}>Description</label>
        <input value={desc} style={{padding:10,margin:10,width:250,fontSize:17}} type="text" 
        onChange={(e)=>setdesc(e.target.value)}></input> <br />
        <button
        onClick={
            ()=>{
                if(!title || !desc){
                    alert("Please fill the required fields")
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
        } 
        style={{margin:10,padding:10}}>Add todo</button>
    </div>
})
