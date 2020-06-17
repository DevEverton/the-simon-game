const GLOBAL_GAME = {};
let GLOBAL_LEVEL = 0;
let GAME_ON = false;

window.addEventListener("load", () => {
  startGame();
});

function startGame() {
  $(document).keypress(() => {
    if (!GAME_ON) {
      playGame();
      $("#level-title").text(`Level ${GLOBAL_LEVEL}`);
      GAME_ON = true;
    }
  });
}

function playGame() {
  function getRandomColor() {
    const colors = ["red", "green", "blue", "yellow"];
    let ranNum = Math.floor(Math.random() * 4);
    return colors[ranNum];
  }
  GLOBAL_LEVEL++;
  const buttons = getButtons();

  switch (getRandomColor()) {
    case "red":
      playSound("./sounds/red.mp3");
      animate(buttons.red);
      GLOBAL_GAME[GLOBAL_LEVEL] = "red";
      break;
    case "green":
      playSound("./sounds/green.mp3");
      animate(buttons.green);
      GLOBAL_GAME[GLOBAL_LEVEL] = "green";
      break;
    case "blue":
      playSound("./sounds/blue.mp3");
      animate(buttons.blue);
      GLOBAL_GAME[GLOBAL_LEVEL] = "blue";
      break;
    case "yellow":
      playSound("./sounds/yellow.mp3");
      animate(buttons.yellow);
      GLOBAL_GAME[GLOBAL_LEVEL] = "yellow";
      break;
    default:
      break;
  }
  console.log(GLOBAL_GAME);
}

function gameOver() {}

function getButtons() {
  const red = $("#red");
  const green = $("#green");
  const yellow = $("#yellow");
  const blue = $("#blue");
  return { red, green, blue, yellow };
}

function playSound(location) {
  let sound = new Audio(location);
  sound.play();
}
function animate(id) {
  id.animate(
    {
      opacity: 0.25,
    },
    100,
    () => {
      id.animate({ opacity: 1 });
    }
  );
}
