// console.log("Hello World!");

// Állapotok: konstansok
const STATUS_FIRSTNUMBER = "firstnum"
const STATUS_SECONDNUMBER = "secondnum"
const STATUS_OPERAND = "operand"
const STATUS_DONE = "done"

// Változók
let number1 = null;
let number2 = null;
let operand = null;
let status = STATUS_FIRSTNUMBER;

// Az elemek összegyűjtése
//kijelzők
let displayNumber1 = document.getElementById("displayNumber1");
let displayNumber2 = document.getElementById("displayNumber2");
let displayOperand = document.getElementById("displayOperand");

//szám gombok
let button0 = document.getElementById("button0");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
let button5 = document.getElementById("button5");
let button6 = document.getElementById("button6");
let button7 = document.getElementById("button7");
let button8 = document.getElementById("button8");
let button9 = document.getElementById("button9");

//operandus gombok
let buttonPlus = document.getElementById("buttonPlus");
let buttonMinus = document.getElementById("buttonMinus");
let buttonTimes = document.getElementById("buttonTimes");
let buttonDivide = document.getElementById("buttonDivide");
let buttonEquals = document.getElementById("buttonEquals");

//Események, esemény kezelés: feliratkozás az eseményre
//operandus click
buttonPlus.addEventListener("click", OnOperandClick);
buttonMinus.addEventListener("click", OnOperandClick);
buttonTimes.addEventListener("click", OnOperandClick);
buttonDivide.addEventListener("click", OnOperandClick);
buttonEquals.addEventListener("click", OnOperandClick);

//numbers click
button0.addEventListener("click", OnNumberClick);
button1.addEventListener("click", OnNumberClick);
button2.addEventListener("click", OnNumberClick);
button3.addEventListener("click", OnNumberClick);
button4.addEventListener("click", OnNumberClick);
button5.addEventListener("click", OnNumberClick);
button6.addEventListener("click", OnNumberClick);
button7.addEventListener("click", OnNumberClick);
button8.addEventListener("click", OnNumberClick);
button9.addEventListener("click", OnNumberClick);

//Eseménykezelők
function OnOperandClick() {
    let currentElement = this;
    let currentOperand = currentElement.innerText;
    // console.log(currentOperand);

    switch (status) {
        case STATUS_DONE:
            if (currentOperand == "=") {
                return;
            }
            status = STATUS_OPERAND;
            SetOperand(currentOperand);
            break;
        case STATUS_FIRSTNUMBER:
            if (currentOperand == "=") {
                return;
            }
            status = STATUS_OPERAND
            SetOperand(currentOperand);
            break;
        case STATUS_OPERAND:
            if (currentOperand == "=") {
                return;
            }
            
            SetOperand(currentOperand);
            break;
        case STATUS_SECONDNUMBER:
            let answer = Math.round(eval(number1 + operand + number2) * 1000) / 1000;
            SetNumber1(answer);
            SetOperand(null);
            SetNumber2(null);
            if (currentOperand == "=") {
                status = STATUS_DONE;
            }else{
                SetOperand(currentOperand);
                status = STATUS_OPERAND;
            }
            break;
    }
}

function OnNumberClick() {
    let currentElement = this;
    let currentNumber = Number(currentElement.innerText);

    //Állapot vizsgálat
    switch (status) {
        case STATUS_FIRSTNUMBER:
            SetNumber1(number1 * 10 + currentNumber);
            break;
        case STATUS_OPERAND:
            status = STATUS_SECONDNUMBER;
        case STATUS_SECONDNUMBER:
            SetNumber2(number2 * 10 + currentNumber);
            break;
        case STATUS_DONE:
            SetNumber1(currentNumber);
            status = STATUS_FIRSTNUMBER
            break;
    }
}

//Értékadó függvények
//number1
function SetNumber1(value) {
    number1 = value;
    displayNumber1.innerText = value;
}

//number2
function SetNumber2(value) {
    number2 = value;
    displayNumber2.innerText = value;
}

//operand
function SetOperand(value) {
    operand = value;
    displayOperand.innerText = value;
}
