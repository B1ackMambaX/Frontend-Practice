const menu  = document.querySelector('.menu');

//Menu visability switcher
document.querySelector('.hamburger').addEventListener('click', () => {
    menu.classList.add('active');
});

document.querySelector('.menu__close').addEventListener('click', () => {
    menu.classList.remove('active');
});