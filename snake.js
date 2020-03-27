document.body.style.backgroundColor = "#f1f1f1";
alert("Press the right or down arrow keys to start playing!!!");
function all() {
  document.body.style.backgroundColor = "f1f1f1";

  const unit = 30;
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  var score = 0;

  // var x = 0;
  // var y = unit;

  var snake = [];
  snake[0] = { posSnakeX: 0, posSnakeY: unit };

  var posSnakeX = 0;
  var posSnakeY = unit;

  var rightPressed = false;
  var leftPressed = false;
  var upPressed = false;
  var downPressed = false;

  //color the ground:
  //ctx.fillStyle = "rgb(255,233,236)"; //nice baby pink
  ctx.fillStyle = "rgb(236,255,233)";
  ctx.fillRect(0, unit, canvas.width, canvas.height);

  ctx.font = "25px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + score, 0, unit - 10);

  //snake color : rgb(236,255,233)
  function getFood() {
    posFoodX = unit * Math.floor(Math.random() * (canvas.width / unit));
    posFoodY = unit * Math.floor(Math.random() * (canvas.height / 35)) + unit;
    ctx.fillStyle = "rgb(15,107,0)";
    ctx.fillRect(posFoodX, posFoodY, unit, unit);
  }
  document.addEventListener("keydown", keyDownHandler);
  function keyDownHandler(event) {
    if (event.keyCode == 39) {
      rightPressed = true;
      leftPressed = false;
      downPressed = false;
      upPressed = false;
    } else if (event.keyCode == 37) {
      leftPressed = true;
      rightPressed = false;
      downPressed = false;
      upPressed = false;
    }
    if (event.keyCode == 40) {
      downPressed = true;
      leftPressed = false;
      rightPressed = false;
      upPressed = false;
    } else if (event.keyCode == 38) {
      upPressed = true;
      leftPressed = false;
      rightPressed = false;
      downPressed = false;
    }
  }
  getFood();

  //to check when the sneak eats itself:
  function snakeDead() {
    if (snake / length > 1)
      for (var j = 1; j < snake.length; snake++) {
        if (
          snake[0].posSnakeX == snake[j].posSnakeX &&
          snake[0].posSnakeY == snake[j].posSnakeY
        )
          return true;
      }
    return false;
  }
  var speed = 100;
  function drawSnake() {
    let timer = setInterval(function() {
      for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = "rgb(255,157,170)";
        ctx.fillRect(snake[i].posSnakeX, snake[i].posSnakeY, unit, unit);
      }

      let x = snake[0].posSnakeX;
      let y = snake[0].posSnakeY;

      let tailX = snake[snake.length - 1].posSnakeX;
      let tailY = snake[snake.length - 1].posSnakeY;

      if (rightPressed) {
        x += unit;
      } else if (leftPressed) {
        x -= unit;
      }
      if (downPressed) {
        y += unit;
      } else if (upPressed) {
        y -= unit;
      }

      if (snake[0].posSnakeX == posFoodX && posFoodY == snake[0].posSnakeY) {
        score++;
        ctx.clearRect(0, 0, canvas.width, unit);

        ctx.fillStyle = "red";

        ctx.fillText("Score: " + score, 0, unit - 10);
        getFood();
      } else {
        if (snake.length != 1) snake.pop();
      }

      var newSnakeHead = {
        posSnakeX: x,
        posSnakeY: y
      };
      snake.unshift(newSnakeHead);
      ctx.clearRect(tailX, tailY, unit, unit);
      ctx.fillStyle = "rgb(236,255,233)";
      ctx.fillRect(tailX, tailY, unit, unit);

      if (
        x > canvas.width ||
        x < 0 ||
        y < unit ||
        y > canvas.height ||
        snakeDead() == true
      ) {
        document.body.style.backgroundColor = "f1f1f1";
        document.removeEventListener("keydown", keyDownHandler);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "midnightblue";
        ctx.textAlign = "center";
        ctx.font = "80px 'Raleway', sans-serif";
        ctx.fillText("Game's Over :(", canvas.width / 2, canvas.height / 2);

        ctx.font = "30px 'Raleway', sans-serif";
        ctx.fillText(
          "Press the space bar to play again!!!",
          canvas.width / 2,
          canvas.height / 2 + 50
        );
        clearInterval(timer);

        if (score > 10) {
          speed = 10000;
        }
      }
    }, speed);
  }

  drawSnake();
}
all();
var play = false;
document.addEventListener("keydown", keySpaceHandler);
document.addEventListener("keyup", keyUpSpaceHandler);

function keySpaceHandler(event) {
  if (event.keyCode == 32) var play = true;
}
function keyUpSpaceHandler(event) {
  if (event.keyCode == 32) {
    var play = false;
    all();
  }
}
