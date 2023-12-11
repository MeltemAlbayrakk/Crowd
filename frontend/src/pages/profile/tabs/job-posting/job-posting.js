import Select from "react-select";
import api from "../../../../services/api";
import { useState } from "react";

import { useParams } from 'react-router-dom';

export default function JobPosting(props) {

  const { id } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryOptions = [
    {
      label: "Graphic Designer",
      value: "Graphic Designer",
      subCategories: [
        { label: "Adobe Photoshop", value: "Adobe Photoshop" },
        { label: "Adobe Illustrator", value: "Adobe Illustrator" },
        { label: "CorelDRAW", value: "CorelDRAW" },
        { label: "InDesign", value: "InDesign" },
        { label: "Sketch", value: "Sketch" },
        { label: "GIMP", value: "GIMP" },
        { label: "Figma", value: "Figma" },
        { label: "Affinity Designer", value: "Affinity Designer" },
        { label: "Canva", value: "Canva" },
        { label: "Procreate", value: "Procreate" },
        { label: "Adobe XD", value: "Adobe XD" },
        { label: "Blender", value: "Blender" },
        { label: "ZBrush", value: "ZBrush" },
        { label: "Cinema 4D", value: "Cinema 4D" },
        { label: "Adobe After Effects", value: "Adobe After Effects" },
        // Add more graphic design tools/software here
      ],
    },
    {
      label: "Software Technology",
      value: "Software Technology",
      subCategories: [
        { label: "JavaScript", value: "JavaScript" },
        { label: "Python", value: "Python" },
        { label: "Java", value: "Java" },
        { label: "C++", value: "C++" },
        { label: "Ruby", value: "Ruby" },
        { label: "Swift", value: "Swift" },
        { label: "Kotlin", value: "Kotlin" },
        { label: "PHP", value: "PHP" },
        { label: "TypeScript", value: "TypeScript" },
        { label: "Go", value: "Go" },
        { label: "Rust", value: "Rust" },
        { label: "R", value: "R" },
        { label: "Perl", value: "Perl" },
        { label: "Haskell", value: "Haskell" },
        { label: "Scala", value: "Scala" },
        // Add more programming languages or technologies here
      ],
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
    subCategory: "",
    budget: "",
    deadline: "",
    jobOwnerId:""
  });

  const [activeJobPostingErrors, setActivejobPostingErrors] = useState(null);

 

  const jobPosting = async () => {
    setLoading(true);
    setActivejobPostingErrors(null);
   
    
    
    const res = await api.job.add("company", form).catch((err) => {
      setActivejobPostingErrors(err.response.data.errorMessage);
      setLoading(false);
    });

    if (res?.successMessage) {
      setForm({
        title: "",
        description: "",
        category: "",
        subCategory: "",
        budget: "",
        deadline: "",
        jobOwnerId:"",
      });
    }
    setLoading(false);
  };

  const onChange = async (prop, value) => {
    if (prop === 'category') {
      setForm({
        ...form,
        [prop]: value,
        subCategory: "", // Ana kategori değiştiğinde alt kategoriyi sıfırla
      });
    } else if (prop === 'subCategory') {
      setForm({
        ...form,
        [prop]: value,
      });
    } else {
      setForm({
        ...form,
        [prop]: value,
      });
    }
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
    value={selectedCategory}
    required
    onChange={(selectedOption) => {
      setSelectedCategory(selectedOption);
      setForm({
        ...form,
        category: selectedOption.value,
        subCategory: "", 
      });
    }}
  />
</li>
<li>
  <label>Sub Category</label>
  <Select
    options={
      form.category
        ? categoryOptions.find(
            (category) => category.value === form.category
          ).subCategories
        : []
    }
    unstyled
    className="react-select-container"
    classNamePrefix="react-select"
    value={form.subCategory ? { label: form.subCategory, value: form.subCategory } : null}
    required
    onChange={(selectedOption) => {
      onChange("subCategory", selectedOption.value);
    }}
    isDisabled={!form.category}
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