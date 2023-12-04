import Table from "../../../../components/layout/table/table";
import api from "../../../../services/api";
import { useState, useEffect } from "react";
import JobPosting from "../job-posting/job-posting";
import { useParams } from 'react-router-dom';
import EditBox from "./modals/edit";
import DetailBox from "./modals/detail";

export default function MyPosts(props) {
  const [editBoxVisibility, setEditBoxVisibility] = useState(false);
  const [detailBoxVisibility , setDetailBoxVisibility]=useState(false);

  const [firstName,setFirstName]= useState("");
    const [lastName,setlastName]= useState("");


  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const appliedMyPostsHeadlines = [
    "Title",
    "Category",
    "Description",
   

    "Deadline",

    "Budget",
 
    "Edit",
  ];

  const editRow = (event) => {
    return <button onClick={() => setEditBoxVisibility(true)}>Delete</button>;
  };
  const detailrow = (event) => {
    return <button onClick={() => setDetailBoxVisibility(true)}>Detail</button>;
  };

 

  const [myPosts, setMyPosts] = useState([
    {  title: "",
    category: "",
    description: "",
    
      
      deadline: "",
     
      budget: "",
   
    
      edit: editRow("Edit"),
      detail:detailrow("Detail")
    },
  ]);

  useEffect(() => {
    const getData = async () => {

      // const user = await api.user.profile.get(id);
      const resp = (await api.job.get("company"))
      // .filter(job => {
      //   console.log("owner id",job.jobOwnerId)
      //   return job.jobOwnerId === user._id;
   
   

      const data = resp.map((item) => ({
        title: item.title,
        category: item.category,
        description: item.description,
        
        
        deadline: item.deadline,
        budget: item.budget,
       
        edit: deleteRow(item._id),
        detail:detailRow(item._id)  ,
        
      }));

      setMyPosts(data);
    };

    getData();
  }, []);

  const deleteJob = async (id) => {
    setLoading(true);
    console.log("id degeri:",id)
    await api.job.delete("company", id);
/*     props.getProfile();
 */    setLoading(false);
  };

  const detailJob = async (id) => {
    setLoading(true);
    console.log("id  details degeri:",id)
    await api.job.jobdetails("company", id);
/*     props.getProfile();
 */    setLoading(false);
  };
  const deleteRow = (id) => {
    return <button onClick={() => deleteJob(id)}>Delete</button>;
};
const detailRow = (id) => {
  return <button onClick={() => detailJob(id)}>detail</button>;
};
  
  return (
   
    <div className="my__posts">
      <div className="title">My Posts</div>
      {<Table headline={appliedMyPostsHeadlines} data={myPosts} />}
      
        <div class= "profile__right">
          
          
      <EditBox
        edit={"Delete"}
        editBoxVisibility={editBoxVisibility}
        setEdittBoxVisibility={setEditBoxVisibility}

        
      
        />
       
<DetailBox
        detail={"Detail"}
        detailBoxVisibility={detailBoxVisibility}
        setDetailBoxVisibility={setDetailBoxVisibility}
        firstName={setFirstName}
        lastName={setlastName}
      
    
        loading={loading}
      />
    </div>
    </div>
   



  );
}