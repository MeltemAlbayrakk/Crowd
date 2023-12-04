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
    "Offer"
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
            offer: item.offer
          }));
  
          setMyPostDetail(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getData();
  }, [jobId]); 
  return (
    <div className="profile__right">
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
              <Table headline={appliedMyPostDetailsHeadlines} data={myPostDetail} />
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
