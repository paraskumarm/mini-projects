//game variables
let inputDir = { x: 0, y: 0 };
let speed = 10;
let snakeArr = [{ x: 14, y: 6 }];
let food = { x: 12, y: 3 };
let score = 0;
let lastpainttime = 0;
// l
//game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  //   console.log(ctime);
  gameEngine();
}
function isCollide(sarr) {
  //if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }
  if (sarr[0].x > 18 || sarr[0].x < 0 || sarr[0].y > 18 || sarr[0].y < 0)
    return true;
  return false;
}
function gameEngine() {
  // update snake and food
  
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 14, y: 6 }];
    score = 0;
    scoreval.innerHTML="Score:"+score;
    alert("Game Over");
  }
  //if you have eaten the food
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    score+=1;
    // console.log(score);
    scoreval.innerHTML="Score:"+score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //moving snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // display  snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    // snakeElement.classList.add("snake");
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // display food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic
/*
if(localStorage.getItem("highscore")===null){
    localStorage.setItem("highscore",0);
  }else{
    highscoreBox.innerHTML="HighScore :"+localStorage.getItem("highscore");
  }
*/
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
    //   console.log("U");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
    //   console.log("D");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
    //   console.log("L");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
    //   console.log("R");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
