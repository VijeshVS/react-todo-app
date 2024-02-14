import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RenderTodo } from './components/RenderTodo'
import { Todos } from './components/Todos'
import { Title } from './components/Title'

function App() {
  const [todo,setTodo] = useState([])

  useEffect(()=>{

      const work = async ()=>{
      const response = await fetch('http://todo-backed/todos')
      const todos = await response.json()
      setTodo(todos)
    }
    work();
  },[])
  
  return (
    <div>
      <Title/>
      <RenderTodo todo = {todo} setTodo = {setTodo}> </RenderTodo>
      <Todos setTodo = {setTodo} todos={todo}></Todos>
    </div>
  )
}

export default App
