import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faGears,
  faPeopleArrows,
  faPlusCircle,
  faRectangleList,
  faSearch,
  faSignHanging,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import api from "../../services/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";

import PersonalProfile from "./tabs/profile/personal/profile";
import CompanyProfile from "./tabs/profile/company/profile";

import JobPosting from "./tabs/job-posting/job-posting";
import MyPosts from "./tabs/my-posts/my-posts";
import Freelancers from "./tabs/freelancers/freelancers";
import BecomeFreelancer from "./tabs/become-freelancer/become-freelancer";
import SearchJob from "./tabs/search-job/search-job";
import AppliedBids from "./tabs/applied-bids/applied-bids";
import Settings from "./tabs/settings/settings";

export default function Index() {
  useEffect(() => {
    document.querySelector("#root.homepage")?.classList.remove("homepage");
  }, []);

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoadloading] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    setAuth(false);
    localStorage.removeItem("auth");
    navigate("/");
  };

  const getProfile = async () => {
    setProfile(await api.user.profile.get());
    setLoadloading(false);
  };

  const updateProfilePhoto = async (e) => {
    setLoadloading(true);
    if (e.target?.files?.length === 0) {
      setLoadloading(false);
      return;
    }

    const form = new FormData();
    form.append("profilePhoto", e.target.files[0]);
    await api.user.profile.updatePicture(form);
    getProfile();
  };

  useEffect(() => {
    if (!auth) navigate("/");
    if (!profile) {
      const getData = async () => {
        const resp = await api.user.profile.get();
        setProfile(resp);
      };
      getData();
    }
  });

  return (
    profile && (
      <div className="wrapper">
        <Header auth={auth} logout={logout} isProfileHidden={true} />
        <div className="content">
          {profile && (
            <div className="container profile">
              <div className="profile__left">
                <div
                  className={
                    loading ? "profile__avatar loading" : "profile__avatar"
                  }
                  style={{
                    backgroundImage: `url(${
                      (profile && profile.profilePhoto) ||
                      require("../../images/profile.png")
                    })`,
                  }}
                >
                  <input type="file" onChange={updateProfilePhoto} />
                </div>
                <div className="profile__fullname">
                  {profile.firstName + " " + profile.lastName}
                </div>
                <div className="profile__email">{profile.email}</div>
                {profile.role == "personal" && (
                  <ul className="profile__nav">
                    <li
                      className={activeTab == "profile" ? "active" : undefined}
                      onClick={() => setActiveTab("profile")}
                    >
                      <FontAwesomeIcon icon={faUser} />
                      Profile
                    </li>
                    {!profile.isFreelancer && (
                      <li
                        className={
                          activeTab == "become-freelancer"
                            ? "active"
                            : undefined
                        }
                        onClick={() => setActiveTab("become-freelancer")}
                      >
                        <FontAwesomeIcon icon={faPeopleArrows} />
                        Become Freelancer
                      </li>
                    )}
                    <li
                      className={
                        activeTab == "search-job" ? "active" : undefined
                      }
                      onClick={() => setActiveTab("search-job")}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                      Search Job
                    </li>
                    <li
                      className={
                        activeTab == "applied-bids" ? "active" : undefined
                      }
                      onClick={() => setActiveTab("applied-bids")}
                    >
                      <FontAwesomeIcon icon={faSignHanging} />
                      Applied Bids
                    </li>
                    <li
                      className={activeTab == "settings" ? "active" : undefined}
                      onClick={() => setActiveTab("settings")}
                    >
                      <FontAwesomeIcon icon={faGears} />
                      Settings
                    </li>
                  </ul>
                )}
                {profile.role == "company" && (
                  <ul className="profile__nav">
                    <li
                      className={activeTab == "profile" ? "active" : undefined}
                      onClick={() => setActiveTab("profile")}
                    >
                      <FontAwesomeIcon icon={faUser} />
                      Profile
                    </li>
                    <li
                      className={
                        activeTab == "job-posting" ? "active" : undefined
                      }
                      onClick={() => setActiveTab("job-posting")}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} />
                      Job Posting
                    </li>
                    <li
                      className={activeTab == "my-posts" ? "active" : undefined}
                      onClick={() => setActiveTab("my-posts")}
                    >
                      <FontAwesomeIcon icon={faRectangleList} />
                      My Posts
                    </li>
                    <li
                      className={
                        activeTab == "freelancers" ? "active" : undefined
                      }
                      onClick={() => setActiveTab("freelancers")}
                    >
                      <FontAwesomeIcon icon={faPeopleArrows} />
                      Freelancers
                    </li>
                    <li
                      className={activeTab == "settings" ? "active" : undefined}
                      onClick={() => setActiveTab("settings")}
                    >
                      <FontAwesomeIcon icon={faGear} />
                      Settings
                    </li>
                  </ul>
                )}
              </div>
              <div className="profile__right">
                {activeTab == "profile" && profile.role == "personal" ? (
                  <PersonalProfile profile={profile} getProfile={getProfile} />
                ) : null}

                {activeTab == "profile" && profile.role == "company" ? (
                  <CompanyProfile profile={profile} getProfile={getProfile} />
                ) : null}

                {activeTab == "become-freelancer" ? (
                  <BecomeFreelancer
                    profile={profile}
                    getProfile={getProfile}
                    setActiveTab={setActiveTab}
                  />
                ) : null}
                {activeTab == "search-job" ? <SearchJob /> : null}
                {activeTab == "applied-bids" ? <AppliedBids /> : null}
                {activeTab == "settings" ? (
                  <Settings setActiveTab={setActiveTab} />
                ) : null}
                {activeTab == "job-posting" ? <JobPosting /> : null}
                {activeTab == "my-posts" ? <MyPosts /> : null}
                {activeTab == "freelancers" ? <Freelancers /> : null}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  );

  
}
