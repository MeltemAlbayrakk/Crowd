import React, { useState, useEffect } from "react";
import api from "../../../../services/api";

export default function Freelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [skills, setSkills] = useState([]);

  const getFreelancers = async () => {
    try {
      const res = await api.freelancer.get("personal");
      let allSkills = [];

      
      res.forEach((element) => {
        element.skills.forEach((aaa) => {
          //console.log(aaa);
          allSkills.push(aaa);
        });
      });

      //console.log("Skills:",allSkills)
      setFreelancers(res);
      setSkills(allSkills);


    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }
  };

  useEffect(() => {
    getFreelancers();
  }, []); 

  return (
    <div className="freelancers">
      <div className="freelancersheader title">Freelancers</div>

      <ul className="freelancerslist">
        {freelancers.map((freelancer) => (
          <li className="freelancerslistitem" key={freelancer.id}>
            <div className="freelancerslistname">
              {freelancer.firstName + " " + freelancer.lastName}
            </div>

            <ul className="freelancerslistskills">
      {freelancer.skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}