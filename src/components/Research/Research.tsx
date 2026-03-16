import "./Research.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Research = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Card reveals
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 40, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Heading reveals
        if (headingRef.current) {
            gsap.fromTo(headingRef.current,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return (
        <div className="research-section section-container" id="research">
            <div className="research-container">

                <p className="research-label">RESEARCH &amp; PUBLICATIONS</p>

                <h2 className="research-heading" ref={headingRef}>
                    IEEE<span> Published</span> Paper
                </h2>

                <div className="research-card" ref={cardRef}>
                    {/* Top bar glow */}
                    <div className="research-glow"></div>

                    {/* Badges */}
                    <div className="research-badges">
                        <span className="badge badge-ieee">IEEE</span>
                        <span className="badge badge-conf">ICCSC-2026</span>
                        <span className="badge badge-open">Published</span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="research-title">
                        Enhancing Trust in Digital Philanthropy: Design and Validation of an Integrated Multi-Role Donation Platform
                    </h3>

                    <p className="research-author">Priyanshu Raj, PIET, Parul University, Vadodara</p>

                    {/* Divider */}
                    <div className="research-divider"></div>

                    {/* Meta Grid */}
                    <div className="research-meta">
                        <div className="meta-item">
                            <span className="meta-label">CONFERENCE</span>
                            <span className="meta-value">2nd International Conference on Computing, Sciences and Communications</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">DATE</span>
                            <span className="meta-value">Feb 12–13, 2026</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">VENUE</span>
                            <span className="meta-value">ABES Engineering College, Ghaziabad, UP, India</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">SPONSORED BY</span>
                            <span className="meta-value">IEEE UP Section (India)</span>
                        </div>
                    </div>

                    <p className="research-abstract">
                        This paper designs and validates a multi-role digital donation platform that addresses transparency gaps in online philanthropy. It implements role-based access control for donors, NGOs, and corporate CSR teams, with real-time financial tracking, Cashfree payment integration, and structured audit-trail workflows. The system was tested for functional correctness, security, and end-to-end data integrity across all user roles.
                    </p>

                    {/* Tags */}
                    <div className="research-tags">
                        <span>Digital Philanthropy</span>
                        <span>Multi-Role Architecture</span>
                        <span>Trust Engineering</span>
                        <span>MERN Stack</span>
                        <span>Payment Gateway</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Research;
