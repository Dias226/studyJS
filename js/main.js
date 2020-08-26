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

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetMonth: 0,
  budgetDay: 0,
  asking: function () {
    const addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      const cost = prompt("Введите обязательную статью расходов");
      do {
        amount = prompt("Во сколько это обойдется?");
      } while (!isNumber(amount));
      appData.expenses[cost] = +amount;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay >= 600) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay >= 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Что то пошло не так";
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log("Расходы на месяц: ", appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  console.log(
    "Цель будет достигнута за: ",
    appData.getTargetMonth() + " месяца(ев)"
  );
} else {
  console.log("Цель не будет достигнута.");
}

console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log(
    "Наша программа включает в себя данные:" + key + " " + appData[key]
  );
}
