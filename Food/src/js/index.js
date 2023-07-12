import calc from "./modules/calc";
import cards from "./modules/cards";
import initForms from "./modules/forms";
import { modal, showModal } from "./modules/modal";
import slider from "./modules/slider";
import initTabs from "./modules/tabs";
import setTimer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(() => showModal(".modal", modalTimerId), 50000);
	
	modal("[data-modal]", ".modal", modalTimerId);
	setTimer(".timer", "2023-08-20");
	calc();
	cards(".menu__field .container");
	initForms("form", modalTimerId);
	slider({
			prev: ".offer__slider-prev",
			next: ".offer__slider-next",
			slideSelector: ".offer__slide",
			container: ".offer__slider",
			wrapper: ".offer__slider-wrapper",
			field:	".offer__slider-inner"
		});
	initTabs(".tabheader__item", ".tabcontent");
});
