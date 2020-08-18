const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  }
  while (!isNumber(money));
};
start();

const income = "фриланс";
const addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
const deposit = confirm("Есть ли у вас депозит в банке?");

const expenses = [];
let amount;

const getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов");
    do {
      amount = prompt("Во сколько это обойдется?");
    }
    while (!isNumber(amount));

    amount = +amount;
    sum += amount;
  }
  console.log(expenses);
  return sum;
};
const expensesAmount = getExpensesMonth();

const mission = 200000;
const period = 10;

const showTypeOf = function (data) {
  console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log("Расходы на месяц: ", expensesAmount);

function getAccumulatedMonth() {
  return money - expensesAmount;
}
const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);
const timeToReach = Math.ceil(mission / accumulatedMonth);

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

if (getTargetMonth() > 0) {
  console.log("Цель будет достигнута за: ", getTargetMonth() + " месяца(ев)");
} else {
  console.log("Цель не будет достигнута.");
}

console.log("Период равен " + period + " месяцев");
console.log(addExpenses.toLocaleLowerCase().split(", "));
console.log("Бюджет на день: ", budgetDay + " рублей");

const getStatusIncome = function () {
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
console.log(getStatusIncome());