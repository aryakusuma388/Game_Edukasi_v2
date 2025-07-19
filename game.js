const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let robotX = 0, robotY = 0;
let finishX = 0, finishY = 0;
let commands = [];
let currentLevel = 1;
let gridSize = 40;
let gridCount = 10;
let imagesLoaded = 0;

const robotImg = new Image();
robotImg.src = "icon/murid.png";

const finishImg = new Image();
finishImg.src = "icon/sekolah.png";

const obstacleImg = new Image(); // Rumah
obstacleImg.src = "icon/rumah.png";

const buildingImg = new Image(); // Gedung
buildingImg.src = "icon/gedung.png";

const pathImg = new Image(); // Jalan
pathImg.src = "icon/jalanan.png";

const premanImg = new Image();
premanImg.src = "icon/preman.png"; 

robotImg.onload = imageLoaded;
finishImg.onload = imageLoaded;
obstacleImg.onload = imageLoaded;
buildingImg.onload = imageLoaded;
pathImg.onload = imageLoaded;
premanImg.onload = imageLoaded;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 6) {
    setLevel(1);
  }
}

const levels = {
  1: {
    grid: 5,
    start: [0, 0],
    goal: [4, 4],
    obstacles: [
      { x: 0, y: 1, type: 1 },
      { x: 1, y: 1, type: 1 },
      { x: 2, y: 1, type: 1 },
      { x: 3, y: 1, type: 1 },
      { x: 1, y: 3, type: 1 },
      { x: 2, y: 3, type: 1 },
      { x: 3, y: 3, type: 1 },
      { x: 4, y: 3, type: 1 }
    ]
  },
  2: {
    grid: 7,
    start: [0, 0],
    goal: [6, 6],
    obstacles: [
      { x: 1, y: 1, type: 1 },
      { x: 2, y: 1, type: 1 },
      { x: 3, y: 1, type: 1 },
      { x: 4, y: 1, type: 1 },
      { x: 5, y: 1, type: 1 },
      { x: 0, y: 3, type: 1 },
      { x: 1, y: 3, type: 1 },
      { x: 2, y: 3, type: 1 },
      { x: 4, y: 3, type: 1 },
      { x: 5, y: 3, type: 1 },
      { x: 6, y: 3, type: 1 },
      { x: 1, y: 5, type: 2 },
      { x: 2, y: 5, type: 2 },
      { x: 3, y: 5, type: 2 },
      { x: 4, y: 5, type: 2 },
      { x: 5, y: 5, type: 2 },
      { x: 1, y: 6, type: 2 },
      { x: 2, y: 6, type: 2 },
      { x: 3, y: 6, type: 2 },
      { x: 4, y: 6, type: 2 },
      { x: 5, y: 6, type: 2 }
    ]
  },
  3: {
    grid: 9,
    start: [0, 0],
    goal: [8, 8],
    obstacles: [
      { x: 1, y: 1, type: 1 }, { x: 2, y: 1, type: 2 }, { x: 3, y: 1, type: 1 },{ x: 5, y: 1, type: 1 }, { x: 6, y: 1, type: 2 }, { x: 7, y: 1, type: 1 },
      { x: 1, y: 2, type: 2 }, { x: 3, y: 2, type: 2 }, { x: 5, y: 2, type: 2 },{ x: 7, y: 2, type: 2 },
      { x: 1, y: 3, type: 1 }, { x: 2, y: 3, type: 2 }, { x: 3, y: 3, type: 1 },{ x: 5, y: 3, type: 1 }, { x: 6, y: 3, type: 2 }, { x: 7, y: 3, type: 1 },
      { x: 1, y: 5, type: 1 }, { x: 2, y: 5, type: 2 }, { x: 3, y: 5, type: 1 },{ x: 5, y: 5, type: 1 }, { x: 6, y: 5, type: 2 }, { x: 7, y: 5, type: 1 },
      { x: 1, y: 6, type: 2 }, { x: 3, y: 6, type: 2 }, { x: 5, y: 6, type: 2 },{ x: 7, y: 6, type: 2 },
      { x: 1, y: 7, type: 1 }, { x: 2, y: 7, type: 2 }, { x: 3, y: 7, type: 1 },{ x: 5, y: 7, type: 1 }, { x: 6, y: 7, type: 2 }, { x: 7, y: 7, type: 1 },
      { x: 0, y: 6, type: 3 },{ x: 2, y: 0, type: 3 },{ x: 4, y: 8, type: 3 },{ x: 5, y: 4, type: 3 }, //preman
    ]
  },
  4: {
    grid: 10,
    start: [0, 0],
    goal: [9, 9],
    obstacles: [
      { x: 1, y: 1, type: 1 }, { x: 2, y: 1, type: 1 }, { x: 3, y: 1, type: 1 },{ x: 5, y: 1, type: 1 },{ x: 6, y: 1, type: 1 },{ x: 7, y: 1, type: 1 },{ x: 9, y: 1, type: 1 },
      { x: 0, y: 3, type: 1 },{ x: 1, y: 3, type: 1 }, { x: 2, y: 3, type: 1 }, { x: 4, y: 3, type: 1 },{ x: 5, y: 3, type: 1 },{ x: 6, y: 3, type: 1 },{ x: 8, y: 3, type: 1 },{ x: 9, y: 3, type: 1 },
      { x: 0, y: 5, type: 1 },{ x: 1, y: 5, type: 1 }, { x: 3, y: 5, type: 2 }, { x: 4, y: 5, type: 2 },{ x: 5, y: 5, type: 2 },{ x: 7, y: 5, type: 1 },{ x: 8, y: 5, type: 1 },{ x: 9, y: 5, type: 1 },
      { x: 0, y: 7, type: 1 },{ x: 2, y: 7, type: 1 }, { x: 3, y: 7, type: 1 }, { x: 4, y: 7, type: 1 },{ x: 6, y: 7, type: 1 },{ x: 7, y: 7, type: 2 },{ x: 8, y: 7, type: 2 },
      { x: 0, y: 8, type: 2 },{ x: 2, y: 9, type: 2 }, { x: 4, y: 8, type: 2 }, { x: 6, y: 9, type: 1 },{ x: 8, y: 8, type: 2 },
      { x: 2, y: 2, type: 3 },{ x: 8, y: 2, type: 3 }, { x: 5, y: 4, type: 3 }, { x: 2, y: 6, type: 3 },{ x: 8, y: 6, type: 3 },{ x: 3, y: 9, type: 3 }, //preman 
    ]
  }
};

