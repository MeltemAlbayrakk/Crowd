import { useState, useEffect } from "react";
import Table from "../../../../../components/layout/table/table";
import api from "../../../../../services/api";

export default function DetailBox(props) {
  const {
    detailBoxVisibility,
    setDetailBoxVisibility,
    jobId,
  } = props;

  const appliedMyPostDetailsHeadlines = [
    "FirstName",
    "LastName",
    "E-mail",
    "Offer",
    "Actions", 
    "Profile"
  ];

  const [myPostDetail, setMyPostDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(true);
  const [selecteduserId, setSelecteduserId] = useState(null); // Seçilen işin kimliği

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
            actions: renderActions(item._id) ,
            profile: goProfile(item.userId) ,
            setSelecteduserId:item.userId
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

  const goProfile = (userId) => {
    return (
      <div>
        <button id="profile"onClick={() => getProfile(userId)}>Profile</button>
      </div>
    );
  };

  const getProfile = async (userId) => {
    setLoading(true)
      const resp = await api.user.profile.get(userId);

    setLoading(false)
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
              

              <box
        
         // Seçilen işin kimliğini detay kutusuna aktar
         userId=  {selecteduserId}     
      />



            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
