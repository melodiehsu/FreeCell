const cards = [
  {name:'s1', suit: 'spade', color: 'black', num: 1},
  {name:'s2', suit: 'spade', color: 'black', num: 2},
  {name:'s3', suit: 'spade', color: 'black', num: 3},
  {name:'s4', suit: 'spade', color: 'black', num: 4},
  {name:'s5', suit: 'spade', color: 'black', num: 5},
  {name:'s6', suit: 'spade', color: 'black', num: 6},
  {name:'s7', suit: 'spade', color: 'black', num: 7},
  {name:'s8', suit: 'spade', color: 'black', num: 8},
  {name:'s9', suit: 'spade', color: 'black', num: 9},
  {name:'s10', suit: 'spade', color: 'black', num: 10},
  {name:'s11', suit: 'spade', color: 'black', num: 11},
  {name:'s12', suit: 'spade', color: 'black', num: 12},
  {name:'s13', suit: 'spade', color: 'black', num: 13},
  {name:'h1', suit: 'heart', color: 'red', num: 1},
  {name:'h2', suit: 'heart', color: 'red', num: 2},
  {name:'h3', suit: 'heart', color: 'red', num: 3},
  {name:'h4', suit: 'heart', color: 'red', num: 4},
  {name:'h5', suit: 'heart', color: 'red', num: 5},
  {name:'h6', suit: 'heart', color: 'red', num: 6},
  {name:'h7', suit: 'heart', color: 'red', num: 7},
  {name:'h8', suit: 'heart', color: 'red', num: 8},
  {name:'h9', suit: 'heart', color: 'red', num: 9},
  {name:'h10', suit: 'heart', color: 'red', num: 10},
  {name:'h11', suit: 'heart', color: 'red', num: 11},
  {name:'h12', suit: 'heart', color: 'red', num: 12},
  {name:'h13', suit: 'heart', color: 'red', num: 13},
  {name:'d1', suit: 'diamond', color: 'red', num: 1},
  {name:'d2', suit: 'diamond', color: 'red', num: 2},
  {name:'d3', suit: 'diamond', color: 'red', num: 3},
  {name:'d4', suit: 'diamond', color: 'red', num: 4},
  {name:'d5', suit: 'diamond', color: 'red', num: 5},
  {name:'d6', suit: 'diamond', color: 'red', num: 6},
  {name:'d7', suit: 'diamond', color: 'red', num: 7},
  {name:'d8', suit: 'diamond', color: 'red', num: 8},
  {name:'d9', suit: 'diamond', color: 'red', num: 9},
  {name:'d10', suit: 'diamond', color: 'red', num: 10},
  {name:'d11', suit: 'diamond', color: 'red', num: 11},
  {name:'d12', suit: 'diamond', color: 'red', num: 12},
  {name:'d13', suit: 'diamond', color: 'red', num: 13},
  {name:'c1', suit: 'club', color: 'black', num: 1},
  {name:'c2', suit: 'club', color: 'black', num: 2},
  {name:'c3', suit: 'club', color: 'black', num: 3},
  {name:'c4', suit: 'club', color: 'black', num: 4},
  {name:'c5', suit: 'club', color: 'black', num: 5},
  {name:'c6', suit: 'club', color: 'black', num: 6},
  {name:'c7', suit: 'club', color: 'black', num: 7},
  {name:'c8', suit: 'club', color: 'black', num: 8},
  {name:'c9', suit: 'club', color: 'black', num: 9},
  {name:'c10', suit: 'club', color: 'black', num: 10},
  {name:'c11', suit: 'club', color: 'black', num: 11},
  {name:'c12', suit: 'club', color: 'black', num: 12},
  {name:'c13', suit: 'club', color: 'black', num: 13},
];

let foundations = [[],[],[],[]];
let cells = [[],[],[],[]];
let history = [];

let cascades;
let cardsInHand = {
  cards: [],
  from: '',
  startX: 0,
  startY: 0,
};
let record;
let movementCount;
let isGameStarted = false;

