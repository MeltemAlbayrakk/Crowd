import api from "../../../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SearchJob(props) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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

      } else {
        searchData = await api.job.get("company");
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
  const showAI = async ()=>{
    //setSelecteduserId=userId
    // console.log(selecteduserId+"showww")
    //  const Profile = await api.user.profile.get(userId);
    // console.log("Profil value:",Profile.lastName) 
    navigate('/showAI');
   }

 

  return (
    <div className="search__job">
              <div>
<button onClick={()=>(showAI)}  >AI</button>
</div>
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