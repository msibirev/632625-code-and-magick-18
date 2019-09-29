'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 26;
var WIDTH_GAP = 50;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var TEXT_HEIGHT = 16;
var barY = CLOUD_Y - GAP - FONT_GAP + CLOUD_HEIGHT;
var barHeight = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - FONT_GAP - TEXT_HEIGHT - TEXT_HEIGHT - GAP;

// Поиск максимального элемента
var getMaxElement = function (arr) {
  var maxElement = Math.max.apply(0, arr);
  return maxElement;
};

// Создание облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderWinText = function (ctx) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
};

// Генерация облака со статистикой
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');

  renderWinText(ctx);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + GAP + (WIDTH_GAP + BAR_WIDTH) * i, CLOUD_Y - GAP + CLOUD_HEIGHT);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (WIDTH_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - GAP - TEXT_HEIGHT);

    // Оператор задает цвета колонок игроков
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomInt = Math.floor(Math.random() * 100);
      ctx.fillStyle = 'hsl(240, ' + randomInt + '%, ' + randomInt + '%)';
    }

    ctx.fillRect(CLOUD_X + GAP + (WIDTH_GAP + BAR_WIDTH) * i, barY, BAR_WIDTH, -(barHeight * times[i]) / maxTime);
  }
};
