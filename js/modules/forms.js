   
   import {opneModal,closeModal } from "./modal";



   function forms(formSelector,modalTimer){
        const forms = document.querySelectorAll(formSelector,);

        const message = {
        loading:'',
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
                opneModal('.modal',modalTimer);
                
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
             closeModal('.modal'); 
          },4000);
       }  
   }

   export default forms;