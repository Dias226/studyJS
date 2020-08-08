const money = 60000;
const income = 'фриланс';
const addExpenses = 'Интернет, Такси, Комуналка';
const deposit = true;
const mission = 200000;
const period = 10;
const budgetDay = money / 30;


console.log(typeof income, typeof money, typeof deposit);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase());

console.log(addExpenses.split(', '));

console.log(budgetDay);