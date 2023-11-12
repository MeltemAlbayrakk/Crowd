import Table from "../../../../components/layout/table/table";
import api from "../../../../services/api";
import { useState, useEffect } from "react";

import EditBox from "./modals/edit";

export default function MyPosts(props) {
  const [editBoxVisibility, setEditBoxVisibility] = useState(false);

  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const appliedMyPostsHeadlines = [
    "Budget",
    "Category",
    "Deadline",
    "Description",
    "Status",
    "Sub Category",
    "Title",
    "Edit",
  ];

  const editRow = (event) => {
    return <button onClick={() => setEditBoxVisibility(true)}>Edit</button>;
  };

  const [myPosts, setMyPosts] = useState([
    {
      budget: "",
      category: "",
      deadline: "",
      description: "",
      status: "",
      subcategory: "",
      title: "",
      edit: editRow("Edit"),
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
        status: item.status,
        subcategory: item.subCategory,
        title: item.title,
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
        budget={setBudget}
        category={setCategory}
        deadline={setDeadline}
        description={setDescription}
        status={setStatus}
        subcategory={setSubcategory}
        title={setTitle}
        loading={loading}
      />
    </div>
  );
}
