import Table from "../../../../components/layout/table/table";
import { useState, useEffect } from "react";
import api from "../../../../services/api";
import { useParams } from 'react-router-dom';

export default function AppliedBids(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [appliedBidsData, setAppliedBidsData] = useState([]);

  const getApplicant = async (id) => {
    setLoading(true);
    try {
      const user = await api.user.profile.get(id);
      console.log("user:", user._id);
      console.log(id)
      const resp = await api.applicant.getApplicant("personal",{id:id});
      console.log("resp degeri:", resp);

      const newData = resp.map((item) => ({
        name: item.title,
        category: item.category,
        offer:item.offer,
        deadline:item.deadline,
        status:item.status
      }));

      setAppliedBidsData(newData);
    } catch (error) {
      console.error("Hata detayları:", error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicant(id, 0.1);
  }, [id]);

  useEffect(() => {
    getApplicant(id, 0.1);
  }, []);


  const appliedBidsHeadlines = [
    "Title",
    "Category",
    "Freelancer Estimated Budget",
    "Estimated Time",
    "Status",
  ];

  return (
    <div className="applied__bids">
      <div className="title">Valid Bids</div>
      <Table data={appliedBidsData} headline={appliedBidsHeadlines} />
    </div>
  );
}