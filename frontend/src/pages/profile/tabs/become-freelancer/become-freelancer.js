import api from "../../../../services/api";
import { useState, useEffect } from "react";
import Select from "react-select";

import axios from "axios";

import "../../../../styles/styles.scss"
import { useParams } from 'react-router-dom';


export default function BecomeFreelancer(props) {
  const profession = [
    {
      label: "Advisor",
      value: "Advisor"
    },
    {
      label: "Data Scientist",
      value: "Data Scientist"
    },
    {
      label: "Software specialist",
      value: "Software specialist"
    },
    {
      label: "Designer",
      value: "designer"
    },
    {
      label: "Influencer",
      value: "influencer"
    },
    {
      label: "Marketing expert",
      value: "marketing expert"
    },
    {
      label: "Musician",
      value: "musician"
    },
    {
      label: "Translator",
      value: "translator"
    },
    {
      label: "Video/Production Specialist",
      value: "video/Production Specialist"
    },
    {
      label: "Virtual Assistant",
      value: "virtual Assistant"
    },
    {
      label: "Your voiceover",
      value: "Your voiceover"
    },
    {
      label: "Writer",
      value: "writer"
    },
  ];

  const speciality = [
      { label: "Grafik Tasarım Araçları", value: "Grafik Tasarım Araçları" },
      { label: "Adobe Photoshop", value: "Adobe Photoshop" },
      { label: "Adobe Illustrator", value: "Adobe Illustrator" },
      { label: "CorelDRAW", value: "CorelDRAW" },
    
      { label: "Video Düzenleme Yazılımları", value: "Video Düzenleme Yazılımları" },
      { label: "Adobe Premiere Pro", value: "Adobe Premiere Pro" },
      { label: "Final Cut Pro X", value: "Final Cut Pro X" },
      { label: "DaVinci Resolve", value: "DaVinci Resolve" },
    
      { label: "3D Modelleme ve Animasyon", value: "3D Modelleme ve Animasyon" },
      { label: "Autodesk Maya", value: "Autodesk Maya" },
      { label: "Blender", value: "Blender" },
      { label: "Cinema 4D", value: "Cinema 4D" },
    
      { label: "Web Geliştirme Araçları", value: "Web Geliştirme Araçları" },
      { label: "Visual Studio Code", value: "Visual Studio Code" },
      { label: "Sublime Text", value: "Sublime Text" },
      { label: "Chrome Developer Tools", value: "Chrome Developer Tools" },
    
      { label: "Veritabanı Yönetim Sistemleri", value: "Veritabanı Yönetim Sistemleri" },
      { label: "MySQL", value: "MySQL" },
      { label: "Microsoft SQL Server", value: "Microsoft SQL Server" },
      { label: "MongoDB", value: "MongoDB" },
    
      { label: "Mobil Uygulama Geliştirme", value: "Mobil Uygulama Geliştirme" },
      { label: "Android Studio", value: "Android Studio" },
      { label: "Xcode", value: "Xcode" },
      { label: "React Native", value: "React Native" },
    
      { label: "Proje Yönetimi Araçları", value: "Proje Yönetimi Araçları" },
      { label: "Jira", value: "Jira" },
      { label: "Trello", value: "Trello" },
      { label: "Asana", value: "Asana" },
    { label: "Adobe Acrobat", value: "Adobe Acrobat" },
    { label: "Adobe Audition", value: "Adobe Audition" },
    { label: "Adobe Captivate", value: "Adobe Captivate" },
    { label: "Adobe Contribute", value: "Adobe Contribute" },
    { label: "Adobe Director", value: "Adobe Director" },
    { label: "Adobe Encore", value: "Adobe Encore" },
    { label: "Adobe Fireworks", value: "Adobe Fireworks" },
    { label: "Adobe FreeHand", value: "Adobe FreeHand" },
    { label: "Adobe GoLive", value: "Adobe GoLive" },
    { label: "Adobe Illustrator", value: "Adobe Illustrator" },
    { label: "Adobe Imageready", value: "Adobe Imageready" },
    { label: "Adobe Indesign", value: "Adobe Indesign" },
  ];

  // const profileData = props.profile;
  // const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [form, setForm] = useState(profileData);
  const [professionOptions, setProfessionOptions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState([]); 

  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState([]);

  

  const [form, setForm] = useState({
    profession: "",
    freelanceDescription: "",
    speciality :""
  });
  
  const [activeBecomeFreelancerErrors, setActiveBecomeFreelancerErrors] =
    useState(null);

    const { id } = useParams();

  const getProfile1 = async () => {
   
    try {

      console.log(id,"profildeki id")
  

      const res = await axios.get(`http://localhost:3001/user/profile/${id}`, {
        withCredentials: true,

      });
        //setUserProfile(res.data);

      setForm(res.data);
      const professionFromApi = res.data.profession || []; 
      const specialityFromApi = res.data.speciality || []; 

      const formattedProfession = profession.map((Profession) => ({
        label: Profession.label,
        value: Profession.value,
      }));
      setProfessionOptions(formattedProfession);
   
      setSelectedProfession(
        professionFromApi.map((Profession) => ({
          label: Profession,
          value: Profession,
         
        }))
      );
      console.log("Burası setselectProfession")
      setSpecialityOptions(
        speciality.map((Speciality) => ({
          label: Speciality.label,
          value: Speciality.value,
        }))
      );

      setSelectedSpeciality(
        specialityFromApi.map((Speciality) => ({
          label: Speciality,
          value: Speciality,
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
    console.log("form",form)
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

  const becomeFreelancer = async () => {
    setLoading(true);
    setActiveBecomeFreelancerErrors(null);
    const res = await api.user.beFreelancer(form).catch((err) => {
      setActiveBecomeFreelancerErrors(err.response.data.errorMessage);
      setLoading(false);
    });

    if (res.successMessage) {
      setForm({
        profession: "",
        freelanceDescription: "",
       speciality :""
      });
      props.getProfile();
      props.setActiveTab("profile");
    }

    setLoading(false);
  };

  useEffect(() => {
    getProfile1();
  }, []);


  return (
    <div className="wrapper">
    <div class="">

    <div class="container">
      <div className="cards freelancer">
        <div className="card">
          <div className="card__header">
            Welcome, {props.profile?.firstName} {props.profile?.lastName}
          </div>
          <ul className="card__body">
            <li>
              <h3>Speciality</h3>
              <p>
                SELAM ARKADAŞLAR BURASI HARİKA KSJHFJKSH
                It is very important that you specify your specialization
                category and your field of expertise. If you're a lazy person,
                you can talk about yourself later.
              </p>
            </li>
            
            <li>
              <label>Profession</label>
              <Select
               value={selectedProfession}
                options={professionOptions}
                isMulti
                unstyled
                classNamePrefix="react-select"
                className="react-select-container" 
               defaultValue={form.profession}
                onChange={(selectedOptions) => {
                  setSelectedProfession(selectedOptions);
                  const selectedProfessionValues = selectedOptions.map((Profession) => Profession.value);
                  onChange("profession", selectedProfessionValues);
                }}
                onBlur={() => onBlur("profession", selectedProfession)}
             />
            </li>
            <li>
              <label>Description</label>
              <textarea
                required
                type="input"
                value={form?.description}
                onChange={(e) =>
                  onChange("description", e.currentTarget.value)
                }
                onBlur={(e) => onBlur("description", e.target.value)}
              />
            </li>
            <li>
              <label>Speciality</label>
              <Select
               value={selectedSpeciality}
                options={specialityOptions}
                isMulti
                unstyled
                classNamePrefix="react-select"
                className="react-select-container" 
               defaultValue={form.speciality}
                onChange={(selectedOptions) => {
                  setSelectedSpeciality(selectedOptions);
                  const selectedSpecialityValues = selectedOptions.map((skill) => skill.value);
                  onChange("speciality", selectedSpecialityValues);
                }}
                onBlur={() => onBlur("speciality", selectedSpeciality)}
             />
            </li>
            <button
              className={loading ? "loading" : undefined}
              onClick={becomeFreelancer}
            >
              Save
            </button>
          </ul>
          {activeBecomeFreelancerErrors && (
            <span className="error pushTop">
              {activeBecomeFreelancerErrors}
            </span>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
  
}
