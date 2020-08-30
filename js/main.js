"use strict";

const start = document.getElementById('start'),
  btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
  btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItemFirst = document.querySelectorAll('.additional_income-item')[0],
  additionalIncomeItemSecond = document.querySelectorAll('.additional_income-item')[1],
  budgetMonthValue = document.getElementsByClassName('result-total')[0],
  budgetDayValue = document.getElementsByClassName('result-total')[1],
  expensesMonthValue = document.getElementsByClassName('result-total')[2],
  additionalIncomeValue = document.getElementsByClassName('result-total')[3],
  additionalExpensesValue = document.getElementsByClassName('result-total')[4],
  incomePeriodValue = document.getElementsByClassName('result-total')[5],
  targetMonthValue = document.getElementsByClassName('result-total')[6],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('div.income-items>input.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('div.expenses-items>input.expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = {
  budget: 0,
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
  start: function () {
    // do {
    //   money = prompt("Ваш месячный доход?", 50000);
    // } while (!isNumber(money));

    appData.budget = salaryAmount.value;
    console.log('salaryAmount.value: ', salaryAmount.value);

    // appData.asking();
    // appData.getExpensesMonth();
    // appData.getBudget();
    // appData.getTargetMonth();
    // appData.getStatusIncome();
    // appData.getInfoDeposit();
  },
  budgetMonth: 0,
  budgetDay: 0,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный источник заработка?")) {
      let itemIncome;
      do {
        itemIncome = prompt("Какой у вас дополнительный заработок?", "Таксую");
      } while (!isNaN(itemIncome));
      let cashIncome;
      do {
        cashIncome = prompt(
          "Сколько в месяц вы на этом зарабатываете?",
          "10000"
        );
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    const addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    if (addExpenses) {
      appData.addExpenses = addExpenses.toLocaleLowerCase().split(", ");
      appData.addExpenses = addExpenses
        .split(", ")
        .map(
          (word) =>
          `${word.charAt(0).toUpperCase()}${word.slice(1).toLocaleLowerCase()}`
        );
    }

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
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcsavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

start.addEventListener('click', appData.start);

if (appData.getTargetMonth() > 0) {
  console.log(
    "Цель будет достигнута за: ",
    appData.getTargetMonth() + " месяца(ев)"
  );
} else {
  console.log("Цель не будет достигнута.");
}

// for (let key in appData) {
//   console.log(
//     "Наша программа включает в себя данные:" + key + " " + appData[key]
//   );
// }