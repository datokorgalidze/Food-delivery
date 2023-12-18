

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

    export default slider;