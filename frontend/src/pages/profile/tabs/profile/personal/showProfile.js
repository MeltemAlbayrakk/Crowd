import api from "../../../../../services/api";
import { useState, useEffect } from "react";
import Select from "react-select";
import Table from "../../../../../components/layout/table/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../../../styles/styles.scss"
import { useParams } from 'react-router-dom';


export default function Profile(props) {
  const educationHeadlines = ["School", "Section", "Graduation Date"];
  const projectHeadlines = ["Project Name", "Description", "Date"];
  const achievementHeadlines = ["Name", "Description"];
  const experienceHeadlines = ["Name", "Company", "Description", "Date"];


  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [languagesOptions, setLanguagesOptions] = useState([]);



  const getProfile = async () => {
    try {
      const res = await api.user.profile.get("65590d6087e8c71e81e39160");
      setProfile(res);
      console.log("Alınan Profil:", res);
    } catch (error) {
      console.error("Profil verileri alınırken hata oluştu:", error);
    }
  };

 
  useEffect(() => {
    getProfile();
  }, []);


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
                value={profile?.firstName}
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
                value={profile?.lastName}
           
              />
            </li>
            <li>
              <label>Birthday</label>
              <input
                type="date"
                required
                readOnly
                defaultValue={profile?.birthday}
            
              />
            </li>
            <li>
              <label>Gender</label>
              <Select
                value={profile?.gender}
                unstyled
                readOnly
                className="react-select-container"
                classNamePrefix="react-select"
         
              />
              </li>
            <li>
              <label>Languages</label>
              <Select
                value={profile?.languages}
                options={languagesOptions}
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
                 value={profile?.skills}
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
                value={profile?.profileDescription}
               
              />
            </li>
            <li>
              <label>Address</label>
              <textarea
                value={profile?.address}
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
              data={profile?.educations}
              headline={educationHeadlines}
             
              loading={loading}
            />
            
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Projects</div>
          <ul className="card__body">
            <Table
              data={profile?.projects}
              headline={projectHeadlines}
             
              loading={loading}
            />
            
          </ul>
        </div>
        
        <div className="card">
          <div className="card__header">Achievement</div>
          <ul className="card__body">
            <Table
              data={profile?.achievements}
              headline={achievementHeadlines}
           
              loading={loading}
            />
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Experiences</div>
          <ul className="card__body">
            <Table
              data={profile?.experiences}
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

