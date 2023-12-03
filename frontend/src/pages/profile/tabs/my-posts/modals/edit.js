import { useState } from "react";
import Table from "../../../../../components/layout/table/table";
import React, { useEffect } from 'react';

import api from "../../../../../services/api";

export default function EditBox(props) {
  const {
    edit,
    editBoxVisibility,
    setEditBoxVisibility,
    budget,
    setBudget,
    category,
    setCategory,
    deadline,
    setDeadline,
    description,
    setDescription,
    status,
    setStatus,
    subcategory,
    setSubcategory,
    title,
    setTitle,
  } = props;


  const appliedMyPostsHeadlines = [
    "Budget",
    "Category",
    "Deadline",
    "Description",
    
    "Title",
  
  ];
  const editRow = (event) => {
    return <button onClick={() => setEditBoxVisibility(true)}>Edit</button>;
  };
  const [myPosts, setMyPosts] = useState([
    {
      budget: "",
      category: "",
      deadline: "",
      description: "",
 
   
      title: "",
  
     
    },
  ]);
  useEffect(() => {
    const getData = async () => {
      const resp = await api.job.get("company");

      const data = resp.map((item) => ({
        budget: item.budget,
        category: item.category,
        deadline: item.deadline,
        description: item.description,
 
        
        title: item.title,
       
       
      }));

      setMyPosts(data);
    };

    getData();
  }, []);

  return (
   
    
    <div class= "profile__right">
  <div className="container">
    <div
      className={editBoxVisibility ? "modal editBox active" : "editBox modal"}
      id="editBox"
    >
      <div className="wrapper">
      <div className="my__posts">
      <div className="title">Edit sayfasÄ±</div>
      <a
          className="close"

          onClick={() => {
            setEditBoxVisibility(false);
          }}
        >
          X
        </a>
        {<Table headline={appliedMyPostsHeadlines} data={myPosts} />}
        {/* <a className="logo">Edit</a>
        <form onSubmit={edit}></form>
        <div>
          <label>Budget</label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Deadline</label>
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Sub Category</label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>*/}
      </div> 
    </div>
    </div>
    </div>
    </div>
   
    
  );
}