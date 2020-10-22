// console.log("Hello World!");

// Állapotok: konstansok
const STATUS_FIRSTNUMBER = "STATUS_FIRSTNUMBER"
const STATUS_SECONDNUMBER = "STATUS_SECONDNUMBER"
const STATUS_OPERAND = "STATUS_OPERAND"
const STATUS_DONE = "STATUS_DONE"

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

//Események, esemény kezelés: feliratkozás az eseményre
//operandus click
for (let i = 0; i < document.getElementsByClassName("operand").length; i++) {
    document.getElementsByClassName("operand")[i].addEventListener("click", OnOperandClick);
}
//numbers click
for (let i = 0; i < document.getElementsByClassName("number").length; i++) {
    document.getElementsByClassName("number")[i].addEventListener("click", OnNumberClick);
}

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
            if (displayNumber1.innerText.length <= 8) {
                SetNumber1(number1 * 10 + currentNumber);
            }
            break;
        case STATUS_OPERAND:
            status = STATUS_SECONDNUMBER;
        case STATUS_SECONDNUMBER:
            if (displayNumber2.innerText.length <= 8) {
                SetNumber2(number2 * 10 + currentNumber);
            }
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
