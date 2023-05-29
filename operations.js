//create calculator class
class Calculator {
  constructor(previousOperandContent, currentOperandContent) {
    this.previousOperandContent = previousOperandContent;
    this.currentOperandContent = currentOperandContent;
    this.clear();
  }

  //clear function to reset parameters
  clear() {
    this.currentOperand = " ";
    this.previousOperand = "";
    this.operation = undefined;
  }

  //delete function to remove single character from current operand
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //function to and next clicked number to previously clicked number
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  //compute function to perform arithmetic operation based on operation
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;

      case "-":
        computation = prev - current;
        break;

      case "÷":
        computation = prev / current;
        break;

      case "x":
        computation = prev * current;
        break;

      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  //function to display numbers with delimiter.
  getDisplayNumber(number) {
    //splitting display value into decimal and fractional parts
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDigits}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  //display numbers
  updateDisplay() {
    this.currentOperandContent.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.previousOperandContent.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandContent.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousOperandContent = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandContent = document.querySelector("[data-current-operand]");

//creating calculator object
const calculator = new Calculator(
  previousOperandContent,
  currentOperandContent
);

//adding an event listener to each number button

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
