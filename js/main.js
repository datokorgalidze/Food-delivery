
    import tabs from './modules/tabs';
    import timer from './modules/timer';
    import modal from './modules/modal';
    import cards from './modules/cards';
    import forms from './modules/forms';
    import slider from './modules/slider';
    import calc from './modules/calc';
    import {opneModal} from './modules/modal';


    window.addEventListener('DOMContentLoaded',() => {
        
        const modalTimer = setTimeout(() => opneModal('.modal',modalTimer ),7000);

            tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
            timer('.timer','2023-12-31');
            cards();
            forms('form',modalTimer);
            calc();
            modal('[data-modal]','.modal',modalTimer);
            slider({
                container:'.offer__slider',
                slide:'.offer__slide',
                nextArrow:'.offer__slider-next',
                preArrow:'.offer__slider-prev',
                totalCaounter:'#total',
                currentCounter:'#current',
                slideField:'.offer__inner-slider',
                wrapper:'.offer__slider-wrapper'
            });

        });        




