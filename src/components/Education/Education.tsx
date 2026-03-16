import "./Education.css";

const Education = () => {
    return (
        <div className="education-section section-container" id="education">
            <div className="education-container">
                <h2 className="section-heading">
                    Education <span>&</span> Certifications
                </h2>
                <div className="education-info">
                    <div className="education-timeline">
                        <div className="education-dot"></div>
                    </div>

                    <div className="education-info-box">
                        <div className="education-info-in">
                            <div className="education-role">
                                <h4>B.Tech in Computer Science and Engineering</h4>
                                <h5>Parul University, Vadodara</h5>
                            </div>
                            <h3>2026</h3>
                        </div>
                        <p>
                            Specialization in Software Engineering, QA, Databases, and Applied AI. Published IEEE research paper during final year.
                        </p>
                    </div>

                    <div className="education-info-box">
                        <div className="education-info-in">
                            <div className="education-role">
                                <h4>Diploma in Computer Science</h4>
                                <h5>Kalinga University</h5>
                            </div>
                            <h3>2022</h3>
                        </div>
                        <p>
                            Foundational training in networking, databases, web development, and programming logic.
                        </p>
                    </div>

                    <div className="education-info-box">
                        <div className="education-info-in">
                            <div className="education-role">
                                <h4>AI Trainer Certification</h4>
                                <h5>micro1</h5>
                            </div>
                            <h3>2026</h3>
                        </div>
                        <p>
                            Certified for assessing AI systems quality, LLM evaluation workflows, and behavioral testing methodologies.
                        </p>
                    </div>

                    <div className="education-info-box">
                        <div className="education-info-in">
                            <div className="education-role">
                                <h4>Generative AI Mastermind</h4>
                                <h5>Outskill</h5>
                            </div>
                            <h3>2025</h3>
                        </div>
                        <p>
                            Advanced certification in large language models, prompt engineering, and AI deployment strategies.
                        </p>
                    </div>

                    <div className="education-info-box">
                        <div className="education-info-in">
                            <div className="education-role">
                                <h4>Introduction to Internet of Things</h4>
                                <h5>NPTEL</h5>
                            </div>
                            <h3>2025</h3>
                        </div>
                        <p>
                            Covered IoT architecture, sensor networks, embedded systems, and real-time data communication protocols.
                        </p>
                    </div>

                    <div className="education-info-box">
                        <div className="education-info-in">
                            <div className="education-role">
                                <h4>Theory of Computation</h4>
                                <h5>NPTEL, IIT Kanpur</h5>
                            </div>
                            <h3>2024</h3>
                        </div>
                        <p>
                            Formal languages, automata, Turing machines, and computational complexity. Core foundational CS theory.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Education;
