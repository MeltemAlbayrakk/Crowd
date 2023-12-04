import api from "../../../../services/api";
import { useEffect, useState } from "react";

export default function SearchJob(props) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [form,setForm]=useState({
    offer: '',
    selectedJob: null,
  });
  const getJobs = async (param, timeout) => {
    setLoading(true);
    try {
      const searchString = param.trim().toLowerCase();
      let searchData = null;

      if (searchString === "") {
        searchData = await api.job.get("company");
        console.log("iş geliyor mu 111::",searchData)

      } else {
        searchData = await api.job.get("company");
        console.log("iş geliyor mu 222 ::",searchData)
        searchData = searchData.filter((job) =>
        job && job.title && job.title.toLowerCase().includes(searchString)
        );
      }

      setJobs(searchData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };
  const addApplicant= async(req,res)=>{
    setLoading(true)


    const response= await api.applicant.add("personal",form)
    console.log("bu search job içindeki cevap:",response)
    setForm({ offer: ' ', selectedJob: null });
    setLoading(false)
  }

  useEffect(() => {
    getJobs("", 0.1);
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (e) => {
    const inputValue = e.currentTarget.value;
    setSearchValue(inputValue);
    setTimeout(() => getJobs(inputValue), 350);
  };

  return (
    <div className="search__job">
      <div className="search__job__header title">
        <label>Search Job</label>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          
        />
      </div>
      <ul className={loading ? "search__job__list loading" : "search__job__list"}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job._id}>
             <div>
                  <b>Title: </b>
                  <b>{job?.title}</b>
                </div>
                <div>
                  <b>Category: </b>
                  <span>{job?.category}</span>
                </div>
                <div>
                  <b>Delivery Time: </b>
                  <span>{job?.deadline}</span>
                </div>
                <div>
                  <b>Estimated Budget: </b>
                  <span>{job?.budget}</span>
                </div>
                <div>
                  <b>Description: </b>
                  <span>{job?.description}</span>
                </div>

                <input
                type="text"
                placeholder="MAKE AN OFFER"
                onChange={(e) =>
                  setForm({

                    offer: e.target.value,
                  })
                }
                  />
              <button
                  name="offer"
                  className={loading ? "loading" : undefined}
                  onFocus={() => setForm((prevForm) => ({ ...prevForm, selectedJob: job }))}
                  onChange={handleInputChange}
                  onClick={addApplicant}
                  >
                    APPLY
                </button>
            </li>
          ))
        ) : (
          <div className="nodata">No data found!</div>
        )}
      </ul>
    </div>
  );
}