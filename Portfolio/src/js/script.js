import initMenu from './modules/menu';
import linksScroll from './modules/scroll';
import initAnimations from './modules/animations';
import initForm from './modules/form';


document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");

    initMenu(menu);
    linksScroll(menu);
    initAnimations();
    initForm();
});