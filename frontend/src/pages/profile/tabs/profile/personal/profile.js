import api from "../../../../../services/api";
import { useState,useEffect } from "react";
import Select from "react-select";

import Table from "../../../../../components/layout/table/table";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";

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
  api.user.profile.get().then(res=>console.log("...",res))


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

  const getProfile1 = async () => {
   // debugger
    //setProfile(await api.user.profile.get());
    const res= await api.user.profile.get();
   setProfile(res);
   
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


  // useEffect(() => {
  //   getProfile();
  // });

  useEffect( () => {
    
    getProfile1();
   
   

 

  }, []);

  return (

    profile && (
    <div>
      kullanıcı bulunamadı
    </div>
    )

 



  );
}
