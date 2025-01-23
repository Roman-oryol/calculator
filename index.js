const numberButtons = document.querySelectorAll('.btn.number');
const currentValueElement = document.querySelector('.current-value');

const MAX_LENGTH = 10;
const displayedValues = [];
let currentValue = 0;

let a;
let b;
let operator;

const displayValue = (enteredValue) => {
  const isMaxLength = displayedValues.length == MAX_LENGTH;
  const hasDecimalPoint = displayedValues.includes('.') && enteredValue === '.';
  const isLeadingZero =
    displayedValues.length === 1 &&
    displayedValues[0] === '0' &&
    enteredValue === '0';

  if (isMaxLength || hasDecimalPoint || isLeadingZero) {
    return;
  }

  if (displayedValues.length === 0 && enteredValue === '.') {
    displayedValues.push('0');
  }

  displayedValues.push(enteredValue);
  currentValueElement.textContent = displayedValues.join('');
};

const updateCurrentValue = (enteredValues) => {
  currentValue = parseFloat(enteredValues.join(''));
};

const handleEnterNumber = (evt) => {
  const enteredValue = evt.target.dataset.value;

  displayValue(enteredValue);
  updateCurrentValue(displayedValues);
};

numberButtons.forEach((button) => {
  button.addEventListener('click', handleEnterNumber);
});

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => (b !== 0 ? a / b : 'Error'),
};

const operate = (operator, a, b) => operations[operator](a, b);
