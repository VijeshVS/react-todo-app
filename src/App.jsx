import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RenderTodo } from './components/RenderTodo'
import { Todos } from './components/Todos'
import { Title } from './components/Title'

function App() {

  const [todo,setTodo] = useState([])

  return (
    <div>
      <Title/>
      <RenderTodo todo = {todo} setTodo = {setTodo}> </RenderTodo>
      <Todos setTodo = {setTodo} todos={todo}></Todos>
    </div>
  )
}

export default App
