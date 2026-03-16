import "./About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am building my career as a <b>Data Engineer</b> with a focus on data pipelines, data quality, observability, and how data behaves in real world systems. I approach data with an <b>engineering mindset</b> and focus on where data breaks, drifts, or loses meaning over time.
        </p>

        <p className="para">
          My background includes QA Engineering, Backend Systems, AI Model Evaluation, and Web Development. This experience helps me understand the full lifecycle of data from the source to the product backend.
        </p>

        <p className="para">
          I am driven by continuous learning and system architecture. I have also published research with <b>IEEE</b> on data transparency and platform assurance.
        </p>
      </div>
    </div>
  );
};

export default About;