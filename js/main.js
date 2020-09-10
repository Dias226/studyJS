"use strict";

let start = document.getElementById("start"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.querySelector(".budget_day-value"),
  expensesMonthValue = document.querySelector(".expenses_month-value"),
  additionalIncomeValue = document.querySelector(".additional_income-value"),
  additionalExpensesValue = document.querySelector(
    ".additional_expenses-value"
  ),
  incomePeriodValue = document.querySelector(".income_period-value"),
  targetMonthValue = document.querySelector(".target_month-value"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeItems = document.querySelectorAll(".income-items"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpenses = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  budgetMonthValue = document.querySelector(".budget_month-value"),
  expensesAmount = document.querySelector(".expenses-amount"),
  expensesTitle = document.querySelector(".expenses-title"),
  periodAmount = document.querySelector(".period-amount"),
  incomeAmount = document.querySelector(".income-amount"),
  cancel = document.getElementById("cancel");

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function (k) {
  return isNaN(parseFloat(k)) && (k.trim() !== "");
};

const checkString = /[^А-ЯЁ,\s.]/i;

function blockInput() {
  [].forEach.call(document.querySelectorAll("input"), function (input) {
    input.setAttribute("disabled", "disabled");
  });
  periodSelect.removeAttribute("disabled", "disabled");
  start.style.display = "none";
  cancel.style.display = "block";
}

const appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: true,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  expensesMonth: 0,
  budgetMonth: 0,

  start: function () {
    this.budget = parseFloat(salaryAmount.value);
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();
    blockInput();
  },

  reset: function () {
    (this.deposit = true), (this.income = {});
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = true;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.budgetMonth = 0;

    if (expensesItems.length > 1) {
      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove();
      }
    }
    if (incomeItems.length > 1) {
      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove();
      }
    }

    incomePlus.style.display = "block";
    expensesPlus.style.display = "block";
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    const itThis = this;
    periodSelect.addEventListener("input", function () {
      incomePeriodValue.value = itThis.calcPeriod();
    });
  },

  getAddExpenses: function () {
    const addExpenses = additionalExpenses.value.split(",");
    const itThis = this;
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        itThis.addExpenses.push(item);
      }
    });
  },
  getIncomeMonth: function () {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getIncome: function () {
    const itThis = this;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;

      itThis.income[itemIncome] = cashIncome;
    });
  },

  addIncomeBlock: function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  },

  addExpensesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  getAddIncome: function () {
    const itThis = this;
    additionalIncomeItem.forEach(function (item) {
      const itemValue = item.value.trim();

      itThis.addIncome.push(itemValue);
    });
  },

  getExpenses: function () {
    const itThis = this;
    expensesItems.forEach(function (item) {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;

      itThis.expenses[itemExpenses] = cashExpenses;
    });
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  // getStatusIncome: function () {
  //   if (this.budgetDay >= 1200) {
  //     return "У вас высокий уровень дохода";
  //   } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
  //     return "У вас средний уровень дохода";
  //   } else if (this.budgetDay > 0 && this.budgetDay < 600) {
  //     return "К сожалению у вас уровень дохода ниже среднего";
  //   } else {
  //     return "Что то пошло не так";
  //   }
  // },
  // getInfoDeposit: function () {
  //   if (this.deposit) {
  //     do {
  //       this.percentDeposit = prompt("Какой годовой процент?");
  //     } while (!isNumber(this.percentDeposit));
  //     do {
  //       this.moneyDeposit = prompt("Какая сумма заложена?");
  //     } while (!isNumber(this.moneyDeposit));
  //   }
  // },

  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
};

expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);

start.addEventListener("click", function () {
  if (!isNumber(salaryAmount.value)) {
    alert('Заполните поле "Месячный доход"');
    salaryAmount.value = "";
  } else {
    appData.start.call(appData);
  }
});

cancel.addEventListener("click", function () {
  [].forEach.call(document.querySelectorAll("input"), function (item) {
    item.value = null;
  });
  [].forEach.call(document.querySelectorAll("input"), function (item) {
    item.removeAttribute("disabled", "disabled");
  });
  periodSelect.value = 1;
  periodAmount.textContent = 1;
  appData.reset.call(appData);
  start.style.display = "block";
  cancel.style.display = "none";
});

periodSelect.addEventListener("input", function () {
  periodAmount.textContent = periodSelect.value;
});
const checkStr = function () {
  let itemsName = document.querySelectorAll(
    'input[placeholder="Наименование"]'
  );
  let itemsNum = document.querySelectorAll('input[placeholder="Сумма"]');

  itemsName.forEach(function (item) {
    item.addEventListener("input", function () {
      if (checkString.test(item.value)) {
        item.value = "";
      }
    });
  });

  itemsNum.forEach(function (item) {
    item.addEventListener("input", function () {
      if (!isNumber(item.value)) {
        item.value = "";
      }
    });
  });
};
checkStr();
incomePlus.addEventListener("click", checkStr);
expensesPlus.addEventListener("click", checkStr);