import Table from "../../../../components/layout/table/table";
import api from "../../../../services/api";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EditBox from "./modals/edit.js";
import DetailBox from "./modals/detail.js";

export default function MyPosts(props) {
  const [editBoxVisibility, setEditBoxVisibility] = useState(false);
  const [detailBoxVisibility, setDetailBoxVisibility] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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

  const detailRow = (title) => {
    return <button onClick={() => handleDetailClick(title)}>Detail</button>;
  };

  const [myPosts, setMyPosts] = useState([
    {
      title: "",
      category: "",
      description: "",
      deadline: "",
      budget: "",
      edit: editRow("Edit"),
      detail: detailRow("Detail"),
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const resp = await api.job.get("company");
      const data = resp.map((item) => ({
        title: item.title,
        category: item.category,
        description: item.description,
        deadline: item.deadline,
        budget: item.budget,
        edit: deleteRow(item._id),
        detail: detailRow(item.title), // Passing the title to detailRow
      }));
      setMyPosts(data);
    };

    getData();
  }, []);

  const deleteJob = async (id) => {
    setLoading(true);
    console.log("id degeri:", id);
    await api.job.delete("company", id);
    setLoading(false);
  };

  const deleteRow = (id) => {
    return <button onClick={() => deleteJob(id)}>Delete</button>;
  };

  const handleDetailClick = (title) => {
    // Open detail box and pass the selected title
    setDetailBoxVisibility(true);
    setFirstName(""); // Clear previous details
    setLastName("");
    // Additional logic if needed
  };

  return (
    <div className="my__posts">
      <div className="title">My Posts</div>
      <Table headline={appliedMyPostsHeadlines} data={myPosts} />
      <div className="profile__right">
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
          lastName={setLastName}
          loading={loading}
        />
      </div>
    </div>
  );
}
