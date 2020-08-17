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
const budgetMonth = money - amount1 - amount2;
const mission = 200000;
const period = 10;
const budgetDay = Math.floor(budgetMonth / 30);
const timeToReach = Math.ceil(mission / budgetMonth);

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function () {
  return amount1 + amount2;
};

console.log(getExpensesMonth());

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log('Бюджет на месяц: ', budgetMonth + ' рублей');
console.log('Цель будет достигнута за: ', timeToReach + ' месяца(ев)');
console.log(addExpenses.split(', '));
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