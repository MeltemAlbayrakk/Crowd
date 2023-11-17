import api from "../../../../../services/api";
import { useState } from "react";
import Select from "react-select";

export default function Profile(props) {
  const sector = [
    { label: "Eğitim", value: "Eğitim" },
    { label: "Yazılım", value: "Yazılım" },
    { label: "İnşaat", value: "İnşaat" },
    { label: "Reklam", value: "Reklam" },
    { label: "İnsan Kaynakları", value: "İnsan Kaynakları" },
  ];

  const [form, setForm] = useState(props.profile);

  const onChange = async (prop, value) => {
    setForm({
      ...form,
      [prop]: value,
    });
  };

  const onBlur = async (prop, value) => {
    await api.user.profile.update("company", form);
  };

  return (
    <>
<div className="wrapper"> 
 <div className="cards">
        <div className="card">
          <div className="card__header">Company Details</div>
          <ul className="card__body">
            <li>
              <label>Company Name</label>
              <input
                type="input"
                value={form.companyName}
                required
                onChange={(e) => onChange("companyName", e.target.value)}
                onBlur={(e) => onBlur("companyName", e.target.value)}
              />
            </li>
            <li>
              <label>Website</label>
              <input
                type="text"
                required
                defaultValue={form.companyWebsite}
                onChange={(e) => onChange("companyWebsite", e.target.value)}
                onBlur={(e) => onBlur("companyWebsite", e.target.value)}
              />
            </li>
            <li>
              <label>Foundation</label>
              <input
                type="date"
                required
                defaultValue={form.companyYearOfFoundation}
                onChange={(e) =>
                  onChange("companyYearOfFoundation", e.target.value)
                }
                onBlur={(e) =>
                  onBlur("companyYearOfFoundation", e.target.value)
                }
              />
            </li>
            <li>
              <label>Sector</label>
              <Select
                defaultValue={form.companySector}
                options={sector}
                unstyled
                isMulti
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(e) => onChange("companySector", e)}
                onBlur={(e) => onBlur("companySector", e)}
              />
            </li>
            <li>
              <label>Description</label>
              <textarea
                required
                value={form.companyDescription}
                onChange={(e) => onChange("companyDescription", e.target.value)}
                onBlur={(e) => onBlur("companyDescription", e.target.value)}
              />
            </li>
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Contact Details</div>
          <ul className="card__body">
            <li>
              <label>First Name</label>
              <input
                type="input"
                value={form.firstName}
                required
                onChange={(e) => onChange("firstName", e.target.value)}
                onBlur={(e) => onBlur("firstName", e.target.value)}
              />
            </li>
            <li>
              <label>Last Name</label>
              <input
                type="input"
                value={form.lastName}
                required
                onChange={(e) => onChange("lastName", e.target.value)}
                onBlur={(e) => onBlur("lastName", e.target.value)}
              />
            </li>
            <li>
              <label>Phone Number</label>
              <input
                type="input"
                value={form.phone}
                required
                onChange={(e) => onChange("phone", e.target.value)}
                onBlur={(e) => onBlur("phone", e.target.value)}
              />
            </li>
            <li>
              <label>Email</label>
              <input
                type="input"
                value={form.email}
                required
                onChange={(e) => onChange("email", e.target.value)}
                onBlur={(e) => onBlur("email", e.target.value)}
              />
            </li>
            <li>
              <label>Address</label>
              <textarea
                required
                value={form.companyAddress}
                onChange={(e) => onChange("companyAddress", e.target.value)}
                onBlur={(e) => onBlur("companyAddress", e.target.value)}
              />
            </li>
            <li>
              <label>Country</label>
              <input
                type="input"
                required
                value={form.companyCountry}
                onChange={(e) => onChange("companyCountry", e.target.value)}
                onBlur={(e) => onBlur("companyCountry", e.target.value)}
              />
            </li>
            <li>
              <label>City</label>
              <input
                type="text"
                required
                defaultValue={form.companyCity}
                onChange={(e) => onChange("companyCity", e.target.value)}
                onBlur={(e) => onBlur("companyCity", e.target.value)}
              />
            </li>
          </ul>
        </div>
        <div className="card">
          <div className="card__header">Social Media Details</div>
          <ul className="card__body">
            <li>
              <label>Facebook</label>
              <input
                type="input"
                value={form.companyFacebookUrl}
                required
                onChange={(e) => onChange("companyFacebookUrl", e.target.value)}
                onBlur={(e) => onBlur("companyFacebookUrl", e.target.value)}
              />
            </li>
            <li>
              <label>Twitter</label>
              <input
                type="input"
                required
                value={form.companyTwitterUrl}
                onChange={(e) => onChange("companyTwitterUrl", e.target.value)}
                onBlur={(e) => onBlur("companyTwitterUrl", e.target.value)}
              />
            </li>
            <li>
              <label>Google</label>
              <input
                type="text"
                required
                defaultValue={form.companyGoogleUrl}
                onChange={(e) => onChange("companyGoogleUrl", e.target.value)}
                onBlur={(e) => onBlur("companyGoogleUrl", e.target.value)}
              />
            </li>
            <li>
              <label>linkedIn</label>
              <input
                type="text"
                required
                defaultValue={form.companyLinkedinUrl}
                onChange={(e) => onChange("companyLinkedinUrl", e.target.value)}
                onBlur={(e) => onBlur("companyLinkedinUrl", e.target.value)}
              />
            </li>
          </ul>
        </div>



    </div>
     
      </div>
    </>
  );
}
