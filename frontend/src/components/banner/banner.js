import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import banner3 from "../../images/banner3.png";

export default function Banner({ setRegisterboxVisibility }) {
  const handleLetsStartClick = () => {
    setRegisterboxVisibility(true);
  };

  return (
    <section className="banner">
      <div className="container">
        <div className="banner__left">
          <h1>
            Get the <b>perfect</b> talent for your project
          </h1>
          <p>
            Talenter makes it easy to get top-notch talents with AI-based
            matching, talents who can help you get the job done right
          </p>
          <h3>
            <a className="banner__left__button" onClick={handleLetsStartClick}>
              Let's Start
            </a>
          </h3>
        </div>
        <div className="banner__right">
          <img src={banner1} alt="" />
          <div>
            <img src={banner2} alt="" />
            <img src={banner3} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
