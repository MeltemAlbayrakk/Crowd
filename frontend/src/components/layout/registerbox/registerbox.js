import PasswordValidation from "./PasswordValidation";

export default function Registerbox(props) {
  const {
    register,
    registerboxVisibility,
    setRegisterboxVisibility,
    activeTab,
    setActiveTab,
    registerData,
    setRegisterData,
    error,
    setError,
    loading,
  } = props;

  return (
    <div
      className={
        registerboxVisibility ? "modal registerbox active" : "modal registerbox"
      }
      id="registerbox"
    >
      <div className="container">
        <a
          className="close"
          onClick={() => {
            setError("");
            setRegisterboxVisibility(false);
          }}
        >
          X
        </a>
        <a className="logo">Register</a>
        <ul cka>
          <li
            className={activeTab == "individual" ? "active" : undefined}
            onClick={() => {
              setError("");
              setActiveTab("individual");
            }}
          >
            Individual
          </li>
          <li
            className={activeTab == "corporate" ? "active" : undefined}
            onClick={() => {
              setError("");
              setActiveTab("corporate");
            }}
          >
            Corporate
          </li>
        </ul>
        <form onSubmit={register}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              placeholder="Please enter your first name"
              value={registerData.firstName}
              onChange={(e) =>
                setRegisterData({ ...registerData, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Please enter your last name"
              value={registerData.lastName}
              onChange={(e) =>
                setRegisterData({ ...registerData, lastName: e.target.value })
              }
            />
          </div>
          {activeTab == "corporate" ? (
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                placeholder="Please enter your company's name"
                value={registerData.companyName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    companyName: e.target.value,
                  })
                }
              />
            </div>
          ) : undefined}
          <div>
            <label>E-Mail:</label>
            <input
              type="email"
              placeholder="Please enter your email adress"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              placeholder="Please enter your phone number"
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Please enter your password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
          </div>
          <PasswordValidation password={registerData.password}/>

          <div>
            <label>Password Confirm:</label>
            <input
              type="password"
              placeholder="Please confirm your password"
              value={registerData.passwordConfirmation}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  passwordConfirmation: e.target.value,
                })
              }
            />
          </div>
          <button className={loading ? "loading" : undefined}>Register</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
