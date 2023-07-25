function scrollToSection(link) {
	const ref = link.getAttribute("href");
	const offsetTop = document.querySelector(ref).offsetTop;
	scroll({
		top: offsetTop,
		behavior: "smooth",
	});
}

function linksScroll(menu) {
    const links = document.querySelectorAll(".menu__link a"),
          buttonsWrapper = document.querySelector(".promo__btns"),
          pageUp = document.querySelector(".pageUp"),
          bar = document.querySelector('.bar');

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            menu.classList.remove("active");
            setTimeout(scrollToSection, 50, link);
        });
    });

    buttonsWrapper.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            e.preventDefault();
            scrollToSection(e.target);
        }
    });

    pageUp.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(pageUp);
    });

    window.addEventListener("scroll", () => {
        const nextSectionHalf = document.querySelector('.about').clientHeight / 2;
        if(scrollY > document.documentElement.clientHeight + nextSectionHalf) {
            pageUp.classList.add('pageUp_active');
            bar.classList.add('bar_active');
        } else {
            pageUp.classList.remove('pageUp_active');
            bar.classList.remove('bar_active');
        }
    });
}

export default linksScroll;