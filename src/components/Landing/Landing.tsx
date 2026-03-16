import { PropsWithChildren } from "react";
import "./Landing.css";

const Landing = ({ children }: PropsWithChildren) => {

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-content">
            <h2 className="landing-hello">Hello I am</h2>
            <h1 className="landing-name">PRIYANSHU RAJ</h1>
            <h3 className="landing-title">Aspiring Data Engineer</h3>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
