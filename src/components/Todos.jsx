import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../../constant"; 
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';


export default function Todos() {
  const [todos, setTodos]=useState([]);
  const [title, setTitle]=useState("");
  const [editID, setEditId]=useState(null);
  const [updatedTitle, setUpdatedTitle]=useState("");

    
async function fetchTodos(){
  const response=  await axios.get(BASE_URL);
  console.log(response.data);
  setTodos(response.data);
}

async function addTodo(){
  if(!title) return alert("please enter valid title")
  await axios.post(BASE_URL, {title, completed:false});
  fetchTodos();
   toast.success("Task added successfully")
  setTitle("");

}

async function handleDelete(id){
 await axios.delete(`${BASE_URL}/${id}`);
 fetchTodos();
  toast.warning("Task deleted successfully")
}

async function handleToggle(id,status){
  await axios.put(`${BASE_URL}/${id}` , {
      title:todos.find((t) => t.id === id).title,
      completed:!status,});
  fetchTodos();
   toast.info("Task status changed" );
}

async function handleUpdate(id) {
   await axios.put(`${BASE_URL}/${id}` , {
    title:updatedTitle,
  
});
      setEditId(null);
      fetchTodos();
  
}

useEffect(()=>{
    fetchTodos();
},[]);

    

  return (
    <div style={{border: "20px solid yellow", padding:"50px"}}>
      <h1>ADD Todo's</h1>
      <div>
        <input value={title} type="text" placeholder="Enter the task" onChange={(e)=>setTitle(e.target.value)} style={{padding:"8px", }}></input>
        <button style={{backgroundColor:"lightGreen"}} onClick={addTodo}>ADD</button>
      </div>
      <h1>TO-DO-LIST</h1>
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"20px"}}>
      {todos.map((todo)=>(
        <div key={todo.id} style={{border:"1px solid black"}}> 
          <h2>{todo.title}</h2>

          {editID==todo.id && <input type='text' value={updatedTitle} onChange={(e)=> setUpdatedTitle(e.target.value)} />}

          <p>{todo.completed?"Completed":"Incomplete"}</p>
          <button onClick={()=>handleToggle(todo.id , todo.completed)}>{todo.completed?"Mark Incomplete": "Mark complete"}</button>
          <button style={{backgroundColor:"teal", color:"white", margin:"10px"}} onClick={()=>handleDelete(todo.id)}><Trash2 style={{ }}/></button>

          {editID==todo.id?
           (<button onClick={()=>handleUpdate(todo.id)} >Save</button>):
           (<button onClick={()=> {setEditId(todo.id); setUpdatedTitle(todo.title)}}>Edit</button>)}

        </div>
      ))}
      </div>
      
    </div>
  );
}
