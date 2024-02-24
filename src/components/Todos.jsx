import {memo} from 'react'

import { useRecoilState } from 'recoil'
import {todoAtom} from '../assets/store/atoms/TodoAtom'


export const Todos = memo((props)=>{
    const [todos,setTodo] = useRecoilState(todoAtom)

    return <div>
        
        {
        todos.map((todo,index)=>{
            return <div key = {todo.id}>
                <h2>{todo.title}</h2>
                <h3>{todo.description}</h3>
                <button onClick={
                    () =>{
                        const updatedTodo = [...todos];
                        if(updatedTodo[index].completed){
                            alert("Task is already completed!!")
                            return;
                        }
                        setTodo((oldTodo)=>{
                            const newTodos = [...oldTodo];
                            newTodos[index] = {...newTodos[index],completed:true};
                            return newTodos
                        })
                        
                    }
                }>{todo.completed == 1?"Completed":"Mark as Complete"}</button>
                <button onClick={
                    ()=>{
                        const updatedTodo = todos.filter((t)=>{
                            if(todo.title != t.title || todo.description !=t.description){
                                return true
                            }
                        })

                        setTodo(updatedTodo)
                    }
                }>
                    Remove Todo</button>
             </div>
        })}
    </div>
})