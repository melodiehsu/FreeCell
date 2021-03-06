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

// HTML???????????????
window.onload = function () {
  createCards();
  initialize();
  startAGame();
}

// ???????????????????????????????????????????????????
window.addEventListener('resize', render);

// ?????????
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

// ??????????????????
function setMovement() {
  movementCount = 0;
  renderMovements();
}

function renderMovements() {
  movement.innerHTML = `${movementCount}`;
}

// ????????????
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

// ???????????????
function startAGame() {
  foundations = [[],[],[],[]];
  cells = [[],[],[],[]];
  history = [];
  changeUndoButtonSrc();

  // ??????
  const CARD_ARR = [[],[],[],[],[],[],[],[]];
  let length = cards.length;
  let random;
  while (length) {
    random = Math.floor(Math.random() * length--);
    [cards[length], cards[random]] = [cards[random], cards[length]];
  }

  // ??????
  for (let i = 0; i < cards.length; i++) {
    CARD_ARR[i % 8].push(cards[i]);
    let element = document.querySelector(`#${cards[i].name}`);
    let zIndex = Math.ceil((i+1) / 8);
    cardPosition(element, '100%', '50%', zIndex, false);
  }

  cascades = CARD_ARR;

  render();
}

// ??????????????????
function restartTheGame() {
  for (let i = history.length - 1; i >= 0; i--) {
    undo();
  }
  setMovement();
  render();
}

// ????????????????????????
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
    placingCard(cardElement, `han`, i + 1)
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

// ?????????
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
    isGameStarted = true;
    startTimer();
  }

  let canAutoMove;
  do {
    canAutoMove = false;
    let cardData;
    for (let i = 0; i < cascades.length; i++) {
      if (cascades[i].length == 0) {
        continue;
      }
      cardData = cascades[i][cascades[i].length - 1];
      record = {
        cards: [cardData],
        from: `cas${i}`,
      };
      for (let j = 0; j < foundations.length; j++) {
        if (findCard(cardData) == (`cas${i}` || `cel${j}`)) {
          if (moveCardTo(cardData, `fou${j}`)) {
            canAutoMove = true;
          }
        }
      }
    }
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].length == 0) {
        continue;
      }
      cardData = cells[i][0];
      record = {
        cards: [cardData],
        from: `cas${i}`,
      };
      for (let j = 0; j < foundations.length; j++) {
        if (findCard(cardData) == `cas${i}` || `cel${j}`) {
          if (moveCardTo(cardData, `fou${j}`)) {
            canAutoMove = true;
          }
        }
      }
    }
  }
  while (canAutoMove == true);

  if(isWon()){
    isGameStarted = false;
    pauseTimer();
    createWinningWindow();
    history = [];
    changeUndoButtonSrc();
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

// ????????????
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

  // ?????????????????????????????????????????????
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

  // ???????????????????????????
  let targetLocation = cardsInHand.from;

  for (let i = 0; i < cascades.length; i++) {
    // ???????????????????????????????????????????????????
    if (targetLocation.startsWith('cas') && targetLocation[3] == i) {
      continue;
    }
    // ???cascades??????????????????????????????????????????????????????????????????
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


// ???????????????????????????
let animationMap = new Map();
function cardPosition(cardElement, top, left, zIndex, moveAnimation) {
  // if (cardElement.style.top == top && cardElement.style.left == left) {
  //   return;
  // }

  clearTimeout(animationMap.get(cardElement.id));

  cardElement.style.top = top;
  cardElement.style.left = left;
  cardElement.style.zIndex = zIndex;

  if (moveAnimation) {
    cardElement.classList.add('moveAnimation');
  }

  let id = setTimeout(function() {
    cardElement.style.zIndex = zIndex;
    if (moveAnimation) {
      cardElement.classList.remove('moveAnimation');
    }
  }, 500);

  animationMap.set(cardElement.id, id);
}

// ???????????????????????????
function placingCard(cardElement, location, zIndex) {
  let destination;
  let cardInterval;
  if (location == 'han') {
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

  if (location == 'han') {
    cardPosition(cardElement, `${top}px`, `${left}px`, zIndex + 50, false);
  }
  
  else {
    cardPosition(cardElement, `${top}px`, `${left}px`, zIndex, true);
  }
}


// --------------- ??????????????? --------------- //


// ??????????????????
function isSameColor(aCardData, bCardData) {
  return aCardData.color == bCardData.color;
}

// ??????????????????
function isSameSuit(aCardData, bCardData) {
  return aCardData.suit == bCardData.suit;
}

// ????????????????????????
function cardNumDiff(aCardData, bCardData) {
  return aCardData.num - bCardData.num;
}

// ?????????
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

// ????????????
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

// ????????????
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

// ???????????????????????????
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

// ?????????????????????????????????
function getMaxMovableNum(m, n) {
  return Math.pow(2, m) * (n + 1);
}

function returnCards() {
  let takenCard = takeCard('han', cardsInHand.cards.length);
  putCard(cardsInHand.from, ...takenCard);
}

// ???????????????????????????
function goToCells(cardData, cellNum) {
  if (cells[cellNum].length == 0 && getDraggableNum(cardData) == 1) {
    let takenCard = takeCard(findCard(cardData), 1);
    putCard(`cel${cellNum}`, ...takenCard);
    history.push(record);
    movementCount++;
    renderMovements();

    return true;
  }
  
  else {
    returnCards();
    return false;
  }
}

// ???????????????????????????
function goToFoundations(cardData, fNum) {
  let foundL = foundations[fNum].length;

  if (((foundL == 0 && cardData.num == 1) || (foundL > 0 && isSameSuit(cardData, foundations[fNum][0]) && cardNumDiff(cardData, foundations[fNum][foundL - 1]) == 1)) && getDraggableNum(cardData) == 1) {
    let takenCard = takeCard(findCard(cardData), 1);
    putCard(`fou${fNum}`, ...takenCard);
    history.push(record);
    movementCount++;
    renderMovements();

    return true;
  }

  else {
    returnCards();

    return false;
  }
}

// ?????????????????????
function stackingCards(cardData, casNum) {
  let availableCas = 0;
  let availableCell = 0;

  for (let i = 0; i < cascades.length; i++) {
    if (cascades[i].length == 0 && i !== (casNum && cardsInHand.from)) {
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

  // ?????????????????????
  if (cascades[casNum].length == 0) {
    let takenCard = takeCard(findCard(cardData), getDraggableNum(cardData));
    putCard(`cas${casNum}`, ...takenCard);
    history.push(record);
    movementCount++;
    renderMovements();

    return true
  }
  
  // ???????????????????????????
  else{
    let diffColor = !isSameColor(cardData, ...cascades[casNum].slice(-1));
    let smallerByOne = cardNumDiff(cardData, ...cascades[casNum].slice(-1)) == -1;

    if (diffColor && smallerByOne) {
      let takenCard = takeCard(findCard(cardData), getDraggableNum(cardData));
      putCard(`cas${casNum}`, ...takenCard);
      history.push(record);
      movementCount++;
      renderMovements();

      return true;
    }

    else{
      returnCards();
      return false;

    }
  }
}

// ???????????????????????????????????????????????????????????????
function moveCardTo(cardData, location) {
  if (location.startsWith('cel')) {
    if (goToCells(cardData, location[3])) {
      return true;
    }
  }

  if (location.startsWith('fou')) {
    if (goToFoundations(cardData, location[3])) {
      return true;
    }
  }

  if (location.startsWith('cas')) {
    if (stackingCards(cardData, location[3])) {
      return true;
    }
  }

  else{
    return false;
  }
}
