"use strict";

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const start = function () {
  do {
    money = prompt("Ваш месячный доход?", 50000);
  } while (!isNumber(money));
};
start();

const appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budgetMonth: 0,
  budgetDay: 0,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (!isNaN(itemIncome));
      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    const addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = addExpenses.toLocaleLowerCase().split(", ");
    appData.addExpenses = addExpenses.split(', ')
      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLocaleLowerCase()}`);

    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      let cost;
      do {
        cost = prompt("Введите обязательную статью расходов", "Кварплата");
      } while (!isNaN(cost));
      let amount;
      do {
        amount = prompt("Во сколько это обойдется?", 3000);
      } while (!isNumber(amount));
      appData.expenses[cost] = amount;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcsavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
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
console.log(appData.addExpenses.join(', '));