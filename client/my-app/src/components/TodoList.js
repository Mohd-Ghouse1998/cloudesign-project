import React, { useState } from "react";
import App from "../App";

 const Todolist = () => {

  const [createTask ,setCreateTask]=useState({
      title:"",
      description:"",
      status:""
  })

  

  const handleInput=(e)=>{
      const name=e.target.name
      const value=e.target.value

      setCreateTask({...createTask , [name]:value})
  }

  const postData=async (e)=>{
    e.preventDefault()
    const {title,description,status}=createTask
    const res=await fetch("http://localhost:5000/create",{
      method:"post",
      headers:{
        // 'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        title,description,status
      })
    })
    const data=await res.json()
    if(data.status===400 ||!data){
      window.alert("please provide details")
    }else{
      window.alert("teask created successfully")

    

    }

  }


  
  






  return (
    <>
       <div className="form">
           <form method="post">
      <div className="title">TodoList</div>
     
      <div className="input ic1">
        <input  className="input"  type="text" name="title" id="title" value={createTask.title} onChange={handleInput} placeholder="Title" />
        
       
      </div>
      <div className="input ic2">
        <input  className="input"  type="text" name="description" id="description" value={createTask.description} onChange={handleInput} placeholder="Description" />
        
       
      </div>
      <div className="input ic2" >
       
        <input   type="radio" name="status" value="Open" id="status"  onChange={handleInput} /> Open 
      
        <input   type="radio" name="status" value="In-Progress" id="status"  onChange={handleInput} /> In-Progress
        
        <input   type="radio" name="status" value="Completed" id="status"  onChange={handleInput} />Completed
        
       
      </div>
      <button type="text" onClick={postData}  className="submit">submit</button>
     
     
      </form>
    </div>
    </>
      

  );
};

export default Todolist
