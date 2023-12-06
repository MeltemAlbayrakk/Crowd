import { useState, useEffect } from "react";
import Table from "../../../../../components/layout/table/table";
import api from "../../../../../services/api";

export function CrowdIsDetay() {
  const [offer, setOffer] = useState('');
  const [job, setJob] = useState({});

  useEffect(() => {
      async function get(id){
          const data = await api.job.get(id);
          setJob(data.data);
      }
      get();
  }, []);
}


export default function  DetailBox(props) {
  const {
    detailBoxVisibility,
    setDetailBoxVisibility,
    jobId
  } = props;

  const appliedMyPostDetailsHeadlines = [
    "Title",
    "Category",
    "FirstName",
    "LastName",
    "E-mail",
    "Offer",
    "Actions" 
  ];

  const [myPostDetail, setMyPostDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        if (jobId) {
          console.log(jobId + " jobidddddddd");
          const resp = (await api.job.jobdetails("company",jobId)).filter(job=>job.status==="Pending");
          if(resp.length==0){
           
            setResp(false);
          }
          console.log("BU RESPPP:",resp)

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
        <button id="accept"onClick={() => handleAccept(applicantId)}>Accept</button>
        <button id="reject"onClick={() => handleReject(applicantId)}>Reject</button>
      </div>
    );
  };

  const handleAccept = async (applicantId) => {
    setLoading(true)
      const resp = await api.applicant.setStatus("company", applicantId,"Accepted" );
      console.log("Accept button clicked for applicant ID:", applicantId);

    setLoading(false)
  };
  

  const handleReject = async (applicantId) => {
    const resp = await api.applicant.setStatus("company", applicantId,"Rejected" );
    console.log("Accept button clicked for applicant ID:", applicantId);
  };

  const renderActions = (applicantId) => {
    return (
      <div>
        <button id="accept"onClick={() => handleAccept(applicantId)}>Accept</button>
        <button id="reject"onClick={() => handleReject(applicantId)}>Reject</button>
      </div>
    );
  };

  const handleAccept = async (applicantId) => {
    setLoading(true)
      const resp = await api.applicant.setStatus("company", applicantId,"Accepted" );
      console.log("Accept button clicked for applicant ID:", applicantId);

    setLoading(false)
  };
  

  const handleReject = async (applicantId) => {
    const resp = await api.applicant.setStatus("company", applicantId,"Rejected" );
    console.log("Accept button clicked for applicant ID:", applicantId);
  };

  const selectedJobDetail = myPostDetail.find((item) => item.title === title);
  return (
    
    <div class= "profile__right">
    <div className="container">
      

   <div
     className={detailBoxVisibility ? "modal detailBox active" : "detailBox modal"}
     id="detailBox"
   >
     <div className="wrapper">
     <div class= "profile__right">
     <div className="my__posts">
   <div className="title">My Post Details</div>
              <a
                className="close"
                onClick={() => {
                  setDetailBoxVisibility(false);
                }}
              >
                X
              </a>
              
              {resp?<Table 
              loading={loading}
              headline={appliedMyPostDetailsHeadlines} data={myPostDetail} />:<div className="nodata">No data found!</div>}
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
