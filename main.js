class Mygame {
  constructor() {
    this.player = null;
    this.snowballsArr = [];
    this.fireballsArr = [];
  }

  start() {
    this.player = new Player();
    this.attachEventListeners();

    setInterval(() => {
      const mySnowball = new Snowball();
      this.snowballsArr.push(mySnowball);
    }, 600);

    setInterval(() => {
      this.snowballsArr.forEach((snow) => {
        snow.moveDown();
        this.detectCollision(snow);
        this.removeFromGame(snow);
      });
    }, 16);

    setInterval(() => {
      const fireball = new Fireball();
      this.fireballsArr.push(fireball);
    }, 3000);

    setInterval(() => {
      this.fireballsArr.forEach((fireballInstance) => {
        fireballInstance.moveUp();
        //this.detectCollision(fireballInstance);
        this.removeFromGame(fireballInstance);
      });
    }, 16);
  }

  attachEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (e.key === "ArrowRight") {
        this.player.moveRight();
      }
    });
  }

  //detect colision

  removeFromGame(fireballInstance) {
    if (fireballInstance.positionY < -16) {
      fireballInstance.fireballElm.remove();
      this.fireballsArr.shift();
    }
  }

  detectCollision(snow) {
    if (
      this.player.positionX < snow.positionX + snow.width &&
      this.player.positionX + this.player.width > snow.positionX &&
      this.player.positionY < snow.positionX + snow.height &&
      this.player.height + this.player.positionY > snow.positionY
    ) {
      window.location.href = "./game-over-page.html"
    }
  }

  removeFromGame(snow) {
    if (snow.positionY < -16) {
      snow.snowballElm.remove();
      this.snowballsArr.shift();
    }
  }
}

class Player {
  constructor() {
    this.positionX = 0;
    this.positionY = 0;
    this.height = 30;
    this.width = 10;
    this.playerElm = document.getElementById("player");
    this.playerElm.style.height = this.height + "vh";
    this.playerElm.style.width = this.width + "vw";
  }
  moveLeft() {
    // player still can move out of the screen
    if (this.positionX) {
      this.positionX -= 2;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.positionX >= 0) {
      this.positionX += 2;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }
}

class Snowball {
  constructor() {
    this.height = 10; //Math.floor(Math.random() * 30 + 1); //was 10;
    this.width = Math.floor(Math.random() * Math.random() + 1); //was 20;
    this.positionX = Math.floor(Math.random() * 70 + 1);
    this.positionY = 100;
    this.snowballElm = null;
    this.createDomElmSnowball();

    //  this.myNewImgElm =null;
  }

  createDomElmSnowball() {
    this.snowballElm = document.createElement("div");

    this.snowballElm.className = "snowball";
    this.snowballElm.style.left = this.positionX + "vw";

    this.snowballElm.style.height = this.height + "vh"; //was originally h  //maybe should be w instead for better
    this.snowballElm.style.width = this.width + "vw";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.snowballElm);

    //     //Create a DOM element with img
    //     this.myNewImgElm = document.createElement('img');

    //     this.myNewImgElm.className = "snowball";
    //     myNewImgElm.setAttribute("src", "./snowball 3.jpg");
    //     const boardElm = document.getElementById("board");
    //     boardElm.appendChild(this.myNewImgElm);
  }

  moveDown() {
    this.positionY--;
    console.log(this.positionY);
    this.snowballElm.style.border = "3px solid red";
    this.snowballElm.style.bottom = this.positionY + "vh";
  }
}

class Fireball {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.positionX = 0; //Math.floor(Math.random() * 100 + 1);
    this.positionY = Math.floor(Math.random() * 100 + 1);
    this.fireballElm = null;
    this.createDomElmFireball();
  }

  createDomElmFireball() {
    this.fireballElm = document.createElement("div");

    this.fireballElm.className = "fireball";
    this.fireballElm.style.left = this.positionY + "vw"; //here vh could be?

    this.fireballElm.style.height = this.height + "vh";
    this.fireballElm.style.width = this.width + "vw";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.fireballElm);
  }

  moveUp() {
    this.positionY++;
    //console.log(this.positionX);
    this.fireballElm.style.border = "3px solid green";
    this.fireballElm.style.bottom = this.positionY + "vh";
  }
}

const game = new Mygame();
game.start();
