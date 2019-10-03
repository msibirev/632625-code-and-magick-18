'use strict';
// Массив с данными
var WIZARD_QUANTITY = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристов', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
// Удаляем скрытие панели персонажа
userDialog.classList.remove('hidden');
// Находим куда отрисовывать магов
var similarListElement = userDialog.querySelector('.setup-similar-list');
// Находим шаблон
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
// возвращает число в диапазоне min max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
// Берем рандомное значени из массива
var getRandomValueFromArray = function (arr) {
  var arrLength = arr.length;
  var randomNumber = getRandomNumber(0, arrLength);
  return arr[randomNumber];
};

// Массив случайно сгенерированных волшебников
var wizards = [];
for (var i = 0; i < WIZARD_QUANTITY; i++) {
  wizards.push({
    name: getRandomValueFromArray(WIZARD_NAMES) + ' ' + getRandomValueFromArray(WIZARD_SURNAMES),
    coatColor: getRandomValueFromArray(COAT_COLORS),
    eyesColor: getRandomValueFromArray(EYES_COLORS)
  });
}

// Функция рендера магов
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
// Цикл отрисовки магов
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);
// Удаляем скрытие блока с магами
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

wizardCoat.addEventListener('click', function () {
  var randomCoatColor = getRandomValueFromArray(COAT_COLORS);
  wizardCoat.style.fill = randomCoatColor;
  document.querySelector('[name="coat-color"]').value = randomCoatColor;
});

wizardEyes.addEventListener('click', function () {
  var randomEyesColor = getRandomValueFromArray(EYES_COLORS);
  wizardEyes.style.fill = randomEyesColor;
  document.querySelector('[name="eyes-color"]').value = randomEyesColor;
});

wizardFireball.addEventListener('click', function () {
  var randomFireballColor = getRandomValueFromArray(FIREBALL_COLORS)
  wizardFireball.style.backgroundColor = randomFireballColor;
  document.querySelector('[name="fireball-color"]').value = randomFireballColor;
});
