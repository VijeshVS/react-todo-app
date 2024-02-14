

export function Todos(props){
    return <div>
        {
        props.todos.map((todo,index)=>{
            return <div key = {todo.id}>
                <h2>{todo.title}</h2>
                <h3>{todo.description}</h3>
                <button onClick={
                    () =>{
                        const updatedTodo = [...props.todos];
                        if(updatedTodo[index].completed){
                            alert("Task is already completed!!")
                            return;
                        }
                        updatedTodo[index].completed = 1;
                        props.setTodo(updatedTodo)
                    }
                }>{todo.completed == 1?"Completed":"Mark as Complete"}</button>
                <button onClick={
                    ()=>{
                        const updatedTodo = props.todos.filter((t)=>{
                            if(todo.title != t.title || todo.description !=t.description){
                                return true
                            }
                        })

                        props.setTodo(updatedTodo)
                    }
                }>Remove Todo</button>
             </div>
        })}
    </div>
}