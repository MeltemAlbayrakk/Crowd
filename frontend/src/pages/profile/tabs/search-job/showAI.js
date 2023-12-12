import React, { useState, useEffect } from "react";
import axios from "axios";
import gifHello from "../../../../../src/images/a-unscreen.gif";
import gifSearching from "../../../../../src/images/2-unscreen.gif";
import gifHappy from "../../../../../src/images/b-unscreen.gif";
import Select from "react-select";

export default function ShowAI(props) {
  const [previousMonth, setPreviousMonth] = useState(null);
  const [nextMonth, setNextMonth] = useState(null);
  const [jobCategory, setJobCategory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [changeGif, setChangeGif] = useState(gifHello);

  const [analysisResult, setAnalysisResult] = useState("");

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

  const CategoryOptions = [
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
    setCategoryOptions(CategoryOptions);
  }, []);

  useEffect(() => {
    setChangeGif(gifHello);
  }, []);
  useEffect(() => {
    if (loading) {
      setChangeGif(gifSearching);
    }
  }, [loading]);
  

  const handlePreviousMonthChange = (event) => {
    setPreviousMonth(event);
  };

  const handleNextMonthChange = (event) => {
    setNextMonth(event);
  };

  const handleJobCategoryChange = (selectedCategory) => {
    setJobCategory(selectedCategory);
  };

  const handleAnalysis = () => {
    setLoading(true);

    axios
      .post("http://localhost:3001/job/ai", {
        previousMonth: previousMonth.value,
        nextMonth: nextMonth.value,
        jobTitle: `${jobCategory.value}`,
      })
      .then((response) => {
        console.log("Backend'den gelen yanıt: ", response.data);
        setAnalysisResult(response.data);
      })
      .catch((error) => {
        console.error("API isteği hatası: ", error);
      })
      .finally(() => {
        setLoading(false);
        setChangeGif(gifHappy); // Analiz tamamlandığında gifHappy'e geç
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="container profile">
            <div
              className="profile__right"
              style={{
                display: "inline-block",
                fontSize: "20px",
                lineHeight: "40px",
              }}
            >
             
    <img
                style={{ position: "fixed", right: "400px", float: "right" }}
                src={changeGif}
                alt="Other GIF"
              />


              <div style={{}}>
                <div style={{ maxWidth: 600 }}>
                  <label>Previous Month</label>
                  <Select
                    value={previousMonth}
                    options={PreviousMonthOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    unstyled
                    onChange={handlePreviousMonthChange}
                  ></Select>
                </div>
                <div style={{ maxWidth: 600 }}>
                  <label>Next Month</label>
                  <Select
                    value={nextMonth}
                    options={NextMonthOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    unstyled
                    onChange={handleNextMonthChange}
                  ></Select>
                </div>

                <div style={{ maxWidth: 600 }}>
                  <label>Sub Category</label>
                  <Select
                    value={jobCategory}
                    options={CategoryOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={handleJobCategoryChange}
                    disabled={!jobCategory}
                    unstyled
                  ></Select>
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

      </div></div></div></div>
    </>
  );
}