let body = document.querySelector('body');
let undoLi = document.querySelector('.undo');
let undoButton = document.querySelector('#undo');
let new_game = document.querySelector('#new_game');
let restart = document.querySelector('#restart');
let timer = document.querySelector('.timer');
let movement = document.querySelector('.movement');
let home = document.querySelector('.home');
let logo = document.querySelector('.logo');
let alert = document.querySelector('.alert');
let alertMessage = document.querySelector('.alert_message');
let yes = document.querySelector('.yes');
let no = document.querySelector('.no');
let cascadeElement = document.querySelectorAll('.cascade');

body.addEventListener('mousemove', deckMouseMove);
body.addEventListener('mouseup', deckMouseUp);
body.addEventListener('mouseleave', deckMouseUp);
home.addEventListener('click', () => {
  if (isGameStarted == false) {
    hideHomePage();
  }
});
yes.addEventListener('click', () => {
  initialize();
  hideAlert();
  hideHomePage();
  isGameStarted = false;
});
no.addEventListener('click', () => {
  hideHomePage();
  hideAlert();
  startTimer();
})

undoLi.addEventListener('click', undo);
new_game.addEventListener('click', (e) => {
  createAlertWindow(e.target.id)
});
restart.addEventListener('click', (e) => {
  createAlertWindow(e.target.id)
});

const CARD_INTERVAL = .25

function initialize() {
  setTimer();
  setMovement();
}

// HTML載入後進行
window.onload = function () {
  createCards();
  initialize();
  startAGame();
}

// 當視窗大小改變時，卡牌跟著移動位置
window.addEventListener('resize', render);

// 計時器
let sec, time, timeOnClock;
function countingSeconds() {
  sec++;
  renderTimer();
}

function startTimer() {
  time = window.setInterval(countingSeconds, 1000);
}

function pauseTimer() {
  clearInterval(time);
}

function setTimer() {
  sec = 0;
  renderTimer();
  pauseTimer();
}

function renderTimer() {
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  timeOnClock = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timer.innerHTML = timeOnClock;
}

// 移動次數紀錄
function setMovement() {
  movementCount = 0;
  renderMovements();
}

function renderMovements() {
  movement.innerHTML = `${movementCount}`;
}

// 製作卡片
function createCards() {
  for (let i = 0; i < 52; i++) {
    let element = document.createElement('div');
    element.classList.add('card');
    element.id = cards[i].name;
    element.data = cards[i]; 
    element.style.backgroundImage = `url(img/cards/card_${i+1}.svg`;
    element.style.top = '100%';
    element.style.left = '50%';
    document.querySelector('.deck').appendChild(element);
    element.addEventListener('mousedown', (e) => {cardMouseDown(e)});
  }
}

// 開始新牌局
function startAGame() {
  foundations = [[],[],[],[]];
  cells = [[],[],[],[]];
  history = [];
  changeUndoButtonSrc();

  // 洗牌
  const CARD_ARR = [[],[],[],[],[],[],[],[]];
  let length = cards.length;
  let random;
  while (length) {
    random = Math.floor(Math.random() * length--);
    [cards[length], cards[random]] = [cards[random], cards[length]];
  }

  // 發牌
  for (let i = 0; i < cards.length; i++) {
    CARD_ARR[i % 8].push(cards[i]);
    let element = document.querySelector(`#${cards[i].name}`);
    let zIndex = Math.ceil((i+1) / 8);
    cardPosition(element, '100%', '50%', zIndex);
  }

  cascades = CARD_ARR;

  render();
  console.log(cascades);
}

// 重發這一局牌
function restartTheGame() {
  for (let i = history.length - 1; i >= 0; i--) {
    undo();
  }
  setMovement();
  render();
}

