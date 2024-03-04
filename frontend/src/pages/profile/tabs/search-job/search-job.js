import api from "../../../../services/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import LinkedinContext from "../../../../context/LinkedinContext";
export default function SearchJob(props) {
  const { id } = useParams();
  const { linkedinId } = useContext(LinkedinContext)
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
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
  const addApplicant = async (req, res) => {

    console.log(id)
    console.log(form)

    setLoading(true)


    console.log("bu search job içindeki cevap:", form)

    const response = await api.applicant.add("personal", form)
    console.log("bu search job içindeki cevap:", response)
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

  const showAI = async () => {
    //setSelecteduserId=userId
    // console.log(selecteduserId+"showww")
    //  const Profile = await api.user.profile.get(userId);
    // console.log("Profil value:",Profile.lastName) 
    navigate('/showAI');
  }

  return (
    <div className="search__job">
      <div className="search__job__header title">
        <div>
          <button
            class="showAI"
            onClick={(showAI)}  >AI</button>


        </div>

        <label id="searchJob"> Search Job</label>
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
                    id:id
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