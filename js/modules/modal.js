
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

  export default modal;
  export{opneModal};
  export{closeModal};