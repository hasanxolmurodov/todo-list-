import React,{useEffect, useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai'
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription] =useState("");
  const [completedTodos,setCompletedTodos]=useState([]);


  const handleAddTodo= ()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    };
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };
  const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  };

  const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=' '+dd+'-'+mm+'-'+yyyy+' at '+h+':'+m+':'+s;

    let filteredItem={
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  }

  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)
  };

  useEffect(()=>{
     let savedTodo=JSON.parse(localStorage.getItem('todolist'));
     let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));
     if(savedTodo){
      setTodos(savedTodo);
     }
     if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
     }
  },[])
  return (
    <div className="App">
      <h1> Vazifa Listlarim</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Nomi</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} 
            placeholder="Vazifa nomi nima?"/>
          </div>
          <div className='todo-input-item'>
            <label>Tavsifi</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}
             placeholder="Vazifa tavsifi nima?"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className="primaryBtn">Qo'shish</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`isCompleteScreen ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Bajarish</button>
          <button className={`isCompleteScreen ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)   }>Yakunlash</button>
        </div>
        <div className='todo-list'>

          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>            
              <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>

          <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title="O'chirish?"/>
            <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title="Yakunlash?"/>
          </div>
        </div>
            )
          })}
          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>            
              <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Yakunlandi:{item.completedOn}</small></p>
          </div>

          <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title="O'chirish?"/>
          </div>
        </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
