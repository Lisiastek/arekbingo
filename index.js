// configuration

const areklist = [
    "C++",
    "Struktura programu si plas plas",
    "Mirosław Zelent",
    "sala 28",
    "stek",
    "język w innym języku",
    "sygnalizacja",
    "zaliczenie z nienacka",
    "arek z nienacka",
    "za łatwe więc 3",
    "ściągacie",
    "arek w rękawie",
    "myśli samobójcze",
    "brak miejsca w klasie",
    "wypierdoliło komputer"
];

const areaID = 'area';
const regenerateBtnID = "regenerate";
const sizeInputID = 'regeneratesize';
const lengthErrorID = 'lengtherror';
const boxclass = 'box';
const infoID = 'info';



// before initalization
let area;
let regenerateBtn;
let lengthError;
let sizeInput;
let info;
let completed = 0;
let maxcompleted = 9;


// initialization

document.addEventListener("DOMContentLoaded",
function(){
    area = document.getElementById(areaID);
    regenerateBtn = document.getElementById(regenerateBtnID);
    lengthError = document.getElementById(lengthErrorID);
    sizeInput = document.getElementById(sizeInputID);
    info = document.getElementById(infoID);



    clearArea();
    generateArea(3);

    info.innerHTML = `${areklist.length} arek's entries ${sizeInput.value}x${sizeInput.value} BINGO ${completed}/${maxcompleted}`;
    

    regenerateBtn.onclick = function(){      

        lengthError.style.display = "none";
    

        if(!(areklist.length >= Number(sizeInput.value)*Number(sizeInput.value))){
            lengthError.style.display = "block";
            return;
        }

 
        clearArea();
        generateArea(sizeInput.value);

        

        let elements = document.querySelectorAll("."+boxclass);
        let _temp;

        

        switch(Number(sizeInput.value)){
            
            case 1:
                _temp = "100%";
                break;
            case 2:
                _temp = "50%";
                break;
            case 3:
            default:
                _temp = "33.33%";
                break;
            case 4:
                _temp = "25%";
                break;        
            case 5:
                _temp = "20%";
                break; 
            case 6:
                _temp = "16.66%";
                break;     
                
        }

        completed = 0;
        maxcompleted = Number(sizeInput.value)*Number(sizeInput.value);
        regenerateInfo();

        for(let i=0; i<=elements.length; i++){
            elements[i].style.flex = _temp;
        }

    }
})

// program

function getfromlist(){
    return areklist[Math.floor(Math.random() * areklist.length)];
}
function getlistforbingo(number){
    let currentstrings = 0;
    let tableofstrings = [];
    while(currentstrings < number){
        let _temp = getfromlist();
        if(tableofstrings.includes(_temp)){
            continue;
        }
        else
        {
            tableofstrings.push(_temp);
            currentstrings += 1;
        }
    }
    return tableofstrings;
}
// function listbasedonsize(size){
//     return getlistforbingo(size * size);
// }

function addbox(text, boxid){
    addSomethingToArea(generateBox(text,boxid));
}

function addSomethingToArea(what){
    area.innerHTML += what;
}

function clearArea(){
    area.innerHTML = "";
}

function changestrikethrough(id){
    box = document.getElementById("box"+id);
    if(box.style.textDecoration == "line-through"){
        box.style.textDecoration = "none";
        completed -= 1;
        regenerateInfo();
    }
    else {
        box.style.textDecoration = "line-through";
        completed += 1;
        regenerateInfo();
    }
}

function regenerateText(id){
    let box = document.getElementById("box"+id);
    if(box.style.textDecoration == "line-through") {
        completed -= 1;
        regenerateInfo();
        box.style.textDecoration = "none";
    }
    let text = getfromlist();

    box.innerHTML = `
        ${text}
        <button class="donebox" id='donebox${id}' onclick='changestrikethrough(${id})'>
            <img src='close.png' alt='close'>
        </button>
        <button class="regeneratebox" id='regeneratebox${id}' onclick='regenerateText(${id})'>
        <img src='refresh.png' alt='refresh'>
        </button>
    `;
}

function generateBox(text, boxid){
    return `<div class='box' id='box${boxid}'>
    ${text}
    <button class="donebox" id='donebox${boxid}' onclick='changestrikethrough(${boxid})'>
        <img src='close.png' alt='close'>
    </button>
    <button class="regeneratebox" id='regeneratebox${boxid}' onclick='regenerateText(${boxid})'>
    <img src='refresh.png' alt='refresh'>
    </button>
    </div>`;
}


function generateArea(size){
    texts = getlistforbingo(size*size);
    let number = 1;
    texts.forEach(element => {
        addbox(element,number);
        number += 1;
    });
}
function regenerateInfo(){
    info.innerHTML = `${areklist.length} arek's entries ${sizeInput.value}x${sizeInput.value} BINGO ${completed}/${maxcompleted}`;
}

