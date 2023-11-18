import quickbox from "../../images/quickbox.png";

import box1 from "../../images/box1.png";
import box2 from "../../images/box2.png";
import box3 from "../../images/box3.png";
import box4 from "../../images/box5.png";
import box6 from "../../images/box6.png";
import box7 from "../../images/box7.png";
import box8 from "../../images/box8.png";
import box9 from "../../images/box9.png";

export default function Sidebox() {
  return (
    <div>
      <section className="section">
        <div className="quickbox">
          <img src={quickbox} alt="" />
          <div>
            <i>Talenter Suite™</i>
            <h3>We are changing recruiting forever</h3>
            <p>
              Talenter has revolutionized the way businesses find and manage top
              talent. With Talenter, you can access the very best talent on
              demand, and use our powerful suite of tools to manage your
              workforce efficiently and effectively.
            </p>
          </div>
        </div>
        <div className="container">
          <ul className="quicklist">
            <li>
              <img src={box1} alt="" />
              <b>Eliminate guesswork</b>
              <p>
                Every applicant is put through a rigorous testing and vetting
                process. We want to make sure that our members are top talent,
                and can contribute to the network in a meaningful way.
              </p>
            </li>
            <li>
              <img src={box2} alt="" />
              <b>Delegate it all to our team</b>
              <p>
                Fully managed solutions can help you deliver complex projects
                quickly and efficiently. By taking advantage of expert resources
                and tools, you can focus on your core business goals and
                objectives.
              </p>
            </li>
            <li>
              <img src={box3} alt="" />
              <b>Shortlist of qualified talent</b>
              <p>
                Recruiters will provide you pre-vetted shortlists from our
                global community of professionals. You'll be able to interview
                and hire the best talent in your desired field with just a few
                clicks.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="section sub">
        <div className="container">
          <div className="section__left">
            <i>For Clients</i>
            <h3>Get matched with the right talent to scale your business</h3>
            <p>
              Find the perfect freelancer for your specific needs and
              requirements with just one search. With AI-powered matching, we do
              away with all guesswork by instantly connecting talent in demand
              to companies that need their services most.
            </p>
          </div>
          <div className="section__right">
            <img src={box4} alt="" />
          </div>
        </div>
        <div className="container">
          <ul className="quicklist">
            <li>
              <img src={box6} alt="" />
              <b>Eliminate guesswork</b>
              <p>
                Every applicant is put through a rigorous testing and vetting
                process. We want to make sure that our members are top talent,
                and can contribute to the network in a meaningful way.
              </p>
            </li>
            <li>
              <img src={box7} alt="" />
              <b>Delegate it all to our team</b>
              <p>
                Fully managed solutions can help you deliver complex projects
                quickly and efficiently. By taking advantage of expert resources
                and tools, you can focus on your core business goals and
                objectives.
              </p>
            </li>
            <li>
              <img src={box8} alt="" />
              <b>Shortlist of qualified talent</b>
              <p>
                Recruiters will provide you pre-vetted shortlists from our
                global community of professionals. You'll be able to interview
                and hire the best talent in your desired field with just a few
                clicks.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="section sub customized">
        <div className="container">
          <div className="section__left">
            <i>For Talent</i>
            <h3>Find freelance work that pays monthly</h3>
            <p>
              You have the freedom to control when, where, and how you work
              <ul>
                <li>
                  AI-powered matching helps to connect with the right clients
                  and projects for your skillset
                </li>
                <li>Ceate your profile and explore different ways to earn</li>
              </ul>
            </p>
          </div>
          <div className="section__right">
            <img src={box9} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
