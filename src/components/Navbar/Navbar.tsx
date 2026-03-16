import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "../HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./Navbar.css";

export let smoother: any;

const Navbar = () => {
  useEffect(() => {
    smoother = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    smoother.stop();
    smoother.scrollTo(0, { immediate: true });

    function raf(time: number) {
      smoother.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    smoother.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      smoother.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          if (section) smoother.scrollTo(section);
        }
      });
    });

    return () => {
      smoother.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          PR
        </a>
        <a
          href="mailto:priyanshubth6742@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          priyanshubth6742@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#skills" href="#skills">
              <HoverLinks text="SKILLS" />
            </a>
          </li>
          <li>
            <a data-href="#experience" href="#experience">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education">
              <HoverLinks text="EDUCATION" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
