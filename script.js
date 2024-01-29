document.addEventListener('DOMContentLoaded', function() {
// Get the display element
const display = document.getElementById('display');

// Initialize variables to store input
let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Function to update the display
function updateDisplay() {
    display.textContent = currentInput;
}

// Function to handle number button clicks
function inputDigit(digit) {
    // If we're still waiting for the second operand, add it to the current input
    if (waitingForSecondOperand) {
    currentInput = digit;
    waitingForSecondOperand = false;
    } else {
    currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay();
}

// Function to handle decimal button click
function inputDecimal() {
    if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
    }
}

// Function to handle operator button clicks
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (firstOperand === null) {
    firstOperand = inputValue;
    } else if (operator) {
    const result = performCalculation();
    currentInput = String(result);
    updateDisplay();
    firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
}

// Function to perform the calculation
function performCalculation() {
    const inputValue = parseFloat(currentInput);
    if (isNaN(inputValue)) return 0;

    switch (operator) {
    case '+':
        return firstOperand + inputValue;
    case '-':
        return firstOperand - inputValue;
    case '*':
        return firstOperand * inputValue;
    case '/':
        if (inputValue === 0) {
            return "Illegal move. You're under arrest!";
        } else {
            return firstOperand / inputValue;
        }
    default:
        return inputValue;
    }
}

// Function to handle equal button click
function handleEquals() {
    if (operator && !waitingForSecondOperand) {
    const result = performCalculation();
    if (result !== null && result !== undefined) {
        // Check for an error message
        if (typeof result === 'string') {
          display.textContent = result;
          // reset defaults for continued calculations
          currentInput = '0';
          firstOperand = null;
          operator = null;
          waitingForSecondOperand = true;
        } else {
          currentInput = String(result);
          updateDisplay();
          firstOperand = result;
          operator = null;
          waitingForSecondOperand = true;
        }
    }
}
}


// Function to handle clear button click
function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Add event listeners to buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
    const buttonText = button.textContent;

    switch (buttonText) {
        case 'AC':
        clearCalculator();
        break;
        case '+/-':
        currentInput = String(-parseFloat(currentInput));
        updateDisplay();
        break;
        case '%':
        currentInput = String(parseFloat(currentInput) / 100);
        updateDisplay();
        break;
        case '=':
        handleEquals();
        break;
        case '.':
        inputDecimal();
        break;
        case '/':
        case '*':
        case '-':
        case '+':
        handleOperator(buttonText);
        break;
        default:
            // max input display length of 30
            if (currentInput.length < 31) {
            inputDigit(buttonText);
            } else {
                return;
            }
        break;
    }
    });
});
});
