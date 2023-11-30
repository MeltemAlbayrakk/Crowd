import Table from "../../../../components/layout/table/table";
import api from "../../../../services/api";
import { useState, useEffect } from "react";
import JobPosting from "../job-posting/job-posting";

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

  const [loading, setLoading] = useState(false);

  const appliedMyPostsHeadlines = [
    "Budget",
    "Category",
    "Deadline",
    "Description",
    
    "Title",
    "Edit",
  ];

  const editRow = (event) => {
    return <button onClick={() => setEditBoxVisibility(true)}>Delete</button>;
  };
  const detailRow = (event) => {
    return <button onClick={() => setDetailBoxVisibility(true)}>Detail</button>;
  };

 

  const [myPosts, setMyPosts] = useState([
    {
      budget: "",
      category: "",
      deadline: "",
      description: "",
 
   
      title: "",
      edit: editRow("Edit"),
      detail:detailRow("Detail")
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const resp = await api.job.get("company");

      const data = resp.map((item) => ({
        budget: item.budget,
        category: item.category,
        deadline: item.deadline,
        description: item.description,
        title: item.title,
        edit: deleteRow(item._id),
        detail:detailRow("Detail"),
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
  const deleteRow = (id) => {
    return <button onClick={() => deleteJob(id)}>Delete</button>;
};

  
  return (
   
    <div className="my__posts">
      <div className="title">My Posts</div>
      {<Table headline={appliedMyPostsHeadlines} data={myPosts} />}
      <div className="wrapper">
       <div class="container">
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
    </div>


    </div>
  );
}
