import { useState } from "react";
import api from "../../../../services/api";

export default function Settings(props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const [activeSettingErrors, setActiveSettingErrors] = useState(null);

  const onChange = async (prop, value) => {
    setForm({
      ...form,
      [prop]: value,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    setActiveSettingErrors(null);

    await api.user
      .changePassword(form)
      .then((res) => {
        setForm({
          oldPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });
        setLoading(false);

        props.setActiveTab("profile");
      })
      .catch((err) => {
        if (err.response.data.errorMessage) {
          setActiveSettingErrors(err.response.data.errorMessage);
          setLoading(false);
        }
      });
  };

  return (
    <div className="settings cards">
      <div className="title">Settings</div>
      <ul className="card__body">
        <li>
          <label>Previous Password</label>
          <input
            type="password"
            required
            value={form.oldPassword}
            onChange={(e) => onChange("oldPassword", e.currentTarget.value)}
          />
        </li>
        <li>
          <label>New Password</label>
          <input
            type="password"
            value={form.newPassword}
            required
            onChange={(e) => onChange("newPassword", e.currentTarget.value)}
          />
        </li>
        <li>
          <label>Repeat New Password</label>
          <input
            type="password"
            required
            value={form.newPasswordConfirmation}
            onChange={(e) =>
              onChange("newPasswordConfirmation", e.currentTarget.value)
            }
          />
        </li>
        <li className="reset">
          <button
            className={loading ? "loading" : undefined}
            onClick={changePassword}
          >
            Change Password
          </button>
        </li>
      </ul>
      {activeSettingErrors && (
        <span className="error pushTop">{activeSettingErrors}</span>
      )}
    </div>
  );
}
