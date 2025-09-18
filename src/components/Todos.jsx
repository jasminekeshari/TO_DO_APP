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
    <div style={{border: " ", padding:"20px"}}>
      <h1>TO-DO-APP📝</h1>
      <hr/>
      <h2 style={{color:"green"}}>ADD YOUR TASK HERE</h2>
      <div style={{border:"", padding:"10px"}}>
        <input value={title} type="text" placeholder="Enter the task..." onChange={(e)=>setTitle(e.target.value)} style={{padding:"8px",height:"20px", width:"250px"}}></input>
        <button style={{backgroundColor:"lightGreen"}} onClick={addTodo}>ADD</button>
      </div>
      <br/>
      <hr/>
      <h2>YOUR TO-DO-LIST📃</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"20px",padding:"20px", margin:"0px"}}>
      {todos.map((todo)=>(
        <div key={todo.id} style={{border:"1px solid black"}}> 
          <h2>🎯{todo.title}</h2>

          {editID==todo.id && <input type='text' value={updatedTitle} onChange={(e)=> setUpdatedTitle(e.target.value)} />}

          <p style={{color:todo.completed?"green":"red"}}>{todo.completed?"Completed✅":"Incomplete❌"}</p>
          <button style={{border:"3px solid yellow"}} onClick={()=>handleToggle(todo.id , todo.completed)}>{todo.completed?"Mark-Incomplete": "Mark-Complete"}</button>
          <button style={{backgroundColor:"teal", color:"white", margin:"10px"}} onClick={()=>handleDelete(todo.id)}><Trash2 style={{ }}/></button>

          {editID==todo.id?
           (<button onClick={()=>handleUpdate(todo.id)} >Save</button>):
           (<button  style={{border:"0.5px solid grey"}} onClick={()=> {setEditId(todo.id); setUpdatedTitle(todo.title)}}>Edit🖋️</button>)}

        </div>
      ))}
      </div>
      
    </div>
  );
}
