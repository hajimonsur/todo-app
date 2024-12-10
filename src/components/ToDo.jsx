import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/reducer/toDoSlice';
import { useDispatch, useSelector } from 'react-redux';
const ToDo = () => {
    const dispatch = useDispatch();
    const toDo = useSelector((state) => state.toDo.toDoList);
    
    const [task, setTask] = useState([])
    

    // handle complete button
    const handleComplete = (id) => {
        dispatch(toggleTodo(id));
    }
   
    

    // handle submit
    const handleSubmit = (e) => {
      console.log(toDo);
        e.preventDefault();
        dispatch(addTodo(task));
        console.log(task);
       
        setTask('');
    }
   
const styles = {
    container: {
        
        justifyContent: 'center',
        width: '50%',
        alignItems: 'center',
    },
    todo: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        border: "2px solid black",
        borderRadius: "20px",
        padding: "35px",
        margin: '15px',
        width: '100%',

        },

        btn: {
            width: '100px',
            height: '40px',
            padding: '5px',
            margin: '5px',
           
        },

        rowBtn: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

       

   
}

  return (

    <div>
        <div className='container mt-5' style={styles.container}>
          <h1>Add A New Task</h1>
    
          <Form  onSubmit={handleSubmit}>
      <Form.Group className="mb-5" controlId="task">
        <Form.Label>Task</Form.Label>
        <Form.Control type="text" placeholder="Enter Task" 
        
        value={task}
        onChange={(e) => setTask(e.target.value)}
        />
      </Form.Group>
     
      <Button variant="primary" type="submit" >
        Add Task
      </Button>
    </Form>
    <h2 className="mt-5">Task List</h2>
    <ol  >
      {toDo.map((todo) => (
       <div  >
         <li style={styles.todo} key={todo.id}>{todo.text} 
            
         <div style={styles.rowBtn}>
         <div>
           {todo.completed ? <Button variant="success" onClick={() => handleComplete(todo.id)} style={styles.btn}>Done</Button> : <Button variant="danger" onClick={() => handleComplete(todo.id)} style={styles.btn} >Not Done</Button>}
           </div>
           <div><Button variant="danger" onClick={() => dispatch(deleteTodo(todo.id))} style={styles.btn}>Delete</Button></div>
           {/* <div><Button variant="warning" onClick={() => dispatch(editTodo({id: todo.id, newText: todo.text}))} style={styles.btn}>Edit</Button></div> */}
         </div>
         </li>
       </div>
      ))}
    </ol>
    </div>
    </div>
    
  )
}

export default ToDo