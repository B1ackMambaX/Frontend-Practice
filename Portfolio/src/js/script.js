const menu  = document.querySelector('.menu'),
        percents = document.querySelectorAll('.skills__ratings-percents'),
        scales = document.querySelectorAll('.skills__ratings-scale span');

//Menu visability switcher
document.querySelector('.hamburger').addEventListener('click', () => {
    menu.classList.add('active');
});

document.querySelector('.menu__close').addEventListener('click', () => {
    menu.classList.remove('active');
});

//Percents counters
percents.forEach((item, number) => {
    scales[number].style.width = item.innerHTML;
});