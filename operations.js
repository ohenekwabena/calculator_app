// creating functions for each operation 

function add(num1, num2) {
    return num1 + num2; 
}

function sub(num1, num2) {
    return num1 - num2; 
}

function divide(num1, num2) {
    return num1 / num2; 
}

function multiply(num1, num2) {
    return num1 * num2; 
}

let num1, num2 = 0.0; 
let operator = '';

//creating function to perform operation 
function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            add(num1, num2)
            break;

        case '-':
            sub(num1, num2)
            break;

        case '/':
            divide(num1, num2)
            break;

        case '*':
            multiply(num1, num2)
            break;
    
        default:
            break;
    }
}

