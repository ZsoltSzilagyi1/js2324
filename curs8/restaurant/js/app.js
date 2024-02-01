// variabila menu este definita in data.js

// get parent element
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");
// display all items when page loads
window.addEventListener("DOMContentLoaded", function () {
    displayMenuItems(menu);
    displayMenuButtons();
});

function displayMenuItems(menuItems) {
   console.log(menuItems);
   let newArr = [];
   menuItems.forEach((element) => {
    let myElement = `
    <article class="menu-item">
    <img src="${element.img}" alt="menu item" class="photo" />
    <div class="item-info">
      <header>
        <h4>${element.title}</h4>
        <h4 class="price">${element.price} RON</h4>
      </header>
      <p class="item-text">${element.desc}</p>
      <p>${element.category}</p>
    </div>
  </article>
    `
    newArr.push(myElement);
   });
   let myMeniu = newArr.join("")
   sectionCenter.innerHTML = myMeniu;
}


function displayMenuButtons() {
    const categories = menu.reduce(
        function (values, item){
            if(!values.includes(item.category)){
                values.push(item.category);
            }
            return values;
        },
        ["all"]
    );
    console.log(categories);


        const categoryBtns = categories.map(function (category, index){
            let btn_nr = 'btn' + (index + 1);
            const categoryRo = {
                all: 'Tot',
                breakfast: 'Mic Dejun',
                lunch: 'Pranz',
                dinner: 'Cina',
                shakes: 'Bauturi'
            }
            return `<button type="button" class="filter-btn" data-id=${category} data-nr=${btn_nr}>
            ${categoryRo[category]}
            </button>`;
        }).join("");

        btnContainer.innerHTML = categoryBtns;


        const filterBtns = btnContainer.querySelectorAll(".filter-btn");
        filterBtns.forEach(function (btn){
            btn.addEventListener("click", function (e){
                const category = e.currentTarget.dataset.id;
                const menuCategory = menu.filter(function (menuItem){
                    if(menuItem.category == category){
                     return menuItem;
                    }
                });
                if (category === "all"){
                    displayMenuItems(menu);
                }else{
                    displayMenuItems(menuCategory);
                }
                counterClick(e.currentTarget) 
            });
        });
   
}


 function counterClick(btn) {
     const bntCurrent =  document.getElementById(btn.dataset.nr);
     let contNumber =  Number(bntCurrent.textContent)     
     bntCurrent.textContent = contNumber + 1;
 }