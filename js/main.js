let money = +prompt('Ваш месячный доход?');
while (money == '' || money == null || isNaN(money)) {
  money = +prompt('Ваш месячный доход?');
}
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов', 'Бензин');
const amount1 = +prompt('Во сколько это обойдется?', 2500);
const expenses2 = prompt('Введите обязательную статью расходов', 'Продукты');
const amount2 = +prompt('Во сколько это обойдется?', 5000);
const mission = 200000;
const period = 10;

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function () {
  return amount1 + amount2;
};

console.log('Расходы на месяц: ', +getExpensesMonth());

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}
let accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);
const timeToReach = Math.ceil(mission / accumulatedMonth);

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}
console.log('Цель будет достигнута за: ', getTargetMonth() + ' месяца(ев)');
console.log('Период равен ' + period + ' месяцев');
console.log(addExpenses.toLocaleLowerCase().split(', '));
console.log('Бюджет на день: ', budgetDay + ' рублей');

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

console.log(getStatusIncome());