function setLevel(levelNumber) {
  currentLevel = levelNumber;
  const level = levels[levelNumber];
  gridCount = level.grid;
  gridSize = Math.floor(400 / gridCount);

  robotX = level.start[0] * gridSize;
  robotY = level.start[1] * gridSize;
  finishX = level.goal[0] * gridSize;
  finishY = level.goal[1] * gridSize;

  commands = [];
  document.getElementById("commandList").textContent = "";
  document.getElementById("levelIndicator").textContent = `Level: ${currentLevel}`;
  drawGrid();
}

function isObstacleTile(x, y) {
  return levels[currentLevel].obstacles.some(obs => obs.x === x && obs.y === y);
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      // Jalan hanya di titik yang tidak ada obstacle
      if (!isObstacleTile(x, y)) {
        ctx.drawImage(pathImg, x * gridSize, y * gridSize, gridSize, gridSize);
      }
      ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }

  levels[currentLevel].obstacles.forEach(({ x, y, type }) => {
    let img;
    if (type === 1) img = obstacleImg;
    else if (type === 2) img = buildingImg;
    else if (type === 3) img = premanImg; // preman

    ctx.drawImage(img, x * gridSize, y * gridSize, gridSize, gridSize);
  });

  ctx.drawImage(finishImg, finishX, finishY, gridSize, gridSize);
  ctx.drawImage(robotImg, robotX, robotY, gridSize, gridSize);
}

function addCommand(cmd) {
  commands.push(cmd);
  document.getElementById("commandList").textContent = `Jumlah Perintah: ${commands.length}`;
}

function isWalkable(x, y) {
  const gx = x / gridSize;
  const gy = y / gridSize;
  return gx >= 0 && gx < gridCount && gy >= 0 && gy < gridCount && !isObstacleTile(gx, gy);
}

function getObstacleTypeAt(x, y) {
  const gx = x / gridSize;
  const gy = y / gridSize;
  const obs = levels[currentLevel].obstacles.find(o => o.x === gx && o.y === gy);
  return obs ? obs.type : 0;
}


function runCommands() {
  
  let i = 0;
  
  const interval = setInterval(() => {
    if (i >= commands.length) {
      clearInterval(interval);
      setTimeout(checkFinish, 200);
      return;
    }

    const cmd = commands[i];
    let nextX = robotX;
    let nextY = robotY;

    if (cmd === "RIGHT") nextX += gridSize;
    else if (cmd === "LEFT") nextX -= gridSize;
    else if (cmd === "UP") nextY -= gridSize;
    else if (cmd === "DOWN") nextY += gridSize;

    if (isWalkable(nextX, nextY)) {
       robotX = nextX;
       robotY = nextY;

       // 🔊 Mainkan suara langkah
       const stepSound = new Audio("sound/step.mp3");
       stepSound.volume = 0.5; // opsional
       stepSound.play();
    }
    const type = getObstacleTypeAt(nextX, nextY);
    if (type === 3) {
        alert(" Kamu di tangkap Preman, uang jajan kamu lenyap");
        clearInterval(interval);
        setTimeout(() => resetGame(), 500);
  return;
}

    drawGrid();
    i++;
  }, 400);
}


function checkFinish() {
  if (robotX === finishX && robotY === finishY) {
    alert(`Selamat Belajar! Kamu menyelesaikan Level ${currentLevel}`);
    if (currentLevel < Object.keys(levels).length) {
      setLevel(currentLevel + 1);
    } else {
      setTimeout(() => {
        window.location.href = "end.html";
      }, 500);
      //alert("🎉 Selamat kamu lulus dari Sekolah 🎉");
      //setLevel(1);
    }
  } else {
    alert("Kamu kemana aja, Bolos yahh!");
    setTimeout(() => resetGame(), 500);
  }
}

function resetGame() {
  setLevel(currentLevel);
}
