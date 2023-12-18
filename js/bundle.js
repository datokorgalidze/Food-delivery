/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

 function calc(){
      
    const result = document.querySelector('.calculating__result span');
    let sex = 'female',height,weight,age,
        ratio = 1.375;

    function calcTotal(){
       if(!sex || !height || !weight || !age || !ratio){
           result.textContent = '____';
           return; 
       }
       if(sex === 'female'){
           result.textContent = Math.round(( (10 * weight) + (6.25 * height) - (5 * age)-161) * ratio);
       }else{
           result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
       }
    }

    calcTotal();


    function getStaticInformation ( parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

         elements.forEach(elem => {
            elem.addEventListener('click',(e) => {
               if(e.target.getAttribute('data-ratio')){
                  ratio = +e.target.getAttribute('data-ratio');         
               }else{
                  sex = e.target.getAttribute('id');
               } 

               elements.forEach(elem =>{
                   elem.classList.remove(activeClass);
               });

               e.target.classList.add(activeClass);

               calcTotal();
           });
         })

    }

    getStaticInformation('#gender','calculating__choose-item_active'); 
    getStaticInformation('.calculating__choose_big','calculating__choose-item_active');
    
    function getDynamicInfoemation(selector){
       const input = document.querySelector(selector)
       
       input.addEventListener('input',() => {
              if(input.value.match(/\D/g)){
                input.style.border = '1px solid red ';
              }else{
               input.style.border = 'none';
              }

             switch(input.getAttribute('id')){
                case 'height':
                   height = +input.value;
                   break;
                case 'weight':
                   weight = +input.value;
                   break;
                case 'age':
                   age = +input.value
                   break;      
             }
             calcTotal();
       });
    }

    getDynamicInfoemation('#height');
    getDynamicInfoemation('#weight');
    getDynamicInfoemation('#age');
 }


 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

   function cards(){
    class MenuCard {
        constructor(img, alt,title , descr, price, parentSelector){
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 3;
            this.changeToGEl();
        }
        changeToGEl(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Price:</div>
                <div class="menu__item-total"><span>${this.price}</span> Gel/day</div>
            </div>
        </div>

          `;

          this.parent.append(element);
        }
    }

    const getResurce = async (url,) => {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error (`could not fetch ${url}, status:${res.status}`);
        } 

        return await res.json();
   };


   getResurce('./db.json')
         .then(data =>{
            data.menu.forEach(({img, altimg, title, descr, price}) =>{
                new MenuCard(img, altimg, title, descr, price, '.menu .container' ).render();
            });
         });
   }

     /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
   
   



   function forms(formSelector,modalTimer){
        const forms = document.querySelectorAll(formSelector,);

        const message = {
        loading:'loading',
        success:'Thank you! We will contact you soon',
        failure:'Something is wrong'
        };


        forms.forEach(item =>{
            bindPostData(item);
        });

        const postData = async (url,data) =>{
         const res = await fetch(url,{
          method:'POST',
          headers:{
              'Content-type':'application/json'
          },
          body:data 
         });
         return await res.json();
    };


         function bindPostData(form){
            form.addEventListener('submit', (e)=>{
               e.preventDefault();

               const statusMessage = document.createElement('div');
               statusMessage.textContent = message.loading;
               statusMessage.style.cssText = `
                      display:block;
                      margin: 0 auto;
               `;

               form.append(statusMessage);     
               
               const formData = new FormData(form);
                

              const json = JSON.stringify(Object.fromEntries(formData.entries()));
           
              postData('http://localhost:3000/requests',json)
              .then(data =>{
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove(); 
                }).catch(()=>{
                    showThanksModal(message.failure); 
                }).finally(()=>{
                  form.reset();
              })

             
           });  
         }  
         
       function showThanksModal(message){
          const modalDialog = document.querySelector('.modal__dialog');
                modalDialog.classList.add('hide');
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.opneModal)('.modal',modalTimer);
                
         const thanksModal = document.createElement('div');
               thanksModal.classList.add('modal__dialog');
               
               thanksModal.innerHTML = `
                    <div class="modal__content">
                       <div class="modal__close" data-close>x</div>
                       <div class="modal__title">${message} </div> 
                    </div>    
               `
          document.querySelector('.modal').append(thanksModal);
          
          setTimeout(()=>{
             thanksModal.remove();
             modalDialog.classList.add('show');
             modalDialog.classList.remove('hide');
             (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); 
          },4000);
       }  
   }

   /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   opneModal: () => (/* binding */ opneModal)
/* harmony export */ });

function opneModal(modalSelector,modalTimer){
            const modal = document.querySelector(modalSelector);
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            if(modalTimer){
            clearInterval(modalTimer);
            }
            
        }

        function closeModal(modalSelector){
            const modal = document.querySelector(modalSelector);  
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }   


        function modal(trigerSelector,modalSelector,modalTimer){
            const modalTriger = document.querySelectorAll(trigerSelector),
            modal = document.querySelector(modalSelector);
        
            
            modalTriger.forEach(btn => {
            btn.addEventListener('click',()=> opneModal(modalSelector,modalTimer))
                    
        });
        

        modal.addEventListener('click', (e) =>{
            if(e.target === modal || e.target.getAttribute('data-close')== ''){
                closeModal(modalSelector);
            }
        }); 
        
    

        modal.addEventListener('click', (e) =>{
            if(e.target === modal || e.target.getAttribute('data-close')== ''){
                closeModal(modalSelector);
            }
        });


         document.addEventListener('keydown', (e) =>{
            if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

  
    

   function showModalByScroll(){
       if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
           opneModal(modalSelector,modalTimer);
           window.removeEventListener('scroll',showModalByScroll);
       }
   }

   window.addEventListener('scroll',showModalByScroll);


    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
           closeModal(modalSelector);
        }
    });


   function showModalByScroll(){
       if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
           opneModal(modalSelector,modalTimer);
           window.removeEventListener('scroll',showModalByScroll);
       }
   }

   window.addEventListener('scroll',showModalByScroll);
}

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
  
  

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


    function slider({container,slide,nextArrow,preArrow,totalCaounter,currentCounter,slideField,wrapper,}){
            const slides = document.querySelectorAll(slide),
            slider = document.querySelector(container),
            prev = document.querySelector(preArrow),
            next = document.querySelector(nextArrow),
            current = document.querySelector (currentCounter),
            total = document.querySelector (totalCaounter,),
            slidesWraper = document.querySelector(wrapper),
            fieldSlides = document.querySelector (slideField),
            width = window.getComputedStyle(slidesWraper).width;

                
            let slideIndex = 1;
            let offset = 0;

            if(slides.length < 10 ){
                total.textContent = `0${slides.length}`;
                current.textContent = `0${slideIndex}`;
            }else{
                total.textContent = slides.length;
                current.textContent = slideIndex;
            }

            fieldSlides.style.width = 100 * slides.length +'%';
            fieldSlides.style.display = 'flex';
            fieldSlides.style.transition = '0.5s all';

            slidesWraper.style.overflow = 'hidden';

            slides.forEach(slide => {
            slide.style.width = width;
            });


            slider.style.position = 'relative';

            const indicators = document.createElement('ol'),
                dots = [];
            indicators.classList.add('carousel-indicators');
            slider.append(indicators);

            for(let i = 0; i < slides.length; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to',i + 1 )
            dot.classList.add('dot')
            if( i == 0){
                dot.style.opacity = 1; 
            }
            indicators.append(dot);
            dots.push(dot);
            }


            next.addEventListener('click',() =>{
            if(offset == +width.replace(/\D/g, '') * (slides.length - 1)){
                offset = 0;
            }else{
                offset += +width.replace(/\D/g, '');
            } 

            fieldSlides.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == slides.length){
                slideIndex = 1;
            }else{
                slideIndex++;
            }
            
            if(slideIndex < 10){
                current.textContent = `0${slideIndex}`;
            }else{
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1; 
            });

            prev.addEventListener('click', ()=>{
            if(offset == 0){
                offset = +width.replace(/\D/g, '') * (slides.length - 1);
            }else{
                offset-= +width.replace(/\D/g, '');
            }  
            fieldSlides.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == 1){
                slideIndex = slides.length;
            }else{
                slideIndex--;
            }
            
            if(slides.length < 10){
                current.textContent = `0${slideIndex}`;
            }else{
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1; 
            });

            dots.forEach(dot => {
                dot.addEventListener('click',(e)=>{
                const slideTo = e.target.getAttribute('data-slide-to');
                slideIndex = slideTo;
                offset = +width.replace(/\D/g, '') * (slideTo -1);
                fieldSlides.style.transform = `translateX(-${offset}px)`;
                
                if(slides.length < 10){
                    current.textContent = `0${slideIndex}`;
                }else{
                    current.textContent = slideIndex;
                }
                
                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = 1; 
            });
            });

            }

    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

 function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeCass){


    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
          
          function hideTabContent(){
             tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show','fade');
             });

            tabs.forEach (item => {
                item.classList.remove(activeCass);
            });
             
         }
         
          function showTabContent(i = 0){
                tabsContent[i].classList.add ('show', 'fade');
                tabsContent[i].classList.remove ('hide');
                tabs[i].classList.add(activeCass);
         }

            hideTabContent();
            showTabContent();

            tabsParent.addEventListener('click', (event) => {
                const target = event.target;

                if (target && target.classList.contains(tabsSelector.slice(1))) {
                    tabs.forEach((item, i) => {
                        if (target == item) {
                            hideTabContent();
                            showTabContent(i);
                        }
                    });
                }
            });
   }

   /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
 
 function timer (id,deadline){
    

    function getTimerReaminig(endtime){
        let days,hours,minutes,secondes;
        const t = Date.parse(endtime) - Date.parse(new Date());
            if(t <= 0){
                days = 0;
                hours = 0;
                minutes = 0;
                secondes = 0;
            }else{
                days = Math.floor(t / (1000 * 60 * 60 *24)),
                hours = Math.floor((t / (1000 *60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                secondes = Math.floor((t / 1000) % 60);
            }
             

             return {
                'total':t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'secondes': secondes
             };
    }


    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;           
        }else{
            return num;
        }
    }


    function setClock(selector,endtime){
        const timer = document.querySelector(selector),
              days =  timer.querySelector('#days'),
              hours =  timer.querySelector('#hours'),
              minutes =  timer.querySelector('#minutes'), 
              secondes =  timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock,1000);

              updateClock();
              
        function updateClock(){
            const t = getTimerReaminig(endtime);
                  
                  days.innerHTML = getZero(t.days);
                  hours.innerHTML = getZero(t.hours);
                  minutes.innerHTML = getZero(t.minutes);
                  secondes.innerHTML = getZero(t.secondes);

                if(t.total <= 0){
                    clearInterval(timeInterval);
                }  
        }      
    }


      setClock(id,deadline);
 }


 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    
    
    
    
    
    
    
    


    window.addEventListener('DOMContentLoaded',() => {
        
        const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.opneModal)('.modal',modalTimer ),7000);

            (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
            (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer','2023-12-31');
            (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
            (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form',modalTimer);
            (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
            (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]','.modal',modalTimer);
            (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
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





})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map