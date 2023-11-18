import api from "../../../../../services/api";
import { useState, useEffect } from "react";
import Select from "react-select";
import Table from "../../../../../components/layout/table/table";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../../../styles/styles.scss"

export default function Profile(props) {
  const languages = [
    { label: "Turkish", value: "Turkish" },
    { label: "English", value: "English" },
    { label: "Russian", value: "Russian" },
    { label: "Spanish", value: "Spanish" },
    { label: "Chinese", value: "Chinese" },
    { label: "Arabic", value: "Arabic" },
  ];

  const skills = [
    { label: "Angular", value: "angular" },
    { label: "CSS", value: "css" },
    { label: "Graphic Design", value: "design" },
    { label: "Ember", value: "ember" },
    { label: "HTML", value: "html" },
    { label: "Information Architecture", value: "ia" },
    { label: "Javascript", value: "javascript" },
    { label: "Mechanical Engineering", value: "mech" },
    { label: "Meteor", value: "meteor" },
    { label: "NodeJS", value: "node" },
    { label: "Plumbing", value: "plumbing" },
    { label: "Python", value: "python" },
    { label: "Rails", value: "rails" },
    { label: "React", value: "react" },
    { label: "Kitchen Repair", value: "repair" },
    { label: "Ruby", value: "ruby" },
    { label: "UI Design", value: "ui" },
    { label: "User Experience", value: "ux" },
  ];

  const educationHeadlines = ["School", "Section", "Graduation Date"];
  const projectHeadlines = ["Project Name", "Description", "Date"];
  const achievementHeadlines = ["Name", "Description"];
  const experienceHeadlines = ["Name", "Company", "Description", "Date"];

  const genderOptions = [
    {
      label: "Male",
      value: "1",
    },
    {
      label: "Female",
      value: "2",
    },
  ];

  const profileData = props.profile;

  //profile data dbden geliyor formu dolduruyor

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(profileData);

  const [isPersonalDEtailsCollapsed, setIsPersonalDetailsCollapsed] = useState(true);
  const [isEducationsCollapsed, setIsEducationsCollapsed] = useState(true);
  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(true);
  const [isAchievementsCollapsed, setIsAchievementsCollapsed] = useState(true);
  const [isExperiencesCollapsed, setIsExperiencesCollapsed] = useState(true);

  const [activePersonalDetail, setactivePersonalDetail] = useState({});
  const [activePersonalDetailErrors, setactivePersonalDetailErrors] = useState(null);

  const [activeEducations, setActiveEducations] = useState({});
  const [activeEducationsErrors, setActiveEducationsErrors] = useState(null);

  const [activeProject, setActiveProject] = useState({});
  const [activeProjectErrors, setActiveProjectErrors] = useState(null);

  const [activeAchievement, setActiveAchievement] = useState({});
  const [activeAchievementErrors, setActiveAchievementErrors] = useState(null);

  const [activeExperience, setActiveExperience] = useState({});
  const [activeExperienceErrors, setActiveExperienceErrors] = useState(null);



  const getProfile1 = async () => {
   
    const res = await axios.get("http://localhost:3001/user/profile", {
      withCredentials: true,
    });
    setForm(res.data);
  };

  const onChange = async (prop, value) => {
    setForm({
      ...form,
      [prop]: value,
    });
  };

  const onBlur = async (prop, value) => {
    await api.user.profile.update("personal", form);
  };


const addPersonalDetail = async ()=>{
  setLoading(true);
  setactivePersonalDetailErrors(null);
  console.log("deneme seysi")
   const res = await api.user.profile.update("personal",form)
   .catch((err) => {
    setactivePersonalDetailErrors(err.response.data.errorMessage);
    setLoading(false);
   });
   console.log("bu profile de ki res :",res)
   if(res.user){
    setactivePersonalDetail({
      ...form,
      firstName:"",
      lastName:"",
      birthday:"",
      gender:"",
      languages:"",
      skills:"",
      description:"",
      address:""
    });
    setIsPersonalDetailsCollapsed(true);
    props.getProfile();
   }
   setLoading(false);
   
};

  const addEducation = async () => {
    setLoading(true);
    setActiveEducationsErrors(null);
    const res = await api.user.profile.education
      .add("personal", activeEducations)
      .catch((err) => {
        setActiveEducationsErrors(err.response.data.errorMessage);
        setLoading(false);
      });

    if (res.user) {
      setActiveEducations({
        ...activeEducations,
        school: "",
        section: "",
        date: "",
      });
      setIsEducationsCollapsed(true);
      props.getProfile();
    }

    setLoading(false);
  };

  const addProject = async () => {
    setLoading(true);
    setActiveProjectErrors(null);
    const res = await api.user.profile.project
      .add("personal", activeProject)
      .catch((err) => {
        setActiveProjectErrors(err.response.data.errorMessage);
        setLoading(false);
      });

    if (res.id) {
      setActiveProject({
        ...activeProject,
        project: "",
        description: "",
        date: "",
      });
      setIsProjectsCollapsed(true);
      props.getProfile();
    }

    setLoading(false);
  };

  const addAchievement = async () => {
    setLoading(true);
    setActiveAchievementErrors(null);
    const res = await api.user.profile.achievement
      .add("personal", activeAchievement)
      .catch((err) => {
        setActiveAchievementErrors(err.response.data.errorMessage);
        setLoading(false);
      });

    if (res.id) {
      setActiveAchievement({
        ...activeAchievement,
        name: "",
        description: "",
      });
      setIsAchievementsCollapsed(true);
      props.getProfile();
    }

    setLoading(false);
  };

  const addExperience = async () => {
    setLoading(true);
    setActiveExperienceErrors(null);
    const res = await api.user.profile.experience
      .add("personal", activeExperience)
      .catch((err) => {
        setActiveExperienceErrors(err.response.data.errorMessage);
        setLoading(false);
      });

    if (res.id) {
      setActiveExperience({
        ...activeExperience,
        name: "",
        company: "",
        description: "",
      });
      setIsExperiencesCollapsed(true);
      props.getProfile();
    }

    setLoading(false);
  };

  const deleteEducation = async (id) => {
    setLoading(true);
    await api.user.profile.education.delete("personal", id);
    props.getProfile();
    setLoading(false);
  };

  const deleteProject = async (id) => {
    setLoading(true);
    await api.user.profile.project.delete("personal", id);
    props.getProfile();
    setLoading(false);
  };

  const deleteAchievement = async (id) => {
    setLoading(true);
    await api.user.profile.achievement.delete("personal", id);
    props.getProfile();
    setLoading(false);
  };

  const deleteExperience = async (id) => {
    setLoading(true);
    await api.user.profile.experience.delete("personal", id);
    props.getProfile();
    setLoading(false);
  };

  useEffect(() => {
    getProfile1();
  }, []);

  return (
    <>
   <div className="wrapper">
   
    
    <div className="">

      <div class="container">
      <div className=" cards">
        <div className="card">
        
       <div className="card__header">Personal Details</div>

          <ul className="card__body">
            <li>
              <label class="">First Name</label>
              <input
                type="input"
                value={form?.firstName}
                required
                onChange={(e) => onChange("firstName", e.target.value)}
                onBlur={(e) => onBlur("firstName", e.target.value)}
              />
            </li>
            <li>
              <label>Last Name</label>
              <input
                type="input"
                required
                value={form?.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                onBlur={(e) => onBlur("lastName", e.target.value)}
              />
            </li>
            <li>
              <label>Birthday</label>
              <input
                type="date"
                required
                defaultValue={form?.birthDay}
                onChange={(e) => onChange("birthDay", e.target.value)}
                onBlur={(e) => onBlur("birthDay", e.target.value)}
              />
            </li>
            <li>
              <label>Gender</label>
              <Select
                defaultValue={form?.gender}
                options={genderOptions}
                getOptionLabel={(x) => x.label}
                getOptionValue={(x) => x.value}
                unstyled
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(e) => onChange("gender", e)}
                onBlur={(e) => onBlur("gender", e)}
              />
            </li>
            <li>
              <label>Languages</label>
              <Select
                defaultValue={form?.languages}
                options={languages}
                getOptionLabel={(x) => x.label}
                getOptionValue={(x) => x.value}
                unstyled
                isMulti
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(e) => onChange("languages", e)}
                onBlur={(e) => onBlur("languages", e)}
              />
            </li>
            <li>
              <label>Skills</label>
              <Select
                defaultValue={form?.skills}
                getOptionLabel={(x) => x.label}
                getOptionValue={(x) => x.value}
                options={skills}
                unstyled
                isMulti
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(e) => onChange("skills", e)}
                onBlur={(e) => onBlur("skills", e)}
              />
            </li>
            <li>
              <label>Description</label>
              <textarea
                required
                value={form?.profileDescription}
                onChange={(e) => onChange("profileDescription", e.target.value)}
                onBlur={(e) => onBlur("profileDescription", e.target.value)}
              />
            </li>
            <li>
              <label>Address</label>
              <textarea
                value={form?.address}
                required
                onChange={(e) => onChange("address", e.target.value)}
                onBlur={(e) => onBlur("address", e.target.value)}
              />
            </li>
          </ul>
          <button
            className={loading ? "loading" : undefined}
            onClick={addPersonalDetail}
          >
            Save
          </button>
        </div>
        <div className="card">
          <div className="card__header">Education Information</div>
          <ul className="card__body">
            <Table
              data={profileData?.educations}
              headline={educationHeadlines}
              onRemove={deleteEducation}
              loading={loading}
            />

            <section
              className={isEducationsCollapsed ? "collapsed" : undefined}
            >
              <div
                className="card__header"
                onClick={() => setIsEducationsCollapsed(!isEducationsCollapsed)}
              >
                <span>Add New Education</span>
                {isEducationsCollapsed ? (
                  <FontAwesomeIcon icon={faPlus} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUp} />
                )}
              </div>
              <ul className="card__body">
                <li>
                  <label>School Name</label>
                  <input
                    type="text"
                    value={activeEducations?.school}
                    onChange={(e) =>
                      setActiveEducations({
                        ...activeEducations,
                        school: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Section</label>
                  <input
                    type="text"
                    value={activeEducations?.section}
                    onChange={(e) =>
                      setActiveEducations({
                        ...activeEducations,
                        section: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Graduation Date</label>
                  <input
                    value={activeEducations?.date}
                    onChange={(e) =>
                      setActiveEducations({
                        ...activeEducations,
                        date: e.target.value,
                      })
                    }
                    type="date"
                  />
                </li>
                <li className="reset">
                  <button
                    className={loading ? "loading" : undefined}
                    onClick={addEducation}
                  >
                    Save
                  </button>
                </li>
              </ul>
              {activeEducationsErrors && (
                <span className="error">{activeEducationsErrors}</span>
              )}
            </section>
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Projects</div>
          <ul className="card__body">
            <Table
              data={profileData?.projects}
              headline={projectHeadlines}
              onRemove={deleteProject}
              loading={loading}
            />
            <section className={isProjectsCollapsed ? "collapsed" : undefined}>
              <div
                className="card__header"
                onClick={() => setIsProjectsCollapsed(!isProjectsCollapsed)}
              >
                <span>Add New Project</span>
                {isProjectsCollapsed ? (
                  <FontAwesomeIcon icon={faPlus} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUp} />
                )}
              </div>{" "}
              <ul className="card__body">
                <li>
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={activeProject.headline}
                    onChange={(e) =>
                      setActiveProject({
                        ...activeProject,
                        headline: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Description</label>
                  <input
                    type="text"
                    value={activeProject.description}
                    onChange={(e) =>
                      setActiveProject({
                        ...activeProject,
                        description: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Date</label>
                  <input
                    value={activeProject.date}
                    onChange={(e) =>
                      setActiveProject({
                        ...activeProject,
                        date: e.target.value,
                      })
                    }
                    type="date"
                  />
                </li>
                <li className="reset">
                  <button
                    className={loading ? "loading" : undefined}
                    onClick={addProject}
                  >
                    Save
                  </button>
                </li>
              </ul>{" "}
              {activeProjectErrors && (
                <span className="error">{activeProjectErrors}</span>
              )}
            </section>
          </ul>
        </div>
        
        <div className="card">
          <div className="card__header">Achievement</div>
          <ul className="card__body">
            <Table
              data={profileData?.achievements}
              headline={achievementHeadlines}
              onRemove={deleteAchievement}
              loading={loading}
            />

            <section
              className={isAchievementsCollapsed ? "collapsed" : undefined}
            >
              <div
                className="card__header"
                onClick={() =>
                  setIsAchievementsCollapsed(!isAchievementsCollapsed)
                }
              >
                <span>Add New Achievement</span>
                {isAchievementsCollapsed ? (
                  <FontAwesomeIcon icon={faPlus} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUp} />
                )}
              </div>
              <ul className="card__body">
                <li>
                  <label>Name</label>
                  <input
                    type="text"
                    value={activeAchievement.headline}
                    onChange={(e) =>
                      setActiveAchievement({
                        ...activeAchievement,
                        headline: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Description</label>
                  <input
                    type="text"
                    value={activeAchievement.description}
                    onChange={(e) =>
                      setActiveAchievement({
                        ...activeAchievement,
                        description: e.target.value,
                      })
                    }
                  />
                </li>
                <li className="reset">
                  <button
                    className={loading ? "loading" : undefined}
                    onClick={addAchievement}
                  >
                    Save
                  </button>
                </li>
              </ul>
              {activeAchievementErrors && (
                <span className="error">{activeAchievementErrors}</span>
              )}
            </section>
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Experiences</div>
          <ul className="card__body">
            <Table
              data={profileData?.experiences}
              headline={experienceHeadlines}
              onRemove={deleteExperience}
              loading={loading}
            />

            <section
              className={isExperiencesCollapsed ? "collapsed" : undefined}
            >
              <div
                className="card__header"
                onClick={() =>
                  setIsExperiencesCollapsed(!isExperiencesCollapsed)
                }
              >
                <span>Add New Experience</span>
                {isExperiencesCollapsed ? (
                  <FontAwesomeIcon icon={faPlus} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUp} />
                )}
              </div>
              <ul className="card__body">
                <li>
                  <label>Name</label>
                  <input
                    type="text"
                    value={activeExperience.headline}
                    onChange={(e) =>
                      setActiveExperience({
                        ...activeExperience,
                        headline: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Company</label>
                  <input
                    type="text"
                    value={activeExperience.company}
                    onChange={(e) =>
                      setActiveExperience({
                        ...activeExperience,
                        company: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Description</label>
                  <textarea
                    value={activeExperience.description}
                    onChange={(e) =>
                      setActiveExperience({
                        ...activeExperience,
                        description: e.target.value,
                      })
                    }
                  />
                </li>
                <li>
                  <label>Date</label>
                  <input
                    value={activeExperience.date}
                    onChange={(e) =>
                      setActiveExperience({
                        ...activeExperience,
                        date: e.target.value,
                      })
                    }
                    type="date"
                  />
                </li>
                <li className="reset">
                  <button
                    className={loading ? "loading" : undefined}
                    onClick={addExperience}
                  >
                    Save
                  </button>
                </li>
              </ul>
              {activeExperienceErrors && (
                <span className="error">{activeExperienceErrors}</span>
              )}
            </section>
          </ul>
        </div>



      </div>
      </div>
      </div>
   </div>
      
    </>
  );
}
