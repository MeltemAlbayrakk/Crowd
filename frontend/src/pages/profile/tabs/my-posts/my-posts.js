import Table from "../../../../components/layout/table/table";
import api from "../../../../services/api";
import { useState, useEffect } from "react";

import { useParams } from 'react-router-dom';
import EditBox from "./modals/edit";

export default function MyPosts(props) {
  const [editBoxVisibility, setEditBoxVisibility] = useState(false);

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
    return <button onClick={() => setEditBoxVisibility(true)}>Edit</button>;
  };

  const [myPosts, setMyPosts] = useState([
    {
      title: "",
      category: "",
      description: "",
      deadline: "",
      budget: "",
      edit: editRow("Edit"),
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const user = await api.user.profile.get(id);
      const apiResponse = await api.job.get("company");
      console.log("USERI ID:",user._id)
      console.log("API Yanıtı:", apiResponse);      
      const resp = (await api.job.get("company")).filter(job => {
        console.log("İş sahibi:", job.jobOwnerId);
        
        return job.jobOwnerId === user._id;
    });
    console.log("Filtrelenmiş İş Verisi:", resp);
     

      const data = resp.map((item) => ({
        title: item.title,
        category: item.category,
        description: item.description,
        deadline: item.deadline,
        budget: item.budget,
     
        edit: editRow("Edit"),
      }));

      setMyPosts(data);
    };

    getData();
  }, []);

  return (
    <div className="my__posts">
      <div className="title">My Posts</div>
      {<Table headline={appliedMyPostsHeadlines} data={myPosts} />}
      <EditBox
        edit={"Edit"}
        editBoxVisibility={editBoxVisibility}
        setEditBoxVisibility={setEditBoxVisibility}
        title={setTitle}
        budget={setBudget}
        category={setCategory}
        deadline={setDeadline}
        description={setDescription}
    
        
        loading={loading}
      />
    
    </div>
  );
}