import Table from "../../../../components/layout/table/table";
import { useState, useEffect } from "react";
import api from "../../../../services/api";
import { useParams } from 'react-router-dom';


export default function AppliedBids(props) {
  const { id } = useParams();
  const appliedBidsHeadlines = [
    "Name",
    "Category",
    "Estimated Time",
    "Freelancer Estimated Budget",
    "Status",
  ];
 const [loading, setLoading] = useState(false);


  const getApplicant=async(id)=>{

    setLoading(true);
    try{

      const user=await api.user.profile.get(id)
      console.log("user:",user._id)
      const resp=await api.applicant.get("personal")
      console.log("resp degeri:",resp)
      console.log("allahım sabır ver")
  } catch (error) {
    console.error("Error fetching jobs:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(()=>{
    
   getApplicant(id);
  },[])

  const appliedBidsData = [
    {
      name: "Name",
      category: "Category",
      
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name",
      category: "Category",
      
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name",
      category: "Category",
      
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name",
      category: "Category",
      
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name121",
      category: "Category",
      
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
  ];

  return (
    <div className="applied__bids">
      <div className="title">Valid Bids</div>
      {<Table data={appliedBidsData} headline={appliedBidsHeadlines} />}
    </div>
  );
}