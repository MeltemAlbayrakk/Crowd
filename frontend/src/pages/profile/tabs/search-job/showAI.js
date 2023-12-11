import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShowAI(props) {
  const [previousMonth, setPreviousMonth] = useState("");
  const [nextMonth, setNextMonth] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobSubCategory, setJobSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [analysisResult, setAnalysisResult] = useState("");

  const sampleCategories = [
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
      ],
    },
  ];

  useEffect(() => {
    setCategoryOptions(sampleCategories);
  }, []);




  const handlePreviousMonthChange = (event) => {
    setPreviousMonth(event.target.value);
  };

  const handleNextMonthChange = (event) => {
    setNextMonth(event.target.value);
  };

  const handleCategoryChange = (selectedCategory) => {
    const category = categoryOptions.find((cat) => cat.value === selectedCategory);
    setJobCategory(selectedCategory);
    setSubCategoryOptions(category ? category.subCategories : []);
    setJobSubCategory(""); 
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    setJobSubCategory(selectedSubCategory);
  };

  const handleAnalysis = () => {
    setLoading(true);

    axios
      .post("http://16.171.64.79:3001/job/ai", {
        previousMonth,
        nextMonth,
        jobTitle: `${jobCategory} - ${jobSubCategory}`,
      })
      .then((response) => {
        console.log("Backend'den gelen yanıt: ", response.data);
        setAnalysisResult(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("API isteği hatası: ", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div>
            <label>Previous Month</label>
            <input
              type="text"
              value={previousMonth}
              onChange={handlePreviousMonthChange}
            />
          </div>

          <div>
            <label>Next Month</label>
            <input
              type="text"
              value={nextMonth}
              onChange={handleNextMonthChange}
            />
          </div>

          <div>
          
            <label>Job Category</label>
            <select
              value={jobCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              unstyled
            >
              <option value="">Select Category</option>
              {categoryOptions.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
              
            </select>
          </div>

          <div>
            <label>Sub Category</label>
            <select
              value={jobSubCategory}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              disabled={!jobCategory}
              unstyled
            >
              <option value="">Select Subcategory</option>
              {subCategoryOptions.map((subcategory) => (
                <option key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleAnalysis} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

                <div>
        <h3>Analysis Result:</h3>
        {loading ? (
          <p>Analyzing...</p>
        ) : (
          <p>{analysisResult}</p>
        )}
      </div>

      </div>
    </>
  );
}
