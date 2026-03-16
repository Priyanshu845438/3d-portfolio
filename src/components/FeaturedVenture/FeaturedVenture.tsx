import "./FeaturedVenture.css";
import { MdLanguage } from "react-icons/md";


const FeaturedVenture = () => {
    return (
        <div className="venture-section section-container" id="venture">
            <div className="venture-container">

                {/* Section Label */}
                <p className="section-label">OPEN SOURCE VENTURE</p>

                {/* Main Heading */}
                <h2 className="section-heading">
                    Review<span> Monkey</span>
                </h2>

                {/* Split layout */}
                <div className="venture-body">
                    {/* Left: Info */}
                    <div className="venture-info">
                        <p className="venture-category">SaaS · Full-Stack · Product Design</p>
                        <p className="venture-status">🟢 LIVE &nbsp;·&nbsp; Open Source &nbsp;·&nbsp; Paywall Coming</p>
                        <p className="venture-desc">
                            Review Monkey helps businesses collect, manage, and analyze customer reviews in one place.
                            Built end-to-end as a SaaS product, currently live and open to all users, with a monetized plan coming soon.
                        </p>
                        <div className="venture-tags">
                            <span>SaaS</span>
                            <span>Full-Stack</span>
                            <span>Product Design</span>
                            <span>Open Source</span>
                        </div>
                        <a
                            href="https://reviewmonkey.co.in"
                            target="_blank"
                            rel="noreferrer"
                            className="venture-link"
                        >
                            <MdLanguage size={18} />
                            reviewmonkey.co.in
                        </a>
                    </div>

                    {/* Right: 3D Character */}
                    <div className="venture-visual">
                        <div className="venture-character-container">
                            <video
                                src="/images/featured 1.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="venture-video"
                            />
                        </div>
                    </div>
                </div>
                <div className="venture-divider"></div>
            </div>
        </div>
    );
};
export default FeaturedVenture;
