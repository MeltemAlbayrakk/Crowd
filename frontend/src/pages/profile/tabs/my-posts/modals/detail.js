import { useState, useEffect } from "react";
import Table from "../../../../../components/layout/table/table";
import api from "../../../../../services/api";

export default function DetailBox(props) {
  const {
    detailBoxVisibility,
    setDetailBoxVisibility,
    jobId
  } = props;

  const appliedMyPostDetailsHeadlines = [
    "FirstName",
    "LastName",
    "E-mail",
    "Offer",
    "Actions" 
  ];

  const [myPostDetail, setMyPostDetail] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (jobId) {
          console.log(jobId + " jobidddddddd");
          const resp = await api.job.jobdetails("company", jobId);

          const data = resp.map((item) => ({
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            offer: item.offer,
            actions: renderActions(item._id) 
          }));

          setMyPostDetail(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [jobId]);

  const renderActions = (applicantId) => {
    return (
      <div>
        <button id="accept" onClick={() => handleAccept(applicantId)}>Accept</button>
        <button id="reject"  onClick={() => handleReject(applicantId)}>Reject</button>
      </div>
    );
  };

  const handleAccept = async (applicantId) => {
    
      const resp = await api.applicant.setStatus("company", applicantId,"Accepted" );
      console.log("Accept button clicked for applicant ID:", applicantId);
    
  };
  

  const handleReject = async (applicantId) => {
    const resp = await api.applicant.setStatus("company", applicantId,"Rejected" );
    console.log("Accept button clicked for applicant ID:", applicantId);
  };

  return (
       
    <div className="wrapper">
    <div
          className={detailBoxVisibility ? "modal detailBox active" : "detailBox modal"}
          id="detailBox"
        >

         
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
              <Table headline={appliedMyPostDetailsHeadlines} data={myPostDetail} />
            </div>
          </div>
          </div>
      
   
  
  );
}