// 在畫面上繪出卡片
function render() {
  for (let i = 0; i < 4; i++) {
    if (cells[i].length !== 0) {
      cardElement = document.querySelector(`#${cells[i][0].name}`);
      placingCard(cardElement, `cel${i}`, 1);
    }

    for (let j = foundations[i].length - 1; j >= 0 ; j--) {
      cardElement = document.querySelector(`#${foundations[i][j].name}`)
      placingCard(cardElement, `fou${i}`, 1)
    }
  }
  for (let i = 0; i < cascades.length; i++) {
    for (let j = 0; j < cascades[i].length; j++) {
      let cardElement = document.querySelector(`#${cascades[i][j].name}`);
      placingCard(cardElement, `cas${i}`, j + 1);
    }
  }

  for (let i = 0; i < cardsInHand.cards.length; i++) {
    let cardElement = document.querySelector(`#${cardsInHand.cards[i].name}`);
    placingCard(cardElement, `hand`, i + 1)
  }
}

function cardMouseDown(e) {
  let cardData = e.target.data;

  let draggableCount = getDraggableNum(cardData);
  if (e.button !== 0 || draggableCount < 1) {
    return;
  }
  
  let location = findCard(cardData);
  let takenCards = takeCard(location, draggableCount);
  cardsInHand.from = location;
  cardsInHand.cards = takenCards;
  cardsInHand.startX = e.offsetX;
  cardsInHand.startY = e.offsetY;

  record = JSON.parse(JSON.stringify(cardsInHand));

  e.preventDefault();
}

function deckMouseMove(e) {
  if (cardsInHand.cards.length == 0 || e.button !== 0 ) {
    return;
  }
  render();
}

function deckMouseUp(e) {
  if (cardsInHand.cards.length == 0 || e.button !== 0) {
    return;
  }

  let cardData = cardsInHand.cards[0];
  let targetLocation = getCollidedLocation(cardData);

  if (targetLocation !== '') {
    console.log('deckMouseUp');
    moveCardTo(cardData, targetLocation);
    checkGameStatus();
    changeUndoButtonSrc();
  }
  
  else {
    returnCards();
  }

  render();
}

function changeUndoButtonSrc() {
  if(history.length == 0){
    undoButton.src = 'img/undo.svg';
  }
  else if(history.length >= 1){
    undoButton.src = 'img/undo_available.svg';
  }
}

function createWinningWindow() {
  cascadeElement.forEach(element => {
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
  });

  let element = document.createElement('p');
  element.classList.add('forWinner');
  document.querySelector('.bot_deck').appendChild(element);

  element.innerHTML = `CONGRATULATIONS<br/>
  <ul style="margin-top: 30px; font-size:24px">
  <li>TIME: ${timeOnClock}</li>
  <li>${movementCount} MOVES</li>
  </ul>
  <button onclick="removeWinningWindow(); initialize(); startAGame();" style="background-color: #3F869B;
  color: #ffffff;
  font-size: 24px;">Start A New Game</button>`

  element.style.textAlign = 'center';
  element.style.lineHeight = '2';
  element.style.position = 'absolute';
  element.style.left = '50%';
  element.style.transform = 'translateX(-50%)';
}

function removeWinningWindow() {
  cascadeElement.forEach(element => {
    element.style.visibility = 'visible';
    element.style.opacity = '1';
  });
  let startAnotherGame = document.querySelector('.forWinner');
  startAnotherGame.remove();
}

function isWon() {
  for (let i = 0; i < foundations.length - 1; i++) {
    if (foundations[i].length !== 13) {
      return false;
    }
  }
  return true;
}

// 上一步
function undo() {
  if (history.length == 0) {
    return;
  }

  let lastMove = history[history.length - 1];
  let cardData = lastMove.cards[lastMove.cards.length - 1];
  let location = findCard(cardData);
  let takenCards = takeCard(location, lastMove.cards.length);

  putCard(lastMove.from, ...takenCards);
  movementCount++;
  renderMovements();

  render();
  history.pop();
  changeUndoButtonSrc();
}

