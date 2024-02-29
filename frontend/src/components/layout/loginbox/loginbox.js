import LinkedinButton from '../../../images/signin-button.png'
import React, { useContext } from 'react';
import linkedInLoginImage from '../../../images/signin-button.png'
import LinkedinContext from '../../../context/LinkedinContext'
export default function Loginbox(props) {
  const { linkedinId, setLinkedinId } = useContext(LinkedinContext);
  const {
    login,
    loginboxVisibility,
    setLoginboxVisibility,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    signInLinkedin,
    loading,
    loginLinkedin,
    setIsLoggedIn
  } = props;

  const LinkedInApi = {
    clientId: '7787gti63ys60o',
    redirectUrl: 'http://localhost:3001/auth/linkedin/callback',
    oauthUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
    scope: 'email%20profile%20openid'
  };

  const NodeServer = {
    baseURL: 'http://localhost:3001',
    getUserCredentials: '/auth/linkedin/callback'
  };

  class Appasd extends React.Component {
    initialState = {
      user: {},
      loggedIn: false
    };

    constructor(props) {
      super(props);
      this.state = this.initialState;
    }

    componentDidMount = () => {
      window.addEventListener('message', this.handlePostMessage);
    };

    handlePostMessage = event => {
      console.log("4: ", event);
      console.log(event.data)
      if (event.data.type === 'profile') {
        console.log(event.data);
        const { id, token, profile } = event.data;
        console.log(profile);
        console.log(token);
        console.log(id)

        localStorage.setItem("userToken", token)

        setIsLoggedIn(true)
        //this.getUserCredentials(profi);
        setLinkedinId(id)
        console.log(linkedinId)
      }
    };

    // getCodeFromWindowURL = url => {
    //   const popupWindowURL = new URL(url);
    //   const code = popupWindowURL.searchParams.get("code");
    //   console.log("CODE: ", code);
    //   return code
    // };

    showPopup = () => {
      const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
      const oAuthUrl = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
      const width = 450,
        height = 730,
        left = window.screen.width / 2 - width / 2,
        top = window.screen.height / 2 - height / 2;
      window.open(
        oAuthUrl,
        'Linkedin',
        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left
      );
    };

    // getUserCredentials = code => {
    //   axios
    //     .get(`${NodeServer.baseURL} + ${NodeServer.getUserCredentials}?code=${code}`)
    //     .then(res => {
    //       const user = res.data;
    //       this.setState({
    //         user,
    //         loaded: true
    //       })
    //       // Do something with user
    //     });
    // };

    render() {
      const { loggedIn, user } = this.state;
      const contentWhenLoggedIn = (
        <>
          <img src={user.profileImageURL} alt="Profile image" />
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
          <h3>{user.email}</h3>
        </>
      );
      const contentWhenLoggedOut = (
        <>
          <img src={linkedInLoginImage} alt="Sign in with LinkedIn" onClick={this.showPopup} style={{ marginTop: '25px' }} />
        </>
      );
      return (
        <div>
          {loggedIn ? contentWhenLoggedIn : contentWhenLoggedOut}
        </div>
      )
    };
  }

  return (
    <div
      className={
        loginboxVisibility ? "modal loginbox active" : "modal loginbox"
      }
      id="loginbox"
    >
      <div className="container">
        <a
          className="close"
          onClick={() => {
            setError("");
            setLoginboxVisibility(false);
          }}
        >
          X
        </a>
        <a className="logo">Login</a>
        <form onSubmit={login}>
          <div>
            <label>E-Mail:</label>
            <input
              type="email"
              placeholder="Please enter your email adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              placeholder="Please enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={loading ? "loading" : undefined}>Login</button>



          {error && <p>{error}</p>}
        </form>
        <div style={{ marginTop: '%20' }}>
          <a>
            <Appasd />
          </a>
        </div>
      </div>
    </div>
  );
}
