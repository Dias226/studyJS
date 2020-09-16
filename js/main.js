"use strict";
document.addEventListener('DOMContentLoaded', () => {

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
    budgetMonthValue = document.querySelector(".result-budget_month input"),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');


  let incomeItems = document.querySelectorAll(".income-items"),
    expensesItems = document.querySelectorAll(".expenses-items");

  const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  start.setAttribute('disabled', 'disabled');

  salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== "") {
      start.removeAttribute('disabled');
    } else {
      start.setAttribute('disabled', 'disabled');
    }
  });

  class AppData {
    constructor() {
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
    }
    check() {
      if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
      }
    }
    start() {
      const allInput = document.querySelectorAll('.data input[type = text]');
      allInput.forEach(item => {
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
      this.getInfoDeposit();
      this.getBudget();
      this.showResult();

    }
    showResult() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      addExpValue.value = this.addExpenses.join(", ");
      addIncomeValue.value = this.addIncome.join(", ");
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incPeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener("input", () => {
        incPeriodValue.value = this.calcPeriod();
      });
    }
    addExpensesBlock() {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
      expensesItems = document.querySelectorAll(".expenses-items");

      if (expensesItems.length === 3) {
        btnExpAdd.style.display = "none";
      }
    }
    getExpenses() {
      expensesItems.forEach(item => {
        const itemExpenses = item.querySelector(".expenses-title").value;
        const cashExpenses = item.querySelector(".expenses-amount").value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          this.expenses[itemExpenses] = cashExpenses;
        }
      });
    }
    addIncomeBlock() {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
      incomeItems = document.querySelectorAll(".income-items");

      if (incomeItems.length === 3) {
        btnIncAdd.style.display = "none";
      }
    }
    getIncome() {
      incomeItems.forEach(item => {
        const itemIncome = item.querySelector(".income-title").value;
        const cashIncome = item.querySelector(".income-amount").value;

        if (itemIncome !== '' && cashIncome !== '') {
          this.income[itemIncome] = cashIncome;
        }
      }, this);
      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    }
    getAddExpenses() {
      const addExpenses = addExpItem.value.split(",");
      addExpenses.forEach(item => {
        item = item.trim();
        if (item !== "") {
          this.addExpenses.push(item);
        }
      });
    }
    getAddIncome() {
      addIncItem.forEach(item => {
        const itemValue = item.value.trim();
        if (itemValue !== '') {
          this.addIncome.push(itemValue);
        }
      });
    }
    getExpensesMonth() {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
    }
    getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
    }

    getInfoDeposit() {
      if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
    }
    calcPeriod() {
      return this.budgetMonth * periodSelect.value;
    }
    reset() {
      const inputTextData = document.querySelectorAll('.data input[type=text]'),
        resultInputAll = document.querySelectorAll('.result input[type=text]');

      inputTextData.forEach(elem => {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
      });
      resultInputAll.forEach(elem => {
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
    }
    changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
        depositPercent.value = "";
        depositPercent.style.display = "inline-block";
        depositPercent.removeAttribute("disabled");
      } else {
        depositPercent.value = valueSelect;
        depositPercent.style.display = "none";
      }
    }
    depositHandler() {
      if (checkBox.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
      } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = "";
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
        depositPercent.style.display = "none";
      }
    }
    eventListeners() {
      start.addEventListener("click", this.start.bind(this));
      btnExpAdd.addEventListener("click", this.addExpensesBlock);
      btnIncAdd.addEventListener("click", this.addIncomeBlock);
      salaryAmount.addEventListener('keyup', this.check);
      cancel.addEventListener("click", this.reset.bind(this));
      periodSelect.addEventListener("input", () => {
        periodAmount.innerHTML = periodSelect.value;
      });
      checkBox.addEventListener('change', this.depositHandler.bind(this));
      depositPercent.addEventListener("input", () => {
        if (
          !isNumber(depositPercent.value) ||
          depositPercent.value < 0 ||
          depositPercent.value > 100
        ) {
          alert("Введите число от 0 до 100");
          depositPercent.value = "";
        }
      });
    }
  }
  const appData = new AppData();
  appData.eventListeners();

});