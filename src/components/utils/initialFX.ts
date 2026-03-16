import SplitType from "split-type";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother) smoother.start();
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  const targets = [".landing-info h3", ".landing-p", ".landing-intro h2", ".landing-intro h1"];
  const allWords: HTMLElement[] = [];
  
  targets.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
          const split = new SplitType(el as HTMLElement, { types: "words" });
          if (split.words) {
              allWords.push(...split.words);
          }
      }
  });

  if (allWords.length > 0) {
    gsap.fromTo(
      allWords,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.05,
        delay: 0.3,
      }
    );
  }

  const navTargets = [".landing-buttons", ".landing-stats", ".header", ".icons-section", ".nav-fade"];
  const navEls = navTargets.map(sel => document.querySelector(sel)).filter(Boolean);

  if (navEls.length > 0) {
    gsap.fromTo(
      navEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.8,
      }
    );
  }
}
