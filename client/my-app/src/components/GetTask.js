import React, { useEffect, useState } from "react";
import axios from 'axios'

const GetTask=()=>{

const[list, setList]=useState([])

const useEffect=(()=>{
    axios.get('http://localhost:5000/getTask')
    .then(res=>{
        console.log(res)
        setList(res.data.getData)
    })
})

return(

<div >
    {   
        list.map((post)=>{
            return(
            <div key={post._id} className="getTask">
            <p >{post.title}</p>
            <p>{post.description}</p>
            <p>{post.status}</p>
            </div>
            )
        })}
        <button type="text" onClick={useEffect}  className="submit">GetData</button>
    
    
</div>

)



}

export default GetTask