import api from "../../../../../services/api";
import { useState, useEffect } from "react";
import Select from "react-select";
import Table from "../../../../../components/layout/table/table";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../../../styles/styles.scss"
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function Profile(props) {
  const location = useLocation();
  const { userId } = location.state;

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


 

  const [languagesOptions, setLanguagesOptions] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]); 
  
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]); 
  

  const { id } = useParams();


  const getProfile1 = async () => {
   
    try {


      const res = await api.user.profile.get(userId)

    
        setForm(res)

        console.log("bu da res:",res)

    } catch (error) {

    }
    
  };

  useEffect(() => {
    getProfile1();

    if (form?.languages) {
      setSelectedLanguages(form.languages.map((lang) => ({ label: lang, value: lang })));
    }
    if (form?.skills) {
      setSelectedSkills(form.skills.map((skill) => ({ label: skill, value: skill })));
    }
  }, [form]);
 

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
    <div class="wrapper">

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
                readOnly
         
              />
            </li>
            <li>
              <label>Last Name</label>
              <input
                type="input"
                required
                readOnly
                value={form?.lastName}
           
              />
            </li>
            <li>
              <label>Birthday</label>
              <input
                type="date"
                required
                readOnly
                defaultValue={form?.birthday}
            
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
                readOnly
                className="react-select-container"
                classNamePrefix="react-select"
         
              />
              </li>
              <li>
              <label>Languages</label>
              <Select
                value={selectedLanguages}
                isMulti
                unstyled
                readOnly
                classNamePrefix="react-select"
                className="react-select-container" 
              />
            </li>
            <li>
              <label>Skills</label>
              <Select
                 value={selectedSkills}
                 options={skillsOptions}
                 isMulti
                 unstyled
                 readOnly
                 classNamePrefix="react-select"
                 className="react-select-container" 
               
              />
            </li>
            <li>
              <label>Description</label>
              <textarea
                required
                readOnly
                value={form?.profileDescription}
               
              />
            </li>
            <li>
              <label>Address</label>
              <textarea
                value={form?.address}
                required
                readOnly
               
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
             
              loading={loading}
            />
            
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Projects</div>
          <ul className="card__body">
            <Table
              data={formattedProjects}
              headline={projectHeadlines}
             
              loading={loading}
            />
            
          </ul>
        </div>
        
        <div className="card">
          <div className="card__header">Achievement</div>
          <ul className="card__body">
            <Table
              data={formattedAchievements}
              headline={achievementHeadlines}
           
              loading={loading}
            />

          
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Experiences</div>
          <ul className="card__body">
            <Table
              data={formattedExperiences}
              headline={experienceHeadlines}
           
              loading={loading}
            />

          
          </ul>
        </div>



      </div>
      </div>
      </div>
    </>
  );
}
