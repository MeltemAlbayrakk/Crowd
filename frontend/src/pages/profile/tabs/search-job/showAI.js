import React, { useState } from "react";
import axios from "axios"; 

export default function ShowAI(props) {
  const [previousMonth, setPreviousMonth] = useState(""); 
  const [nextMonth, setNextMonth] = useState(""); 
  const [jobTitle, setJobTitle] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const handlePreviousMonthChange = (event) => {
    setPreviousMonth(event.target.value);
  };

  const handleNextMonthChange = (event) => {
    setNextMonth(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleAnalysis = () => {
    setLoading(true);

    
    axios.post('http://localhost:3001/job/ai', { 
      previousMonth,
      nextMonth,
      jobTitle
    })
    .then(response => {
        console.log("Backend'den gelen yanıt: ", response.data);
      setLoading(false);
    })
    .catch(error => {
      
      console.error("API isteği hatası: ", error);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div>
            <label>Önceki Ay</label>
            <input
              type="text"
              value={previousMonth}
              onChange={handlePreviousMonthChange}
            />
          </div>

          <div>
            <label>Sonraki Ay</label>
            <input
              type="text"
              value={nextMonth}
              onChange={handleNextMonthChange}
            />
          </div>

          <div>
            <label>İş Başlığı</label>
            <input
              type="text"
              value={jobTitle}
              onChange={handleJobTitleChange}
            />
          </div>

          <button onClick={handleAnalysis} disabled={loading}>
            {loading ? "Analiz Ediliyor..." : "Analiz Et"}
          </button>
        </div>
      </div>
    </>
  );
}
