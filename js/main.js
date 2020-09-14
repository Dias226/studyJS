"use strict";

const start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  btnIncAdd = document.getElementsByTagName("button")[0],
  btnExpAdd = document.getElementsByTagName("button")[1],
  checkBox = document.querySelector("#deposit-check"),
  addIncItem = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.querySelector(".result-budget_day input"),
  expensesMonthValue = document.querySelector(".result-expenses_month input"),
  addIncomeValue = document.querySelector(".result-additional_income input"),
  addExpValue = document.querySelector(".result-additional_expenses input"),
  incPeriodValue = document.querySelector(".result-income_period input"),
  targetMonthValue = document.querySelector(".result-target_month input"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  addExpItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount"),
  budgetMonthValue = document.querySelector(".result-budget_month input");

let incomeItems = document.querySelectorAll(".income-items"),
  expensesItems = document.querySelectorAll(".expenses-items");

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

start.setAttribute('disabled', 'disabled');

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== "") {
    start.removeAttribute('disabled');
  } else {
    start.setAttribute('disabled', 'disabled');
  }
});

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.addExpenses = [];
};
AppData.prototype.check = function () {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  }
};
AppData.prototype.start = function () {

  const allInput = document.querySelectorAll('.data input[type = text]');
  allInput.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  btnExpAdd.setAttribute('disabled', 'disabled');
  btnIncAdd.setAttribute('disabled', 'disabled');
  start.style.display = 'none';
  cancel.style.display = 'block';
  checkBox.setAttribute('disabled', 'disabled');

  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.getInfoDeposit();
  this.getStatusIncome();
  // this.getIncomeMonth();
};
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  addExpValue.value = this.addExpenses.join(", ");
  addIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incPeriodValue.value = this.calcPeriod();
  const itThis = this;
  periodSelect.addEventListener("input", function () {
    incPeriodValue.value = itThis.calcPeriod();
  });
};
AppData.prototype.addExpensesBlock = function () {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
  expensesItems = document.querySelectorAll(".expenses-items");

  if (expensesItems.length === 3) {
    btnExpAdd.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  expensesItems.forEach(function (item) {
    const itemExpenses = item.querySelector(".expenses-title").value;
    const cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this);
};
AppData.prototype.addIncomeBlock = function () {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
  incomeItems = document.querySelectorAll(".income-items");

  if (incomeItems.length === 3) {
    btnIncAdd.style.display = "none";
  }
};
AppData.prototype.getIncome = function () {
  incomeItems.forEach(function (item) {
    const itemIncome = item.querySelector(".income-title").value;
    const cashIncome = item.querySelector(".income-amount").value;

    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
    }
  }, this);
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  const addExpenses = addExpItem.value.split(",");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      this.addExpenses.push(item);
    }
  }, this);
};
AppData.prototype.getAddIncome = function () {
  addIncItem.forEach(function (item) {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this);
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return ("У вас высокий уровень дохода");
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return ("У вас средний уровень дохода");
  } else if (this.budgetDay > 0 && this.budgetDay < 600) {
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else {
    return ("Что то пошло не так");
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt("Какой годовой процент?");
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt("Какая сумма заложена?");
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function () {

  const inputTextData = document.querySelectorAll('.data input[type=text]'),
    resultInputAll = document.querySelectorAll('.result input[type=text]');

  inputTextData.forEach(function (elem) {
    elem.value = '';
    elem.removeAttribute('disabled');
    periodSelect.value = '0';
    periodAmount.innerHTML = periodSelect.value;
  });
  resultInputAll.forEach(function (elem) {
    elem.value = '';
  });

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
    btnIncAdd.style.display = 'block';
  }
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    btnExpAdd.style.display = 'block';
  }

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.deposit = false,
    this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.addExpenses = [];

  cancel.style.display = 'none';
  start.style.display = 'block';
  btnExpAdd.removeAttribute('disabled');
  btnIncAdd.removeAttribute('disabled');
  checkBox.checked = false;
  checkBox.removeAttribute('disabled');
};
AppData.prototype.eventListeners = function () {
  start.addEventListener("click", this.start.bind(this));
  btnExpAdd.addEventListener("click", this.addExpensesBlock);
  btnIncAdd.addEventListener("click", this.addIncomeBlock);
  salaryAmount.addEventListener('keyup', this.check);
  cancel.addEventListener("click", this.reset.bind(this));

  periodSelect.addEventListener("input", function () {
    periodAmount.innerHTML = periodSelect.value;
  });
};

const appData = new AppData();
appData.eventListeners();
console.log(appData);