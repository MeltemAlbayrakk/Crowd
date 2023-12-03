import { useState } from "react";
import Table from "../../../../../components/layout/table/table";
import React, { useEffect } from 'react';

import api from "../../../../../services/api";

export default function DetailBox(props) {
  const {
    detail,
    detailBoxVisibility,
    setDetailBoxVisibility,
    firstName,
    setFirstName,
   lastName,
    setLastName
    
  
  } = props;

  const appliedMyPostDetailsHeadlines = [
    "FirstName",
    "LastName",
    "budget",
    
  
  ];
  const detailRow = (event) => {
    return <button onClick={() => setDetailBoxVisibility(true)}>Detail</button>;
  };


  const [myPostDetail, setMyPostDetail] = useState([
    {
      firstName: "",
      lastName: "",
    
    
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const resp = await api.job.get("company");

      const data = resp.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        
      
      }));

      setMyPostDetail(data);
    };

    getData();
  }, []);

  return (
   
    <div class= "profile__right">
  <div className="container">
   
    <div
      className={detailBoxVisibility ? "modal detailBox active" : "detailBox modal"}
      id="detailBox"
    >
      <div className="wrapper">
      <div className="my__posts">
    <div className="title">My Post Detay</div>
        <a
          className="close"

          onClick={() => {
            setDetailBoxVisibility(false);
          }}
        >
          X
        </a>
         {<Table headline={appliedMyPostDetailsHeadlines} data={myPostDetail} />}
        {/* <a className="logo">Detail</a>
        <form onSubmit={detail}></form>
        <div>
          <label>FirstName</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>LastName</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        
       
      </div> */}
    </div>
    </div>
    </div>
    </div>
    </div>
   
   
    
  );
}