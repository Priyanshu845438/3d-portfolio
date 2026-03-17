import "./Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2 className="section-heading">
          My career <span>&</span> Experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>QA Engineer</h4>
                <h5>AppTestify | Full-time</h5>
              </div>
              <h3>Aug 2021 - Aug 2023</h3>
            </div>
            <p>
              Performed functional and regression testing for web applications.
              Worked closely with backend developers to identify root causes of defects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer</h4>
                <h5>MarqSet Branding | Part-time</h5>
              </div>
              <h3>Apr 2024 - May 2024</h3>
            </div>
            <p>
              Developed and customized WordPress websites for client projects.
              Managed content, layouts, plugins, and PHP/MySQL backend tasks.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Backend &amp; QA Engineer</h4>
                <h5>Acadify Solution | Apprenticeship</h5>
              </div>
              <h3>Aug 2024 - Nov 2025</h3>
            </div>
            <p>
              Developed robust backend APIs and performed core system-level assessment to establish reliable functionality.
              Worked across multi-tenant database architectures and backend structures.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Systems Evaluation</h4>
                <h5>Acadify Solution | Full-time</h5>
              </div>
              <h3>Nov 2025 - Now</h3>
            </div>
            <p>
              Designed and executed enterprise-grade evaluation workflows for production-level LLM systems.
              Led effort to map out failure patterns and introduce mitigations onto live system integrations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Engineer</h4>
                <h5>Krutsha | Apprenticeship</h5>
              </div>
              <h3>Feb 2026 - Now</h3>
            </div>
            <p>
              Orchestrating scalable data workflows. Building high-performance pipelines for processing high-volume datasets while designing automated anomaly detection triggers for production dashboards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
