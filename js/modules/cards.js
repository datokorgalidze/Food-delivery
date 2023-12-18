
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

     export default cards;