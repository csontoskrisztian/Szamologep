// console.log("Hello World!");

// Állapotok: konstansok
const STATUS_FIRSTNUMBER = "STATUS_FIRSTNUMBER";
const STATUS_SECONDNUMBER = "STATUS_SECONDNUMBER";
const STATUS_OPERAND = "STATUS_OPERAND";
const STATUS_DONE = "STATUS_DONE";
const STATUS_ERROR = "STATUS_ERROR";

// Változók
let number1 = "";
let number2 = "";
let operand = "";
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
//delete click
for (let i = 0; i < document.getElementsByClassName("delete").length; i++) {
    document.getElementsByClassName("delete")[i].addEventListener("click", OnDeleteClick);
}
//modifier click
for (let i = 0; i < document.getElementsByClassName("modifier").length; i++) {
    document.getElementsByClassName("modifier")[i].addEventListener("click", OnModifyClick);
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
            SetOperand(currentElement);
            break;
        case STATUS_FIRSTNUMBER:
            if (currentOperand == "=" || number1.length == 0) {
                return;
            }
            status = STATUS_OPERAND
            SetOperand(currentElement);
            break;
        case STATUS_OPERAND:
            if (currentOperand == "=") {
                return;
            }

            SetOperand(currentElement);
            break;
        case STATUS_SECONDNUMBER:
            let answer = Math.round(eval(number1 + operand + number2) * 1000) / 1000;
            if (answer == Infinity || answer == undefined) {
                SetNumber1("ERROR");
                SetOperand("");
                SetNumber2("");
                status = STATUS_ERROR;
            } else {
                SetNumber1(answer);
                SetOperand("");
                SetNumber2("");
                if (currentOperand == "=") {
                    status = STATUS_DONE;
                } else {
                    SetOperand(currentElement);
                    status = STATUS_OPERAND;
                }
            }
            break;
        case STATUS_ERROR:
            return;
    }
}

function OnNumberClick() {
    let currentElement = this;
    let currentNumber;

    switch (currentElement.id) {
        case "button0":
            currentNumber = "0";
            break;
        case "button1":
            currentNumber = "1";
            break;
        case "button2":
            currentNumber = "2";
            break;
        case "button3":
            currentNumber = "3";
            break;
        case "button4":
            currentNumber = "4";
            break;
        case "button5":
            currentNumber = "5";
            break;
        case "button6":
            currentNumber = "6";
            break;
        case "button7":
            currentNumber = "7";
            break;
        case "button8":
            currentNumber = "8";
            break;
        case "button9":
            currentNumber = "9";
            break;
    }

    //Állapot vizsgálat
    switch (status) {
        case STATUS_FIRSTNUMBER:
            if (displayNumber1.innerText.length <= 8) {
                SetNumber1(String(number1) + currentNumber);
            }
            break;
        case STATUS_OPERAND:
            status = STATUS_SECONDNUMBER;
        case STATUS_SECONDNUMBER:
            if (displayNumber2.innerText.length <= 8) {
                SetNumber2(String(number2) + currentNumber);
            }
            break;
        case STATUS_ERROR:
        case STATUS_DONE:
            SetNumber1(currentNumber);
            status = STATUS_FIRSTNUMBER
            break;
    }
}

function OnDeleteClick() {
    if (this.id == "buttonDelete") {
        switch (status) {
            case STATUS_FIRSTNUMBER:
                if (number1.length > 0) {
                    SetNumber1(number1.slice(0, number1.length - 1));
                }
                break;
            case STATUS_OPERAND:
                SetOperand("");
                status = STATUS_FIRSTNUMBER;
                break;
            case STATUS_SECONDNUMBER:
                if (number2.length > 0) {
                    SetNumber2(number2.slice(0, number2.length - 1));
                }
                if (number2.length == 0) {
                    status = STATUS_OPERAND;
                }
                break;
            case STATUS_ERROR:
                return;
        }
    } else if (this.id == "buttonC") {
        SetNumber1("");
        SetOperand("");
        SetNumber2("");
        status = STATUS_FIRSTNUMBER;
    } else if (this.id == "buttonCE") {
        switch (status) {
            case STATUS_FIRSTNUMBER:
                SetNumber1("");
                break;
            case STATUS_OPERAND:
                SetOperand("");
                status = STATUS_FIRSTNUMBER;
                break;
            case STATUS_SECONDNUMBER:
                SetNumber2("");
                status = STATUS_OPERAND;
                break;
            case STATUS_ERROR:
                return;
        }
    }
}

function OnModifyClick() {
    let f_number = status == STATUS_FIRSTNUMBER || status == STATUS_DONE;
    let s_number = status == STATUS_SECONDNUMBER;

    switch (this.id) {
        case "buttonReciprocal":
            if (f_number) SetNumber1(1 / number1);
            if (s_number) SetNumber2(1 / number2);
            break;
        case "buttonSquare":
            if (f_number) SetNumber1(Math.pow(number1, 2));
            if (s_number) SetNumber2(Math.pow(number2, 2));
            break;
        case "buttonSquareroot":
            if (f_number) SetNumber1(Math.sqrt(number1));
            if (s_number) SetNumber2(Math.sqrt(number2));
            break;
        case "buttonSign":
            if (f_number) SetNumber1(number1 * -1);
            if (s_number) SetNumber2(number2 * -1);
            break;
        case "buttonDecimalpoint":
            if (f_number && !number1.includes(".") && number1.length < 8) SetNumber1(String(number1) + ".");
            if (s_number && !number2.includes(".") && number2.length < 8) SetNumber2(String(number2) + ".");
            break;
        case "buttonPercentage":
            if (s_number) SetNumber2(number2 / 100);
            break;
    }
}

//Értékadó függvények
//number1
function SetNumber1(value) {
    let value_r = String(value).slice(0, 9);
    number1 = String(value_r);
    displayNumber1.innerText = value_r;
}

//number2
function SetNumber2(value) {
    let value_r = String(value).slice(0, 9);
    number2 = String(value_r);
    displayNumber2.innerText = value_r;
}

//operand
function SetOperand(element) {
    let calculate_value;
    let display_value;

    switch (element.id) {
        case "buttonDivide":
            calculate_value = "/";
            break;
        case "buttonTimes":
            calculate_value = "*";
            break;
        case "buttonMinus":
            calculate_value = "-";
            break;
        case "buttonPlus":
            calculate_value = "+";
            break;
        default:
            calculate_value = "";
            break;
    }

    element == "" ? display_value = "" : display_value = element.innerHTML;

    operand = calculate_value;
    displayOperand.innerHTML = display_value;
}