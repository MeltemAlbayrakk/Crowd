import Table from "../../../../components/layout/table/table";

export default function AppliedBids(props) {
  const appliedBidsHeadlines = [
    "Name",
    "Category",
    "Subcategory",
    "Estimated Time",
    "Freelancer Estimated Budget",
    "Status",
  ];

  const appliedBidsData = [
    {
      name: "Name",
      category: "Category",
      subcategory: "Subcategory",
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name",
      category: "Category",
      subcategory: "Subcategory",
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name",
      category: "Category",
      subcategory: "Subcategory",
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name",
      category: "Category",
      subcategory: "Subcategory",
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
    {
      name: "Name",
      category: "Category",
      subcategory: "Subcategory",
      estimatedTime: "Estimated Time",
      freelancerEstimatedBudget: "Freelancer Estimated Budget",
      status: "Status",
    },
  ];

  return (
    <div className="applied__bids">
      <div className="title">Valid Bids</div>
      {<Table data={appliedBidsData} headline={appliedBidsHeadlines} />}
    </div>
  );
}
