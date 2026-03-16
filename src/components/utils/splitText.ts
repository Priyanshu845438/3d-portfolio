import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: any;
}

gsap.registerPlugin(ScrollTrigger);

export function manualSplit(element: HTMLElement, type: "words" | "chars") {
    const split = new SplitType(element, { types: type });
    return type === "words" ? split.words : split.chars;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title:not(.what-box .title)");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    
    if (para.split) {
      para.split.revert();
    }
    para.split = new SplitType(para, { types: "words" });

    if (para.split.words && para.split.words.length > 0) {
      para.anim = gsap.fromTo(
        para.split.words,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: para.parentElement?.parentElement,
            toggleActions: ToggleAction,
            start: TriggerStart,
          },
          duration: 1,
          ease: "power3.out",
          y: 0,
          stagger: 0.02,
        }
      );
    }
  });

  titles.forEach((title: ParaElement) => {
    if (title.split) {
      title.split.revert();
    }
    title.split = new SplitType(title, { types: "chars" });

    if (title.split.chars && title.split.chars.length > 0) {
      title.anim = gsap.fromTo(
        title.split.chars,
        { autoAlpha: 0, y: 80, rotate: 10 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: title.parentElement?.parentElement,
            toggleActions: ToggleAction,
            start: TriggerStart,
          },
          duration: 0.8,
          ease: "power2.inOut",
          y: 0,
          rotate: 0,
          stagger: 0.03,
        }
      );
    }
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
