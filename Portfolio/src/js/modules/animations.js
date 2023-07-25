function initAnimations() {
    const percents = document.querySelectorAll(".skills__ratings-percents"),
          scales = document.querySelectorAll(".skills__ratings-scale span"),
          scalesWrapper = document.querySelector(".skills__ratings"),
          sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    percents.forEach((item, i) => {
                        setTimeout(() => {
                            scales[i].style.width = item.innerHTML;
                        }, i * 75);
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    observer.observe(scalesWrapper);

    gsap.from(".skills__framework", {
        scale: 0,
        duration: 1,
        scrollTrigger: ".skills__frameworks",
        stagger: 0.1,
    });

    sections.forEach((section) => {
        if (!section.classList.contains("promo")) {
            gsap.from(section, {
                opacity: 0,
                y: 120,
                duration: 1,
                scrollTrigger: section,
            });
        }
    });
}

export default initAnimations;