function checkGameStatus() {
  if (!isGameStarted) {
    console.log('checkGameStatus');
    isGameStarted = true;
    startTimer();
  }

  if(isWon()){
    isGameStarted = false;
    pauseTimer();
    createWinningWindow();
    history = [];
    changeUndoButtonSrc();
    console.log('win!')
  }
}

function hideHomePage() {
  home.style.visibility = 'hidden';
  home.style.opacity = '0';
  logo.classList.add('smallLogo');
}

function showHomePage() {
  logo.style.zIndex = '0';
  home.style.visibility = 'visible';
  home.style.opacity = '1';
  home.style.background = '#707070';
}

function showAlertWindow() {
  alert.style.visibility = 'visible';
  alert.style.opacity = '1';
}

function hideAlert() {
  alert.style.visibility = 'hidden';
  alert.style.opacity = '0';
}

function createAlertWindow(clickedButton) {
  if (isGameStarted == true) {
    pauseTimer();
    showHomePage();
    showAlertWindow();

    if (clickedButton == 'new_game') {
      alertMessage.innerHTML = 'You have a game in progress.';
      yes.innerHTML = 'Start A New Game';
      no.innerHTML = 'Back To The Current Game';

      yes.addEventListener('click', startAGame);

      return;
    }

    if (clickedButton == 'restart') {
      showHomePage();
      showAlertWindow();
  
      alertMessage.innerHTML = 'Do you want to restart the current game? This will undo all your moves.';
      yes.innerHTML = 'Restart The Current Game';
      no.innerHTML = 'Back To The Current Game';

      yes.addEventListener('click', restartTheGame);
      return;
    }
  }

  else {
    if (clickedButton == 'restart'){
      return;
    }

    startAGame();
    return;
  }
}

// 偵測碰撞
function collisionDetection(cardData, collidedElement) {
  let cardElement = document.querySelector(`#${cardData.name}`)
  const OVERLAP_W = 1/2;
  const OVERLAP_H = 2/3;
  let w = cardElement.offsetWidth;
  let h = cardElement.offsetHeight;

  let deltaX = Math.abs(cardElement.offsetLeft - collidedElement.offsetLeft);
  let deltaY = Math.abs(cardElement.offsetTop - collidedElement.offsetTop);

  return deltaX < (w * OVERLAP_W) && deltaY < (h * OVERLAP_H);
}

function getCollidedLocation(cardData) {
  let collidedElement;

  // 若將卡片移至自由欄框或本位欄框
  for (let i = 0; i < 4; i++) {
    collidedElement = document.querySelector(`#cel${i}`);
    if (collisionDetection(cardData, collidedElement)) {
      return `cel${i}`;
    }

    collidedElement = document.querySelector(`#fou${i}`);
    if (collisionDetection(cardData, collidedElement)) {
      return `fou${i}`;
    }
  }

  // 若在牌疊間移動卡片
  let targetLocation = cardsInHand.from;

  for (let i = 0; i < cascades.length; i++) {
    // 目的地與手上的牌於相同牌堆則不碰撞
    if (targetLocation.startsWith('cas') && targetLocation[3] == i) {
      continue;
    }
    // 若cascades有卡片，則與最後一張碰撞，若無則直接碰撞地板
    let location = `cas${i}`;

    if (cascades[i].length >= 1) {
      location = cascades[i][cascades[i].length - 1].name;
    }

    collidedElement = document.querySelector(`#${location}`);
    if (collisionDetection(cardData, collidedElement)) {
      return `cas${i}`;
    }
  }

  return '';
}

// 卡片在畫面上的位置
// let animationMap = new Map();
function cardPosition(cardElement, top, left, zIndex) {
  if (cardElement.style.top == top && cardElement.style.left == left) {
    return;
  }

  // clearTimeout(animationMap.get(cardElement.id));

  cardElement.style.top = top;
  cardElement.style.left = left;
  cardElement.style.zIndex = zIndex;

  // let id = setTimeout(function() {
  //   card.style.zIndex = zIndex;
  // }, 500);
  // animationMap.set(card.id, id);
}

