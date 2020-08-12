let money = +prompt('Ваш месячный доход?');
while (money == '' || money == null || isNaN(money)) {
  money = +prompt('Ваш месячный доход?');
}
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expeses1 = prompt('Введите обязательную статью расходов');
const amount1 = +prompt('Во сколько это обойдется?');
const expeses2 = prompt('Введите обязательную статью расходов');
const amount2 = +prompt('Во сколько это обойдется?');
const budgetMonth = money - amount1 - amount2;
const mission = 200000;
const period = 10;
const budgetDay = Math.floor(budgetMonth / 30);
const timeToReach = Math.ceil(mission / budgetMonth);

console.log(typeof income, typeof money, typeof deposit);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log('Бюджет на месяц: ', budgetMonth + ' рублей');
console.log('Цель будет достигнута за: ', timeToReach + ' месяца(ев)');
console.log(addExpenses.split(', '));
console.log('Бюджет на день: ', budgetDay + ' рублей');



if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что то пошло не так');
}