import {memo,useMemo} from 'react'

import { useRecoilState,useRecoilValue } from 'recoil'
import {searchAtom, todoAtom} from '../assets/store/atoms/TodoAtom'


export const Todos = memo(()=>{
    const [todos,setTodo] = useRecoilState(todoAtom)
    const filterString = useRecoilValue(searchAtom)

    function filterTodos (todos){
       
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

    return <div>
        
        {
        filteredTodos.map((todo,index)=>{
            return <div key = {todo.id}>
                <h2>{todo.title}</h2>
                <h3>{todo.description}</h3>
                <button onClick={
                    () =>{
                        const updatedTodo = [...todos];
                        for(let i = 0;i<updatedTodo.length;i++){
                            if(updatedTodo[i].id == todo.id){
                                updatedTodo[i] = {...updatedTodo[i],completed:1}
                            }
                        }
                        setTodo(updatedTodo)
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