const submit = document.querySelector('#sendForm');
function getWebElement(locator) {
  return document.querySelector(locator);
}
function checkInput() {
  regExp = /^\d{1,3}([\.,]{1}\d{1})?$/;
  if (regExp.test(this.value)) {
    return;
  } else {
    this.value = 0;
  }
}
firstNumber = getWebElement('#firstNumber');
secondNumber = getWebElement('#secondNumber');
firstNumber.addEventListener('change', checkInput);
secondNumber.addEventListener('change', checkInput);
function getFloat(number) {
  floatValue = parseFloat(number.replace(',', '.'));
  if (isNaN(floatValue)) {
    return undefined;
  } else {
    return floatValue;
  }
}
function getErrorAnswer(firstNumber, secondNumber) {
  errorAnswer = [];
  if (firstNumber === undefined) {
    errorAnswer.push('Не валидные данные в первом поле');
  }
  if (secondNumber === undefined) {
    errorAnswer.push('Не валидные данные во втором поле');
  }
  return errorAnswer;
}
function selectOperation(data) {
  const { firstNumber, secondNumber, operation } = data;

  if (operation == 'plus') {
    result = firstNumber + secondNumber;
    return result == 0 ? 0 : result.toFixed(1);
  } else if (operation == 'minus') {
    result = firstNumber - secondNumber;
    return result == 0 ? 0 : result.toFixed(1);
  }
}
function checkMoreMinMax(result) {
  if (result > 999.9) {
    return 'Результат вычислений больше 999.9. Пожалуйста, измените одно из слагаемых';
  }
  if (result < -999.9) {
    return 'Разность чисел меньше -999.9. Пожалуйста, измените уменьшаемое или вычитаемое число';
  }
  return undefined;
}
function outputAnswer(result, locator) {
  divAnswer = getWebElement(locator);
  divResult = document.createElement('div');
  divResult.innerText = result;
  divAnswer.appendChild(divResult);
}
function makeСalculation(e) {
  e.preventDefault();
  form = document.querySelector('form[name="calculation"]');
  firstNumber = getWebElement('#firstNumber');
  secondNumber = getWebElement('#secondNumber');
  inputs = form.elements['operations'];
  firstNumberValue = getFloat(firstNumber.value);
  secondNumberValue = getFloat(secondNumber.value);
  errorAnswer = getErrorAnswer(firstNumberValue, secondNumberValue);
  if (errorAnswer.length > 0) {
    errorAnswer.forEach((el) => {
      outputAnswer(el, '#answer');
    });
    return;
  }

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      data = {
        firstNumber: firstNumberValue,
        secondNumber: secondNumberValue,
        operation: inputs[i].value,
      };
      result = selectOperation(data);
      minMax = checkMoreMinMax(result);
      if (typeof minMax === 'string') {
        outputAnswer(minMax, '#answer');
        return;
      }
      outputAnswer(result, '#answer');
      break;
    }
  }
}

function runTests() {
  firstNumber = getWebElement('#firstNumber');
  secondNumber = getWebElement('#secondNumber');
  submitButton = getWebElement('#sendForm');
  radioButtonPlus = getWebElement('input[value="plus"]');
  radioButtonMinus = getWebElement('input[value="minus"]');
  divTestResult = getWebElement('#testResult');
  outputAnswer('Результаты тестов: ', '#testResult');
  dataForTests.forEach((el) => {
    firstNumber.value = el[0];
    secondNumber.value = el[1];
    if (el[3] == 'plus') radioButtonPlus.setAttribute('checked', '');
    if (el[3] == 'minus') {
      radioButtonMinus.setAttribute('checked', '');
    }
    submitButton.click();
    lastDivInAnswerText = getWebElement('#answer div:last-child').innerText;
    testMessage =
      String(el[2]) == lastDivInAnswerText
        ? `Тест пройден. ${el[0]} ${el[3] == 'plus' ? '+' : '-'} ${
            el[1]
          } равно ${lastDivInAnswerText} `
        : `Тест не пройден. ${el[0]} ${el[3]} ${el[1]} не равно ${lastDivInAnswerText}`;

    outputAnswer(testMessage, '#testResult');
  });
}
submit.addEventListener('click', makeСalculation);
runTestButton = getWebElement('#runTests');
runTestButton.addEventListener('click', runTests);



