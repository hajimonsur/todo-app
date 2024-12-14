import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/reducer/toDoSlice';
import { useDispatch, useSelector } from 'react-redux';
const ToDo = () => {
    const dispatch = useDispatch();
    const toDo = useSelector((state) => state.toDo.toDoList);
    
    const [task, setTask] = useState('')
    

    // handle complete button
    const handleComplete = (id) => {
        dispatch(toggleTodo(id));
    }
   
    

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prevent adding empty tasks
        if (!task.trim()) return;
        dispatch(addTodo(task));
        console.log(task);
       
        setTask('');
    }

    // handle edit
    const handleEdit = (id, newText) => {
        dispatch(editTodo({ id, newText }));
      };


  
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
           {/* <div><Button variant="warning" onClick={() => handleEdit(todo.id, prompt('Enter new text'))} style={styles.btn}>Edit</Button></div> */}
           <div>
  <Button
    variant="warning"
    onClick={() => {
      const newText = prompt('Enter new text', todo.text); // Pre-fill with the current text
      if (newText && newText.trim()) {
        handleEdit(todo.id, newText.trim());
      }
    }}
    style={styles.btn}
  >
    Edit
  </Button>
</div>

         </div>
         </li>
       </div>
      ))}
    </ol>
    </div>
    </div>
    
  )
}

// export default ToDo
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useState } from "react";
// import { addTodo, toggleTodo, deleteTodo, editTodo } from "../redux/reducer/toDoSlice";
// import { useDispatch, useSelector } from "react-redux";

// const ToDo = () => {
//   const dispatch = useDispatch();
//   const toDo = useSelector((state) => state.toDo.toDoList);

//   const [task, setTask] = useState("");
//   const [editId, setEditId] = useState(null); // ID of the task being edited
//   const [editText, setEditText] = useState(""); // Current text for the task being edited

//   // Add Task
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!task.trim()) return;
//     dispatch(addTodo(task));
//     setTask("");
//   };

//   // Toggle Complete
//   const handleComplete = (id) => {
//     dispatch(toggleTodo(id));
//   };

//   // Start Editing
//   const handleEdit = (id, currentText) => {
//     setEditId(id);
//     setEditText(currentText);
//   };

//   // Save Edited Task
//   const handleSaveEdit = () => {
//     if (!editText.trim()) return; // Prevent empty edits
//     dispatch(editTodo({ id: editId, newText: editText }));
//     setEditId(null); // Clear edit state
//     setEditText("");
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setEditId(null);
//     setEditText("");
//   };

//   const styles = {
//     container: {
//       justifyContent: "center",
//       width: "50%",
//       alignItems: "center",
//     },
//     todo: {
//       border: "2px solid black",
//       borderRadius: "20px",
//       padding: "35px",
//       margin: "15px",
//       width: "100%",
//     },
//     btn: {
//       width: "100px",
//       height: "40px",
//       padding: "5px",
//       margin: "5px",
//     },
//     rowBtn: {
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//     },
//   };

//   return (
//     <div>
//       <div className="container mt-5" style={styles.container}>
//         <h1>Add A New Task</h1>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-5" controlId="task">
//             <Form.Label>Task</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Task"
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Add Task
//           </Button>
//         </Form>

//         <h2 className="mt-5">Task List</h2>
//         <ol>
//           {toDo.map((todo) => (
//             <li style={styles.todo} key={todo.id}>
//               {editId === todo.id ? (
//                 <div>
//                   <Form.Control
//                     type="text"
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     placeholder="Edit your task"
//                   />
//                   <Button
//                     variant="success"
//                     onClick={handleSaveEdit}
//                     style={styles.btn}
//                   >
//                     Save
//                   </Button>
//                   <Button
//                     variant="secondary"
//                     onClick={handleCancelEdit}
//                     style={styles.btn}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               ) : (
//                 <div>
//                   {todo.text}
//                   <div style={styles.rowBtn}>
//                     <Button
//                       variant={todo.completed ? "success" : "danger"}
//                       onClick={() => handleComplete(todo.id)}
//                       style={styles.btn}
//                     >
//                       {todo.completed ? "Done" : "Not Done"}
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => dispatch(deleteTodo(todo.id))}
//                       style={styles.btn}
//                     >
//                       Delete
//                     </Button>
//                     <Button
//                       variant="warning"
//                       onClick={() => handleEdit(todo.id, todo.text)}
//                       style={styles.btn}
//                     >
//                       Edit
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default ToDo;
