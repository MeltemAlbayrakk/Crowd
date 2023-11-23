import api from "../../../../../services/api";
import { useState, useEffect } from "react";
import Select from "react-select";
import Table from "../../../../../components/layout/table/table";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../../../styles/styles.scss"
import { useParams } from 'react-router-dom';


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

  const [isEducationsCollapsed, setIsEducationsCollapsed] = useState(true);
  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(true);
  const [isAchievementsCollapsed, setIsAchievementsCollapsed] = useState(true);
  const [isExperiencesCollapsed, setIsExperiencesCollapsed] = useState(true);

  const [activeEducations, setActiveEducations] = useState({});
  const [activeEducationsErrors, setActiveEducationsErrors] = useState(null);

  const [activeProject, setActiveProject] = useState({});
  const [activeProjectErrors, setActiveProjectErrors] = useState(null);

  const [activeAchievement, setActiveAchievement] = useState({});
  const [activeAchievementErrors, setActiveAchievementErrors] = useState(null);

  const [activeExperience, setActiveExperience] = useState({});
  const [activeExperienceErrors, setActiveExperienceErrors] = useState(null);

 

  const [languagesOptions, setLanguagesOptions] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]); 

  const [skillsOptions, setSkillsOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);


  const getProfile1 = async () => {
   
    try {

      console.log(id,"profildeki id")
      console.log(id)
      console.log(id)

      const res = await axios.get(`http://localhost:3001/user/profile/${id}`, {
        withCredentials: true,

      });
        //setUserProfile(res.data);

      setForm(res.data);
      const languagesFromApi = res.data.languages || []; 
      const skillsFromApi = res.data.skills || []; 

      const formattedLanguages = languages.map((lang) => ({
        label: lang.label,
        value: lang.value,
      }));
      setLanguagesOptions(formattedLanguages);
      setSelectedLanguages(
        languagesFromApi.map((lang) => ({
          label: lang,
          value: lang,
        }))
      );
      setSkillsOptions(
        skills.map((skill) => ({
          label: skill.label,
          value: skill.value,
        }))
      );

      setSelectedSkills(
        skillsFromApi.map((skill) => ({
          label: skill,
          value: skill,
        }))
      );


    } catch (error) {

    }
    
    
    
  };

  const onChange = async (prop, value) => {
    setForm({
      ...form,
      [prop]: value,
    });
    console.log("form :",form)
  };

  const onBlur = async (prop, value) => {

    console.log("onblurdasın")
    try {
      console.log("try ıcı ")
      const res = await api.user.profile.update("personal", form);

      console.log("onchange diller:",form)

      if (res.status === 201) {
        console.log("200 döndü",res)
      }
      else if (res.status === 404){
        console.log("200 dönmedi",res)
      }
      else{
        console.log("hata ama ne oldugu bellı degıl")
      }
    } catch (error) {
      console.log("onblur hatası:",error.message)
    }
    
    
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
        headline: "",
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
        headline: "",
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
        headline: "",
        company: "",
        description: "",
        date:"",
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

 

  const formattedEducations = form?.educations.map((education) => ({
    id: education._id,
    school: education.school,
    section: education.section,
    date: education.date,
  }));

  const formattedProjects = form?.projects.map((project)=>({
    id:project._id,
    headline:project.headline,
    description:project.description,
    date:project.date
  }))
  const formattedAchievements = form?.achievements.map((achievement)=>({
    id:achievement._id,
    headline:achievement.headline,
    description:achievement.description,
  }))
  const formattedExperiences = form?.experiences.map((experience)=>({
    id:experience._id,
    headline:experience.headline,
    company: experience.company,
    description:experience.description,
    date:experience.date
  }))

  return (
    <>
   <div className="wrapper">
   
    
      <div class="">

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
                defaultValue={form?.birthday}
                onChange={(e) => onChange("birthday", e.target.value)}
                onBlur={(e) => onBlur("birthday", e.target.value)}
              />
            </li>
            <li>
              <label>Gender</label>
              <Select
                value={form?.gender}
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
                value={selectedLanguages}
                options={languagesOptions}
                isMulti
                unstyled
                classNamePrefix="react-select"
                className="react-select-container" 
                onChange={(selectedOptions) => {
                  setSelectedLanguages(selectedOptions);
                  const selectedLanguageValues = selectedOptions.map((lang) => lang.value);
                  onChange("languages", selectedLanguageValues);
                }}
                onBlur={() => onBlur("languages", selectedLanguages)}
              />
            </li>
            <li>
              <label>Skills</label>
              <Select
                 value={selectedSkills}
                 options={skillsOptions}
                 isMulti
                 unstyled
                 classNamePrefix="react-select"
                 className="react-select-container" 
                 onChange={(selectedOptions) => {
                   setSelectedSkills(selectedOptions);
                   const selectedSkillValues = selectedOptions.map((skill) => skill.value);
                   onChange("skills", selectedSkillValues);
                 }}
                 onBlur={() => onBlur("skills", selectedSkills)}
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
          
        </div>
        <div className="card">
          <div className="card__header">Education Information</div>
          <ul className="card__body">
          <Table
              data={formattedEducations}
              headline={educationHeadlines}
              onRemove={(id) => deleteEducation(id)}
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
              data={formattedProjects}
              headline={projectHeadlines}
              onRemove={(id) => deleteProject(id)}
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
              data={formattedAchievements}
              headline={achievementHeadlines}
              onRemove={(id) => deleteAchievement(id)}
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
              data={formattedExperiences}
              headline={experienceHeadlines}
              onRemove={(id) => deleteExperience(id)}
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

