import {memo,useMemo} from 'react'

import { useRecoilState,useRecoilValue } from 'recoil'
import {searchAtom, todoAtom} from '../assets/store/atoms/TodoAtom'


export const Todos = memo(()=>{
    const [todos,setTodo] = useRecoilState(todoAtom)
    const filterString = useRecoilValue(searchAtom)
    
    const removeTodo  = (todo)=>{
        const updatedTodo = todos.filter((t)=>{
            if(todo.title != t.title || todo.description !=t.description){
                return true
            }
        })
        setTodo(updatedTodo)
    }

    const completeTodo = (todo) =>{
        const updatedTodo = [...todos];
        for(let i = 0;i<updatedTodo.length;i++){
            if(updatedTodo[i].id == todo.id){
                updatedTodo[i] = {...updatedTodo[i],completed:1}
            }
        }
        setTodo(updatedTodo)
    }

    function filterTodos(todos){
        let filterFinal = filterString.trim();
        if(filterFinal == ''){
            return todos
        }
        let ans = []
        todos.map((todo)=>{
            if((todo.title).toLowerCase().includes(filterFinal.toLowerCase()) || todo.description.toLowerCase().includes(filterFinal.toLowerCase())){
                console.log(filterFinal)
                ans.push(todo)
            }
        })
        return ans
    }
    const filteredTodos = filterTodos(todos);

    return <div className='flex flex-col items-center py-5'>
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