// 將卡片放到指定位置
function placingCard(cardElement, location, zIndex) {
  let destination;
  let cardInterval;
  if (location == 'hand') {
    destination = {
      offsetTop: window.event.clientY - cardsInHand.startY,
      offsetLeft: window.event.clientX - cardsInHand.startX,
    }
    cardInterval = Math.min(CARD_INTERVAL * 10 / cardsInHand.cards.length, CARD_INTERVAL)
  }
  
  else {
    destination = document.querySelector(`#${location}`);
    cardInterval = Math.min(CARD_INTERVAL * 10 / cascades[location[3]].length, CARD_INTERVAL);
  }

  let top = destination.offsetTop + (Math.round(cardInterval * cardElement.offsetHeight) * (zIndex - 1));
  let left = destination.offsetLeft;

  if (location == 'hand') {
    cardPosition(cardElement, `${top}px`, `${left}px`, zIndex + 50);
  }
  
  else {
    cardPosition(cardElement, `${top}px`, `${left}px`, zIndex);
  }
}


// --------------- 我是分隔線 --------------- //


// 確認卡片顏色
function isSameColor(aCardData, bCardData) {
  return aCardData.color == bCardData.color;
}

// 確認卡片花色
function isSameSuit(aCardData, bCardData) {
  return aCardData.suit == bCardData.suit;
}

// 確認卡片數字相差
function cardNumDiff(aCardData, bCardData) {
  return aCardData.num - bCardData.num;
}

// 找卡片
function findCard(cardData) {
  for (let i = 0; i < cascades.length; i++) {
    for (let j = 0; j < cascades[i].length; j++) {
      if (cardData.name == cascades[i][j].name) {
        return `cas${i}`;
      }
    }
  }

  for (let i = 0; i < foundations.length; i++) {
    for (let j = 0; j < foundations[i].length; j++) {
      if (cardData.name == foundations[i][j].name) {
        return `fou${i}`;
      }
    }
  }

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      if (cardData.name == cells[i][j].name) {
        return `cel${i}`;
      }
    }
  }

  for (let i = 0; i < cardsInHand.cards.length; i++) {
    if (cardData.name == cardsInHand.cards[i].name) {
      return `han`;
    }
  }
}

// 拿起卡片
function takeCard(location, count) {
  let cardData;

  if (location.startsWith('han')) {
    cardData = cardsInHand.cards.splice(cardsInHand.cards.length - count, count);
    return cardData;
  }

  if (location.startsWith('cas')) {
    cardData = cascades[location[3]].splice(cascades[location[3]].length - count, count);
    return cardData;
  }

  if (location.startsWith('fou')) {
    cardData = foundations[location[3]].splice(foundations[location[3]].length - count, count);
    return cardData;
  }

  if (location.startsWith('cel')) {
    cardData = cells[location[3]].splice(cells[location[3]].length - count, count);
    return cardData;
  }
}

// 放下卡片
  function putCard(location, ...cardData) {
  if (location.startsWith('cas')) {
    cascades[location[3]].splice(cascades[location[3]].length, 0, ...cardData);
  }

  if (location.startsWith('fou')) {
    foundations[location[3]].splice(foundations[location[3]].length, 0, ...cardData);
  }

  if (location[0] == 'c' && location[1] == 'e' && location[2] =='l') {
    cells[location[3]].splice(cells[location[3]].length, 0, ...cardData);
  }
}

