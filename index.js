let sequence = [];
let playerSequence = [];
let index = 0;
let LEVEL = 0;
let GAME_ON = false;

window.addEventListener("load", () => {
  startGame();
});

function startGame() {
  const buttons = getButtons();
  function start() {
    if (!GAME_ON) {
      setTimeout(() => {
        playGame();
      }, 500);
      addClickListeners(buttons);
      GAME_ON = true;
    }
  }

  $(document).on("touchstart", () => {
    start();
  });

  $(document).keypress(() => {
    start();
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
      sequence.push("red");
      break;
    case "green":
      buttonAnimate(buttons.green, "./sounds/green.mp3");
      sequence.push("green");
      break;
    case "blue":
      buttonAnimate(buttons.blue, "./sounds/blue.mp3");
      sequence.push("blue");
      break;
    case "yellow":
      buttonAnimate(buttons.yellow, "./sounds/yellow.mp3");
      sequence.push("yellow");
      break;
    default:
      break;
  }
}

function gameOver() {
  GAME_ON = false;
  LEVEL = 0;
  sequence = [];
  playerSequence = [];
  index = 0;
  $("div").off();
  $("#level-title").text(`Game Over. Click any key to restart.`);
  setTimeout(() => {
    playSound("./sounds/wrong.mp3");
  }, 200);
  $("body").css("background-color", "red");
  $("body").animate(
    {
      opacity: 0.25,
    },
    200,
    () => {
      $("body").css("background-color", "#011F3F");
      $("body").animate({ opacity: 1 });
    }
  );
}

function buttonAnimate(button, location) {
  playSound(location);
  animate(button);
}

function addClickListeners(buttons) {
  const colors = ["red", "green", "blue", "yellow"];
  for (let i = 0; i < colors.length; i++) {
    buttons[colors[i]].click((event) => {
      let id = event.target.id;
      buttonAnimate(buttons[colors[i]], `./sounds/${colors[i]}.mp3`);
      playerSequence.push(id);

      if (id === sequence[index]) {
        index++;
      } else {
        gameOver();
        return;
      }
      if (sequence.length === playerSequence.length) {
        setTimeout(() => {
          playGame();
        }, 1000);
        playerSequence = [];
        index = 0;
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
