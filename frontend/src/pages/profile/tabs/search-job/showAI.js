import React, { useState, useEffect } from "react";
import axios from "axios";
import MyFoto from "../../../../../src/images/konfeti.gif";
import Select from "react-select";

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

  const PreviousMonthOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];

  const NextMonthOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];
  const subCategoriesOptions = [
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
  ];

  useEffect(() => {
    setCategoryOptions(sampleCategories);
  }, []);

  const handlePreviousMonthChange = (selectedOption) => {
    setPreviousMonth(selectedOption);
  };

  const handleNextMonthChange = (selectedOption) => {
    setNextMonth(selectedOption);
  };

  const handleCategoryChange = (selectedCategory) => {
    const category = categoryOptions.find(
      (cat) => cat.value === selectedCategory
    );
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
      .post("http://localhost:3001/job/ai", {
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
   
      <div class="wrapper">
      <div class="content">
      <div class="container profile">
      <div class="profile__right">
      <div class="container">
      <div class="content-profile">
    
      
          <div class="options">
         
            <label>Previous Month</label>
          
            <Select
              value={previousMonth}
              options={PreviousMonthOptions}
              className="react-select-container"
                classNamePrefix="react-select" 
                unstyled
                onChange={(e) => handlePreviousMonthChange(e)}>
                   
            
            
            </Select>
          </div>
          <div>
            <br></br>
            <br></br>
            <label>Next Month</label>

            <Select 
            value={nextMonth}
            options={NextMonthOptions}
          
            className="react-select-container"
            classNamePrefix="react-select" 
         
            onChange={(e) => handleNextMonthChange(e)}
            unstyled
            >
            
             
                   
             
            </Select>
          </div>
          <div>
          
            <label>Job Category</label>
            <Select
              value={jobCategory}
            options={sampleCategories}
              className="react-select-container"
              classNamePrefix="react-select" 
              onChange={(e) => handleCategoryChange(e)}
              unstyled
            >
               <option value="">Select Category</option>
              {categoryOptions.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
              
            </Select>
          </div>

          <br></br>
            <br></br>
          <div>
            <label>Sub Category</label>
            <Select
              value={jobSubCategory}
             
             
              className="react-select-container"
              classNamePrefix="react-select" 
              onChange={(e) => handleSubCategoryChange(e)}
              disabled={!jobCategory}
              options={subCategoriesOptions}
              unstyled
            >
             
            </Select>
          </div>

          <button onClick={handleAnalysis} disabled={loading}>
            {loading ? "Analiz Ediliyor..." : "Analiz Et"}
          </button>
        </div>
        <br></br>
            <br></br> <br></br>
            
        <div>
          <h3>Analiz Sonucu:</h3>
          {loading ? <p>Analiz yapılıyor...</p> : <p>{analysisResult}</p>}
        </div>

        <div>
          <img src={MyFoto} alt="GIF Image" />
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
     
      
    
      
    </> 
  );
}
