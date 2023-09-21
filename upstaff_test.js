
const addSpecialDiv = () => {

    const insernNewDiv = () =>{
        const allProducts = document.querySelector('.product-items');
        const productsList = allProducts.querySelectorAll('.product-item');
        const myDiv = divCreator();

        allProducts.insertBefore(myDiv, productsList[4]);
    };

    const divCreator = () => {
        const windowWidth = window.innerWidth;
        const mainBox = document.createElement('div');
        const contentBox = document.createElement('div');
        
        const randomTxt = document.createElement('span');
        randomTxt.textContent = 'Dolor laborum qui mollit ad magna tempor culpa qui excepteur';
        
        mainBox.id = 'mySpecialDiv';
        mainBox.appendChild(contentBox);
        contentBox.appendChild(randomTxt);
        
        mainBox.style.cssText= `
            padding: 1rem;
            display: flex;
            box-sizing: border-box;
            margin: 1rem 0;
            width: ${windowWidth > 1199 ? '50%' :
            windowWidth > 768 ? '63%' : '100%'};
            height: ${windowWidth <= 768 ? "554px" : "auto"};
            `;

        contentBox.style.cssText = ` 
            display: inherit;
            width: 100%;
            border-radius: 10px;
            padding: 10px;
            margin: 0 0 1rem;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: #fff;
            box-shadow: 1px 1px 5px 5px #f1f1f1;
            `;

        return mainBox;
    }

    window.addEventListener('resize', () => {
        const mySpetialDiv = document.querySelector('#mySpecialDiv');
        
        if (mySpetialDiv) {
            mySpetialDiv.style.width = window.innerWidth > 1199 ? '50%' : window.innerWidth > 767 ? '63%' : '100%';
            mySpetialDiv.style.height = window.innerWidth < 768 ? '554px' : 'auto';
        }
    })

    insernNewDiv();
};

addSpecialDiv();

