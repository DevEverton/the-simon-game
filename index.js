let GAMEPLAY = [];
let PLAYER = [];
let LEVEL = 0;
let GAME_ON = false;

window.addEventListener("load", () => {
  startGame();
});

function startGame() {
  const buttons = getButtons();
  $(document).keypress(() => {
    if (!GAME_ON) {
      playGame();
      addClickListeners(buttons);
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
  LEVEL++;
  $("#level-title").text(`Level ${LEVEL}`);
  const buttons = getButtons();

  switch (getRandomColor()) {
    case "red":
      buttonAnimate(buttons.red, "./sounds/red.mp3");
      GAMEPLAY.push("red");
      break;
    case "green":
      buttonAnimate(buttons.green, "./sounds/green.mp3");
      GAMEPLAY.push("green");
      break;
    case "blue":
      buttonAnimate(buttons.blue, "./sounds/blue.mp3");
      GAMEPLAY.push("blue");
      break;
    case "yellow":
      buttonAnimate(buttons.yellow, "./sounds/yellow.mp3");
      GAMEPLAY.push("yellow");
      break;
    default:
      break;
  }
}

function gameOver() {
  $("div").off();
  $("#level-title").text(`Game Over. Click any key to restart.`);
  GAME_ON = false;
  LEVEL = 0;
  GAMEPLAY = [];
  PLAYER = [];
}

function buttonAnimate(button, location) {
  playSound(location);
  animate(button);
}

function arraysEqual(a1, a2) {
  return JSON.stringify(a1) == JSON.stringify(a2);
}

function addClickListeners(buttons) {
  const colors = ["red", "green", "blue", "yellow"];
  for (let i = 0; i < colors.length; i++) {
    buttons[colors[i]].click((event) => {
      buttonAnimate(buttons[colors[i]], `./sounds/${colors[i]}.mp3`);
      PLAYER.push(event.target.id);

      if (PLAYER.length === GAMEPLAY.length) {
        if (arraysEqual(GAMEPLAY, PLAYER)) {
          setTimeout(() => {
            PLAYER = [];
            playGame();
          }, 1000);
        } else {
          gameOver();
        }
      }
    });
  }
}

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
