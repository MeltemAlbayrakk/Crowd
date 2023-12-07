import { useState, useEffect } from "react";
import Table from "../../../../../components/layout/table/table";
import api from "../../../../../services/api";
import { useNavigate } from 'react-router-dom';


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
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(true);
  const [Profile, setProfile] = useState([]);
  const navigate = useNavigate();



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

  const showProfile = async ()=>{
  /*   const Profile = await api.user.profile.get("65590d6087e8c71e81e39160");
    console.log("Profil value:",Profile.lastName) */
    navigate('/showProfile', { state: { Profile} });
   }

  const renderActions = (applicantId) => {
    return (
      <div>
        <button onClick={() => showProfile()} >Show Profile</button>
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
 