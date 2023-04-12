const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    speed: 800
});

document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
});

const tab = document.querySelector('.catalog__tabs');
const tabs = document.querySelectorAll('.catalog__tab');
const pages = document.querySelectorAll('.catalog__content');
const linksToDescr = document.querySelectorAll('.catalog-item__link');
const descr = document.querySelectorAll('.catalog-item__list');
const linksToCards = document.querySelectorAll('.catalog-item__back');
const cards = document.querySelectorAll('.catalog-item__content');

//Catalog tabs
function pagesSwitcher(tabsWrapper, curTab, activityClassTabs, pages, activityClassPages){
    for(let i = 0; i < tabsWrapper.children.length; i++) {
        if(tabsWrapper.children[i] == curTab){
            tabsWrapper.children[i].classList.add(activityClassTabs);
            pages[i].classList.add(activityClassPages);
        }
        else {
            tabsWrapper.children[i].classList.remove(activityClassTabs);
            pages[i].classList.remove(activityClassPages);
        }
    }
}

tabs.forEach((elem, key, arr) => {
    elem.addEventListener('click',() => {
	pagesSwitcher(tab, arr[key], 'catalog__tab_active', pages, 'catalog__content_active');
    });
});

//Catalog items switcher
linksToDescr.forEach((elem, key) => {
    elem.addEventListener('click', (event) => {
        descr[key].classList.add('catalog-item__list_active');
        cards[key].classList.remove('catalog-item__content_active');
        event.preventDefault();
    });
});

linksToCards.forEach((elem, key) => {
    elem.addEventListener('click', (event) => {
        descr[key].classList.remove('catalog-item__list_active');
        cards[key].classList.add('catalog-item__content_active');
        event.preventDefault();
    });
});

//Modal
$(document).ready(function(){
    $('[data-modal=consultation]').on('click', () => {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', () => {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each((i) => {
        $(this).on('click', () => {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
});


	  