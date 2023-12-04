import { useState, useEffect } from "react";
import Table from "../../../../../components/layout/table/table";
import api from "../../../../services/api";
export default function DetailBox(props) {
  const {
    detailBoxVisibility,
    setDetailBoxVisibility,
    jobId // Job ID from MyPosts component
  } = props;

  const appliedMyPostDetailsHeadlines = [
    "FirstName",
    "LastName",
    "E-mail",
    "Offer"
  ];

  const [jobDetails, setJobDetails] = useState({
    firstName: "",
    lastName: "",
    //email: "",
    offer: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(jobId);
        const response = await api.job.jobdetails("company", jobId);
        console.log(response); 
        setJobDetails({
          firstName: response.firstName || "",
          lastName: response.lastName || "",
          offer: response.offer || ""
        });
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
  
    if (detailBoxVisibility) {
      fetchData();
    }
  }, [detailBoxVisibility, jobId]);
  return (
    <div className={detailBoxVisibility ? "modal detailBox active" : "detailBox modal"} id="detailBox">
      <div className="wrapper">
        <div className="my__posts">
          <div className="title">Job Details</div>
          <a className="close" onClick={() => setDetailBoxVisibility(false)}>X</a>
          <Table headline={appliedMyPostDetailsHeadlines} data={[jobDetails]} />
          {/* Or use the jobDetails object to display data */}
          {/* For example: */}
          {/* <p>First Name: {jobDetails.firstName}</p> */}
          {/* <p>Last Name: {jobDetails.lastName}</p> */}
          {/* <p>E-mail: {jobDetails.email}</p> */}
          {/* <p>Offer: {jobDetails.offer}</p> */}
        </div>
      </div>
    </div>
  );
}
