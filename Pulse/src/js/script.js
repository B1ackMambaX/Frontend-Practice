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


$(document).ready(function(){
    //Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //Validation
    function validateForm(form){
        $(form).validate({
            rules:{
                name:"required",
                phone:"required",
                email: {
                    required: true,
                    email: true
                }
            },
        
            messages: {
                name: "Пожалуйста, введите свое имя",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                },
                phone: "Пожалуйста, введите свой номер телефона"
            }
        });
    }
    validateForm('#main-form');
    validateForm("#consultation form");
    validateForm('#order form');

    //Phone mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Mailer
    $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).validate()){
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup
    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //Animations
    new WOW().init();
});	  