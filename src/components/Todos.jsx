import {memo,useEffect,useState} from 'react'
import {Spinner} from './Spinner'
import axios from 'axios'   
import { backendUrl } from '../config'
import {notify} from '../utils/notify'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FcSearch } from "react-icons/fc";

export const Todos = memo(({update,setUpdate})=>{
    const [todos,setTodo] = useState([])
    const [load,setLoad] = useState(false)
    const [filter,setFilter] = useState("")

    const navigate = useNavigate();

    async function getTodos (){
        setLoad(true)
        try{
            const response = await axios.get(backendUrl+'/todos',{
                headers:{
                    Authorization : localStorage.getItem('token')
                }
            });
            console.log(response)
            setTodo(response.data.todos)
            setLoad(false)
    }
    catch(e){
        notify("User not authorized!!",'d');
        navigate('/')
    }
    }

    useEffect(()=>{
        getTodos();
    },[update])
    
    const removeTodo  = async (todo)=>{
        setLoad(true)
        console.log(todo)
        await axios.post(backendUrl + '/todos/delete',{
            todoId : todo.id
        })
        notify("Todo removed successfully !!",'s')
        setLoad(false)
        setUpdate(c => !c)
    }

    const completeTodo = async (todo) =>{
        if(todo.completed){
            notify("Task has already been completed!!",'d');
            return;
        }

        await axios.post(backendUrl+'/todos/update',{
            todoId: todo.id,
            completed: true
        })
        setUpdate(c=>!c)
    }

    const filterTodos = () =>{
        const new_todos = todos.filter((t)=>{
            const title = t.title.toLowerCase();
            const desc = t.description.toLowerCase();
            const lower = filter.toLowerCase();
            if(title.includes(lower) || desc.includes(lower)){
                return true;
            }
            else{
                return false;
            }
        })

        if(!filter)
            return todos

        return new_todos
    }

    const filteredTodos = filterTodos();

    return <div className='flex flex-col items-center py-5'>
        <div className="flex mt-4 mb-4 justify-center">
        <FcSearch className="text-3xl"/> <input value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder="Search Todos" className='ml-3 w-96 h-9 border-2 rounded-xl pl-2 text-md border-gray-400' type='text'/>
        </div> 
        <ToastContainer/>
        {load?<Spinner/>:<div></div>}
        {filteredTodos.map((todo)=>{
            return <div className='mt-10' key = {todo.id}>
                <h2 className='text-3xl font-bold text-center'>{todo.title}</h2>
                <h3 className='text-2xl text-center'>{todo.description}</h3>
                <button className='hover:scale-105 m-2 bg-violet-700 text-lg rounded-xl font-bold text-white w-44' onClick={()=>completeTodo(todo)}>{todo.completed == 1?"Completed":"Mark as Complete"}</button>
                <button className='hover:scale-105 bg-violet-700 text-lg rounded-xl font-bold text-white w-36' onClick={()=>removeTodo(todo)}>Remove Todo</button>
             </div>
        })}
    </div>
})