document.addEventListener('DOMContentLoaded', function() {
    const previousOperandElement = document.getElementById('previous-operand');
    const currentOperandElement = document.getElementById('current-operand');
    
    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let resetScreen = false;
    let memoryValue = 0;
    
    // Function to update the display
    function updateDisplay() {
        currentOperandElement.innerText = formatNumber(currentOperand);
        
        if (operation != null) {
            previousOperandElement.innerText = `${formatNumber(previousOperand)} ${operation}`;
        } else {
            previousOperandElement.innerText = '';
        }
    }
    
    // Format number for display
    function formatNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    
    // Function to append a number
    function appendNumber(number) {
        if (resetScreen) {
            currentOperand = '';
            resetScreen = false;
        }
        
        // Prevent multiple decimal points
        if (number === '.' && currentOperand.includes('.')) return;
        
        // Prevent leading zeros
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
        
        updateDisplay();
    }
    
    // Function to select an operation
    function chooseOperation(op) {
        if (currentOperand === '') return;
        
        if (previousOperand !== '') {
            compute();
        }
        
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
        
        updateDisplay();
    }
    
    // Function to perform the computation
    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Cannot divide by zero");
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Flash animation
        currentOperandElement.classList.add('flash');
        setTimeout(() => {
            currentOperandElement.classList.remove('flash');
        }, 300);
        
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        resetScreen = true;
        
        updateDisplay();
    }
    
    // Function to clear the calculator
    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    }
    
    // Function to delete the last digit
    function deleteNumber() {
        if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
        updateDisplay();
    }
    
    // Toggle positive/negative
    function togglePlusMinus() {
        if (currentOperand === '0') return;
        
        if (currentOperand.startsWith('-')) {
            currentOperand = currentOperand.slice(1);
        } else {
            currentOperand = '-' + currentOperand;
        }
        
        updateDisplay();
    }
    
    // Memory functions
    function memoryStore() {
        memoryValue = parseFloat(currentOperand);
        document.querySelector('.calculator').classList.add('memory-active');
        resetScreen = true;
    }
    
    function memoryRecall() {
        if (memoryValue !== null) {
            currentOperand = memoryValue.toString();
            updateDisplay();
            resetScreen = true;
        }
    }
    
    function memoryClear() {
        memoryValue = 0;
        document.querySelector('.calculator').classList.remove('memory-active');
    }
    
    function memoryAdd() {
        memoryValue += parseFloat(currentOperand) || 0;
        document.querySelector('.calculator').classList.add('memory-active');
        resetScreen = true;
    }
    
    function memorySubtract() {
        memoryValue -= parseFloat(currentOperand) || 0;
        document.querySelector('.calculator').classList.add('memory-active');
        resetScreen = true;
    }
    
    // Event listeners for buttons
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.innerText);
        });
    });
    
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.innerText);
        });
    });
    
    document.getElementById('equals').addEventListener('click', () => {
        compute();
    });
    
    document.getElementById('clear').addEventListener('click', () => {
        clear();
    });
    
    document.getElementById('backspace').addEventListener('click', () => {
        deleteNumber();
    });
    
    document.getElementById('plus-minus').addEventListener('click', () => {
        togglePlusMinus();
    });
    
    document.getElementById('mc').addEventListener('click', () => {
        memoryClear();
    });
    
    document.getElementById('mr').addEventListener('click', () => {
        memoryRecall();
    });
    
    document.getElementById('m-plus').addEventListener('click', () => {
        memoryAdd();
    });
    
    document.getElementById('m-minus').addEventListener('click', () => {
        memorySubtract();
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(event) {
        if (/^[0-9]$/.test(event.key)) {
            appendNumber(event.key);
        } else if (event.key === '.') {
            appendNumber('.');
        } else if (event.key === '+') {
            chooseOperation('+');
        } else if (event.key === '-') {
            chooseOperation('-');
        } else if (event.key === '*') {
            chooseOperation('×');
        } else if (event.key === '/') {
            chooseOperation('÷');
        } else if (event.key === 'Enter' || event.key === '=') {
            compute();
        } else if (event.key === 'Escape') {
            clear();
        } else if (event.key === 'Backspace') {
            deleteNumber();
        }
    });
    
    // Initialize display
    updateDisplay();
});
