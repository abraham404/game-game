let canvas,
  ctx,
  fps = 10;
let canvasX = 500, //with
  canvasY = 500; //height
let tileX, tileY;

//board
let board,
  rows = 100,
  columns = 100;
let colorWhite = "#FFFFFF",
  colorBlack = "#000000";

const createArray2D = (r, c) => {
  let obj = new Array(r);
  for (let i = 0; i < r; i++) {
    obj[i] = new Array(c);
  }
  return obj;
};

let Agente = function (x, y, state) {
  this.x = x;
  this.y = y;
  this.state = state;
  this.stateProx = this.state;

  this.neighbors = [];

  this.addNeighbors = function () {
    let xNeighbor, yNeighbor;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        xNeighbor = (j + this.x + columns) % columns;
        yNeighbor = (i + this.y + rows) % rows;

        if (i != 0 || j != 0) {
          this.neighbors.push(board[yNeighbor][xNeighbor]);
        }
      }
    }
  };

  this.draw = function () {
    let color;
    if (this.state == 1) {
      color = colorWhite;
    } else {
      color = colorBlack;
    }
    ctx.fillStyle = color;
    ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
  };

  console.log(this.neighbors.length);

  this.newCicle = function () {
    let add = 0;
    for (let i = 0; i < this.neighbors.length; i++) {
      if (this.neighbors[i].state == 1) {
        add++;
      }
    }

    this.stateProx = this.state;

    if (add < 2 || add > 3) {
      this.stateProx = 0;
    }

    if (add == 3) {
      this.stateProx = 1;
    }
  };

  this.mutation = function () {
    this.state = this.stateProx;
  };
};

const startBoard = (obj) => {
  let stateBoard;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      stateBoard = Math.floor(Math.random() * 2);
      obj[y][x] = new Agente(y, x, stateBoard);
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      obj[y][x].addNeighbors();
    }
  }
};

const start = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = canvasX;
  canvas.height = canvasY;
  console.log("hello");

  tileX = Math.floor(canvasX / rows);
  tileY = Math.floor(canvasY / columns);

  board = createArray2D(rows, columns);

  startBoard(board);

  setInterval(function () {
    fMain();
    console.log("efer");
  }, 1000 / fps);
};

const deleteCanvas = () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
};

const drawBoard = (obj) => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      obj[y][x].draw();
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      obj[y][x].newCicle();
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      obj[y][x].mutation();
    }
  }
};

const fMain = () => {
  console.log("Hello abraham");
  deleteCanvas();
  drawBoard(board);
};