// 確認可抓起幾張卡片
function getDraggableNum(cardData) {
  if (cardsInHand.cards.length !== 0) {
    return cardsInHand.cards.length;
  }
  for (let i = 0; i < foundations.length; i++) {
    for (let j = 0; j < foundations[i].length; j++) {
      if (cardData.name == foundations[i][j].name) {
        return 1;
      }
    }
  }

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      if (cardData.name == cells[i][j].name) {
        return 1;
      }
    }
  }

  let column;
  let order;

  for (let i = 0; i < cascades.length; i++) {
    for (let j = 0; j < cascades[i].length; j++) {
      if (cardData.name == cascades[i][j].name) {
        column = i;
        order = j;
      }
    }
  }

  let numCard = 1;

  for (let i = order; i < cascades[column].length - 1; i++) {
    let diffColor = isSameColor(cascades[column][i], cascades[column][i + 1]);
    let notOneDiff = cardNumDiff(cascades[column][i], cascades[column][i + 1]) != 1;
    if (diffColor || notOneDiff) {
      return 0;
    }
    numCard = (numCard + 1);
  }

  return numCard;
}

// 最多可同時移動幾張卡片
function getMaxMovableNum(m, n) {
  return Math.pow(2, m) * (n + 1);
}

function returnCards() {
  let takenCard = takeCard('han', cardsInHand.cards.length);
  putCard(cardsInHand.from, ...takenCard);
}

// 將卡片放到空白欄框
function goToCells(cardData, cellNum) {
  if (cells[cellNum].length == 0 && getDraggableNum(cardData) == 1) {
    let takenCard = takeCard(findCard(cardData), 1);
    putCard(`cel${cellNum}`, ...takenCard);
    history.push(record);
    movementCount++;
    renderMovements();
  }
  
  else {
    returnCards();
  }
}

// 將卡片放到本位欄框
function goToFoundations(cardData, fNum) {
  let foundL = foundations[fNum].length;

  if (((foundL == 0 && cardData.num == 1) || (foundL > 0 && isSameSuit(cardData, foundations[fNum][0]) && cardNumDiff(cardData, foundations[fNum][foundL - 1]) == 1)) && getDraggableNum(cardData) == 1) {
    let takenCard = takeCard(findCard(cardData), 1);
    putCard(`fou${fNum}`, ...takenCard);
    history.push(record);
    movementCount++;
    renderMovements();
  }

  else {
    returnCards();
  }
}

// 在牌疊堆疊卡片
function stackingCards(cardData, casNum) {
  let availableCas = 0;
  let availableCell = 0;

  for (let i = 0; i < cascades.length; i++) {
    if (cascades[i].length == 0 && i !== casNum) {
      availableCas++
    }
  }

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].length == 0) {
      availableCell++
    }
  }

  let canBeDragged = getDraggableNum(cardData) > 0;
  let hasSpace = getDraggableNum(cardData) <= getMaxMovableNum(availableCas, availableCell);

  if (!canBeDragged || !hasSpace) {
    returnCards();
    return;
  }

  // 卡片移到空格子
  if (cascades[casNum].length == 0) {
    let takenCard = takeCard(findCard(cardData), getDraggableNum(cardData));
    putCard(`cas${casNum}`, ...takenCard);
    history.push(record);
    movementCount++;
    renderMovements();
  }
  
  // 卡片移到別堆卡片上
  else{
    let diffColor = !isSameColor(cardData, ...cascades[casNum].slice(-1));
    let smallerByOne = cardNumDiff(cardData, ...cascades[casNum].slice(-1)) == -1;

    if (diffColor && smallerByOne) {
      let takenCard = takeCard(findCard(cardData), getDraggableNum(cardData));
      putCard(`cas${casNum}`, ...takenCard);
      history.push(record);
      movementCount++;
      renderMovements();
    }

    else{
      returnCards();
    }
  }
}

// 指定卡片移動至本位欄框、空白欄框或堆疊卡片
function moveCardTo(cardData, location) {
  if (location.startsWith('cel')) {
    goToCells(cardData, location[3])
  }

  if (location.startsWith('fou')) {
    goToFoundations(cardData, location[3])
  }

  if (location.startsWith('cas')) {
    stackingCards(cardData, location[3])
  }
}
