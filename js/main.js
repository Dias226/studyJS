"use strict";

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};
start();

const expenses = [];
let amount;

let appData = {
  income: {},
  deposit: false,
  mission: 50000,
  period: 10,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
};

appData.expensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов");
    do {
      amount = prompt("Во сколько это обойдется?");
    } while (!isNumber(amount));

    amount = +amount;
    sum += amount;
  }
  console.log(expenses);
  return sum;
};

appData.accumulatedMonth = function getAccumulatedMonth() {
  return money - getExpensesMonth;
};

appData.targetMonth = function getTargetMonth() {
  return Math.ceil(appData.mission / accumulatedMonth);
};

appData.statusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay >= 600) {
    return "У вас средний уровень дохода";
  } else if (budgetDay >= 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else {
    return "Что то пошло не так";
  }
};

const addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
const deposit = confirm("Есть ли у вас депозит в банке?");

const getExpensesMonth = appData.expensesMonth();


console.log("Расходы на месяц: ", getExpensesMonth);

const accumulatedMonth = appData.accumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);
const timeToReach = Math.ceil(appData.mission / accumulatedMonth);

if (appData.targetMonth() > 0) {
  console.log("Цель будет достигнута за: ", appData.targetMonth() + " месяца(ев)");
} else {
  console.log("Цель не будет достигнута.");
}

console.log("Период равен " + appData.period + " месяцев");
console.log(addExpenses.toLocaleLowerCase().split(", "));
console.log("Бюджет на день: ", budgetDay + " рублей");

const getStatusIncome = appData.statusIncome();
console.log(appData.statusIncome());