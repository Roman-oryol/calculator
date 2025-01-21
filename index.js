let a;
let b;
let operator;

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};
const operate = (operator, a, b) => operations[operator](a, b);
