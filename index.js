const numberButtons = document.querySelectorAll('.btn.number');
const currentValueElement = document.querySelector('.current-value');
const historyElement = document.querySelector('.history');
const operatorButtons = document.querySelectorAll('button[data-operator]');
const resetButton = document.querySelector('.reset');
const backspaceButton = document.querySelector('.backspace');
const equalButton = document.querySelector('.equal');
const pointButton = document.querySelector('.number[data-value="."]');

const MAX_LENGTH = 10;
let enteredValues = [];
let currentValue = 0;
let isError = false;

let previousValue = null;

let a;
let b;
let operator = null;
let result;

const displayValue = (enteredValue) => {
  const isMaxLength = enteredValues.length == MAX_LENGTH;
  const hasDecimalPoint = enteredValues.includes('.') && enteredValue === '.';
  const isLeadingZero =
    enteredValues.length === 1 &&
    enteredValues[0] === '0' &&
    enteredValue === '0';

  if (isMaxLength || hasDecimalPoint || isLeadingZero) {
    return;
  }

  if (enteredValues.length === 0 && enteredValue === '.') {
    enteredValues.push('0');
  }

  enteredValues.push(enteredValue);
  currentValueElement.textContent = enteredValues.join('');
};

const displayResult = (result) => {
  currentValueElement.textContent = result;
};

const updateCurrentValue = (enteredValues) => {
  currentValue = parseFloat(enteredValues.join(''));
};

const resetAll = () => {
  currentValue = 0;
  previousValue = null;
  operator = null;
  enteredValues = [];
  result = null;
  historyElement.textContent = '';
  currentValueElement.textContent = 0;
  isError = false;
  toggleOperatorButtons(isError);
  currentValueElement.classList.remove('current-value--error');
  pointButton.disabled = false;
};

const toggleOperatorButtons = (isError) => {
  operatorButtons.forEach((button) => {
    button.disabled = isError;
  });
};

const handleBackspaceClick = () => {
  if (isError) {
    resetAll();
    return;
  }

  if (enteredValues.length == 0) return;

  enteredValues.pop();

  if (enteredValues.length == 0) {
    currentValue = 0;
    currentValueElement.textContent = 0;
    return;
  }
  updateCurrentValue(enteredValues);
  currentValueElement.textContent = enteredValues.join('');
};

const handleEnterNumber = (evt) => {
  if (isError) {
    resetAll();
  }

  const enteredValue = evt.target.dataset.value;

  displayValue(enteredValue);
  updateCurrentValue(enteredValues);
};

const handleOperation = (evt) => {
  const selectedOperator = evt.currentTarget.dataset.operator;

  if (!previousValue) {
    previousValue = currentValue;
    currentValue = 0;
  }

  if (enteredValues.length != 0 && operator) {
    result = operate(operator, previousValue, currentValue);
  }

  if (result === 'Error') {
    isError = true;
    toggleOperatorButtons(isError);
    currentValueElement.classList.add('current-value--error');
    currentValueElement.textContent = 'Division by zero is not possible';
    pointButton.disabled = true;
    return;
  }

  if (result) {
    previousValue = result;
    currentValueElement.textContent = result;
  }

  operator = selectedOperator;

  historyElement.textContent = previousValue + operator;
  enteredValues = [];
  currentValue = 0;
};

const handleEqualClick = () => {
  b = currentValue;

  result = operate(operator, a, b);
  enteredValues = [];
  displayResult(result);

  historyElement.textContent = `${a}${operator}${b}=`;
  a = result == 'Error' ? null : result;
  b = null;
};

numberButtons.forEach((button) => {
  button.addEventListener('click', handleEnterNumber);
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', handleOperation);
});

resetButton.addEventListener('click', resetAll);

backspaceButton.addEventListener('click', handleBackspaceClick);

// equalButton.addEventListener('click', handleEqualClick);

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => (b !== 0 ? a / b : 'Error'),
};

const operate = (operator, a, b) => operations[operator](a, b);
