import { useState } from "react";


export default function ShowAI(props){


    const {jobId}=useState(null);
    const [loading, setLoading] = useState(false);
   
  
   console.log("ShowAI içiii")
    const profilData= props.ShowAI;



return(

    <>
    <div class="wrapper">

      <div class="container">
    
    <div>
    <label>Başlangıç Ayı</label>
   <input
     type ="text">
   </input>
   
   </div>
     
   <div>
    <label>Job Title</label>
   <input
     type ="text">
   </input>
   
   </div>
   </div>
   </div>

   </>
);
}