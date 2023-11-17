import api from "../../../../services/api";
import { useEffect, useState } from "react";

export default function SearchJob(props) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJobs = async (param, timeout) => {
    setLoading(true);
    try{
      const searchString = param || " ";
      const data = await api.job.search(searchString);
      setJobs(data);
    }catch(error){
      console.error("Error while fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs(false, 0.1);
  }, []);
  return (
    <div className="search__job">
      <div className="search__job__header title">
        <label>Search Job</label>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => getJobs(e.currentTarget.value)}
        />
      </div>
      <ul
        className={loading ? "search__job__list loading" : "search__job__list"}
      >
        {jobs.length > 0 &&
          jobs.map((job) => {
            return (
              <li key={job.id}>
                <div>
                  <b>Title: </b>
                  <b>{job.title}</b>
                </div>
                <div>
                  <b>Category: </b>
                  <span>{job.category}</span>
                </div>
                <div>
                  <b>Subcategory: </b>
                  <span>{job.subCategory}</span>
                </div>
                <div>
                  <b>Delivery Time: </b>
                  <span>{job.deadline}</span>
                </div>
                <div>
                  <b>Estimated Budget: </b>
                  <span>{job.budget}</span>
                </div>
                <div>
                  <b>Description: </b>
                  <span>{job.description}</span>
                </div>
              </li>
            );
          })}
      </ul>
      {!jobs.length > 0 && !loading && (
        <div className="nodata">No data found!</div>
      )}
    </div>
  );
}