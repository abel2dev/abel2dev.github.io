function setParallaxPosition(element, multiplier) {
  const sectionTop = element.getBoundingClientRect().top + window.scrollY;
  const y = multiplier * (window.scrollY - sectionTop);
  element.style.backgroundPosition = `center ${y}px`;
}

function backgroundImageParallax(element, multiplier = 0.5) {
  const scrollMultiplier = 1 - multiplier;
  const update = () => setParallaxPosition(element, scrollMultiplier);

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function backgroundImageParallax2(element, multiplier = 0.5) {
  const scrollMultiplier = 1 - multiplier;
  element.style.backgroundAttachment = "fixed";

  const update = () => {
    if (window.innerWidth > 768) {
      const sectionTop = element.getBoundingClientRect().top + window.scrollY;
      const y = Math.round(
        scrollMultiplier * (sectionTop - window.scrollY) - 186
      );
      element.style.backgroundPosition = `center ${y}px`;
    } else {
      element.style.backgroundPosition = "center";
    }
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function easeInOutExpo(progress) {
  if (progress === 0 || progress === 1) return progress;

  if (progress < 0.5) {
    return Math.pow(2, 20 * progress - 10) / 2;
  }

  return (2 - Math.pow(2, -20 * progress + 10)) / 2;
}

let navigationFrame = null;

function scrollToTarget(target, duration = 600) {
  if (navigationFrame !== null) {
    cancelAnimationFrame(navigationFrame);
  }

  const startY = window.scrollY;
  const endY = target.getBoundingClientRect().top + startY;
  const startTime = performance.now();

  function animate(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const easedProgress = easeInOutExpo(progress);
    window.scrollTo(0, startY + (endY - startY) * easedProgress);

    if (progress < 1) {
      navigationFrame = requestAnimationFrame(animate);
    } else {
      navigationFrame = null;
    }
  }

  navigationFrame = requestAnimationFrame(animate);
}

function initializeSinglePageNavigation() {
  const nav = document.querySelector(".site-nav");
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, "", hash);
    });
  });

  window.addEventListener("popstate", () => {
    if (!location.hash) return;

    const target = document.querySelector(location.hash);
    if (target) scrollToTarget(target);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-20% 0px -65% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".parallax-hero");
  if (hero) backgroundImageParallax(hero, 0.30);

  const secondParallax = document.querySelector("#bare_minimum_2");
  if (secondParallax) backgroundImageParallax2(secondParallax, 0.80);

  const thirdParallax = document.querySelector("#bare_minimum_3");
  if (thirdParallax) backgroundImageParallax2(thirdParallax, 0.80);

  if (document.querySelector(".site-nav")) {
    initializeSinglePageNavigation();
  }
});
