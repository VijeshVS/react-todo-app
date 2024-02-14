import {useState} from "react";

export function RenderTodo(props){
    const [title,setTitle] = useState("")
    const [desc,setdesc] = useState("")

    return <div>
        <label style={{
            fontSize :20,
            color:"yellow",
            fontWeight : "bold"
        }}>Title</label>
        
        <input value = {title} style={
            {
                padding:10,
                margin:10,
                marginLeft:75
            }
        } type="text" onChange={
            (e)=>{
                setTitle(e.target.value)
            }
        }></input> <br />
        <label style={{
            fontSize :20,
            color:"yellow",
            fontWeight: "bold"
        }}>Description</label>
        <input value={desc} style={
            {
                padding:10,
                margin:10
            }
        } type="text" onChange={
            (e)=>{
                setdesc(e.target.value)
            }
        }></input> <br />
        <button
        onClick={
            ()=>{
                if(!title || !desc){
                    alert("Please fill the required fields")
                    return;
                }
                props.setTodo([...props.todo,{
                    id: Math.floor(Math.random()*1000),
                    title: title,
                    description: desc
                }])
                setTitle("")
                setdesc("")
            }
        } 
        style={
            {
                margin:10,
                padding:10
            }
        }>Add todo</button>
    </div>
}