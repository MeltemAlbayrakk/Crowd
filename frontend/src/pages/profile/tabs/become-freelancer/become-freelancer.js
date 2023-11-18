import Select from "react-select";
import api from "../../../../services/api";
import { useState } from "react";

export default function BecomeFreelancer(props) {
  const professionOptions = [
    {
      label: "Advisor",
      value: "Advisor",
    },
    {
      label: "Data Scientist",
      value: "Data Scientist",
    },
    {
      label: "Software specialist",
      value: "Software specialist",
    },
    {
      label: "Designer",
      value: "designer",
    },
    {
      label: "Influencer",
      value: "influencer",
    },
    {
      label: "Marketing expert",
      value: "marketing expert",
    },
    {
      label: "Musician",
      value: "musician",
    },
    {
      label: "Translator",
      value: "translator",
    },
    {
      label: "Video/Production Specialist",
      value: "video/Production Specialist",
    },
    {
      label: "Virtual Assistant",
      value: "virtual Assistant",
    },
    {
      label: "Your voiceover",
      value: "Your voiceover",
    },
    {
      label: "Writer",
      value: "writer",
    },
  ];

  const specialityOptions = [
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

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    specializationCategory: "",
    specializationTitle: "",
    specializationDescription: "",
    specializationTools: "dummy",
  });

  const [activeBecomeFreelancerErrors, setActiveBecomeFreelancerErrors] =
    useState(null);

  const onChange = async (prop, value) => {
    setForm({
      ...form,
      [prop]: value,
    });
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
        specializationCategory: "",
        specializationTitle: "",
        specializationDescription: "",
        specializationTools: "dummy",
      });
      props.getProfile();
      props.setActiveTab("profile");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="cards freelancer">
        <div className="card">
          <div className="card__header">
            Welcome, {props.profile?.firstName} {props.profile?.lastName}
          </div>
          <ul className="card__body">
            <li>
              <h3>Speciality</h3>
              <p>
                It is very important that you specify your specialization
                category and your field of expertise. If you're a lazy person,
                you can talk about yourself later.
              </p>
            </li>
            <li>
              <label>Profession</label>
              <Select
                options={professionOptions}
                unstyled
                className="react-select-container"
                classNamePrefix="react-select"
                defaultValue={form.profession}
                required
                onChange={(e) => onChange("specializationTitle", e.value)}
              />
            </li>
            <li>
              <label>Description</label>
              <textarea
                required
                type="input"
                value={form.description}
                onChange={(e) =>
                  onChange("specializationDescription", e.currentTarget.value)
                }
              />
            </li>
            <li>
              <label>Speciality</label>
              <Select
                options={specialityOptions}
                unstyled
                className="react-select-container"
                classNamePrefix="react-select"
                defaultValue={form.speciality}
                required
                onChange={(e) => onChange("specializationCategory", e.value)}
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
  );
}
