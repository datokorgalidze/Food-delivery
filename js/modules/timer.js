 
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


 export default timer;