import Select from "react-select";
import api from "../../../../services/api";
import { useState } from "react";

export default function JobPosting(props) {

  const categoryOptions = [
    {
      label: "Graphic Designer",
      value: "Graphic Designer",
    },
    {
      label: "Software Technology",
      value: "Software Technology",
    },
  ];

  const radioInputs = [
    {
      value: "In a few days",
    },
    {
      value: "In a week",
    },
    {
      value: "In a month",
    },
    {
      value: "Within 1-3 months",
    },
    {
      value: "More than 3 months",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
  });

  const [activeJobPostingErrors, setActivejobPostingErrors] = useState(null);

  const onChange = async (prop, value) => {
    setForm({
      ...form,
      [prop]: value,
    });
  };

  const jobPosting = async () => {
    setLoading(true);
    setActivejobPostingErrors(null);
    console.log("AAACCCCCCCCCCCCCCC")
    const res = await api.job.add("company", form).catch((err) => {
      setActivejobPostingErrors(err.response.data.errorMessage);
      setLoading(false);
    });

    if (res?.successMessage) {
      setForm({
        title: "",
        description: "",
        category: "",
        budget: "",
        deadline: "",
      });
    }
    setLoading(false);
  };

  return (
    <div className="job__posting">
      <div className="job__posting__header title">Job Posting</div>
      <ul className="job__posting__body">
        <li>
          <label>Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            value={form.title}
            required
            onChange={(e) => onChange("title", e.currentTarget.value)}
          />
        </li>
        <li>
          <label>Job Description</label>
          <textarea
            required
            placeholder="Job Description"
            value={form.description}
            onChange={(e) => onChange("description", e.currentTarget.value)}
          ></textarea>
        </li>
        <li>
          <label>Category</label>
          <Select
            options={categoryOptions}
            unstyled
            className="react-select-container"
            classNamePrefix="react-select"
            defaultValue={form.category}
            required
            onChange={(e) => onChange("category", e.value)}
          />
        </li>
        <li>
          <label>Estimated Budget</label>
          <input
            type="text"
            name="estimatedBudget"
            placeholder="Estimated Budget"
            value={form.budget}
            required
            onChange={(e) => onChange("budget", e.currentTarget.value)}
          />
        </li>
        <li>
          <label>Delivery Time</label>
          <ul>
            {radioInputs.map((radioInput, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="radio_check"
                  required
                  onChange={(e) => {
                    onChange("deadline", radioInput.value);
                  }}
                />
                <label>{radioInput.value}</label>
              </li>
            ))}
          </ul>
        </li>
        <li className="button">
          <button
            className={loading ? "loading" : undefined}
            onClick={jobPosting}
          >
            Advertise
          </button>
        </li>
      </ul>
      {activeJobPostingErrors && (
        <span className="error pushTop">{activeJobPostingErrors}</span>
      )}
    </div>
  );
}
