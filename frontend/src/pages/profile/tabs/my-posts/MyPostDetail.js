import Table from "../../../../components/layout/table/table";
import api from "../../../../services/api";
import { useState, useEffect } from "react";


import DetailBox from "./modals/detail";

export default function MyPostDetail(props) {
  
  const [detailBoxVisibility , setDetailBoxVisibility]=useState(false);

  const [firstName,setFirstName]= useState("");
    const [lastName,setlastName]= useState("");


  const [loading, setLoading] = useState(false);

  const appliedMyPostDetailsHeadlines = [
    "FirstName",
    "LastName",
   
    "Detail",
  ];

  
  const detailRow = (event) => {
    return <button onClick={() => setDetailBoxVisibility(true)}>Detail</button>;
  };

 

  const [myPostDetail, setMyPostDetail] = useState([
    {
      firstName: "",
      lastName: "",
    
      detail:detailRow("Detail")
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const resp = await api.job.get("company");

      const data = resp.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        
        detail:detailRow("Detail"),
      }));

      setMyPostDetail(data);
    };

    getData();
  }, []);

  return (
   
    <div className="myPostDetail">
      <div className="title">My Post Detail</div>
    
      <div className="wrapper">
       <div class="container">
        <div class= "profile__right">
          

<DetailBox
        detail={"Detail"}
        detailBoxVisibility={detailBoxVisibility}
        setDetailBoxVisibility={setDetailBoxVisibility}
       Table= {<Table headline={appliedMyPostDetailsHeadlines} data={myPostDetail} />}
        firstName={setFirstName}
        lastName={setlastName}
      
    
        loading={loading}
      />
    </div>
    </div>
    </div>


    </div>
  );
}
