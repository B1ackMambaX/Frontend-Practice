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

linksToDescr.forEach((elem, key) => {
    elem.addEventListener('click', () => {
        descr[key].classList.add('catalog-item__list_active');
        cards[key].classList.remove('catalog-item__content_active');
    });
});

linksToCards.forEach((elem, key) => {
    elem.addEventListener('click', () => {
        descr[key].classList.remove('catalog-item__list_active');
        cards[key].classList.add('catalog-item__content_active');
    });
});

	  