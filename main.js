class Mygame {
  constructor() {
    this.player = null; 
    this.snowballsArr = []; // refers to the snowflakes;
    this.fireballsArr = []; // refers to the white snowball;
    this.bulletsArr = []; // refers to the shield;
  }

  start() {
    this.player = new Player();
    this.attachEventListeners();

    //Setinterval for the snowflakes
    setInterval(() => {
      const mySnowball = new Snowball();
      this.snowballsArr.push(mySnowball);
    }, 1000);

    setInterval(() => {
      this.bulletsArr.forEach((bulletInstance) => {
        bulletInstance.bulletMove();
        this.detectBulletCollision(bulletInstance);
      });
    }, 16);

    // SetInterval refers to snowflakes;
    setInterval(() => {
      this.snowballsArr.forEach((snow) => {
        snow.moveDown();
        this.detectCollision(snow);
        this.removeFromGame(snow); // Removes the snowflakes from the DOM (snowElm);
      });
    }, 60);

    // SetInterval refers to the white snowballs  (Fireball > actually the white snowball)
    setInterval(() => {
      const myFireball = new Fireball();
      this.fireballsArr.push(myFireball);
    }, 3000);
    // SetInterval refers to the white snowballs  (Fireball > actually the white snowball)
    setInterval(() => {
      this.fireballsArr.forEach((fireballInstance) => {
        fireballInstance.moveUp();
        this.removeFromGame(fireballInstance);
      });
    }, 26);
  }

  attachEventListeners() {
    //Event listener for the key detection
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (e.key === "ArrowRight") {
        this.player.moveRight();
      } else if (e.keyCode === 32) {
        const myBullet = new Bullet(
          this.player.positionX,
          this.player.positionY
        );
        this.bulletsArr.push(myBullet);
      }
    });

    // Event listener for the Timer
    window.addEventListener("load", () => {
      const timerElm = document.getElementById("timer");
      const timer = new Timer(timerElm);
      timer.start();

      setTimeout(() => {
        timer.stop();
      }, 1000 * 1000);
    });
  }

  //Snow (snowElm) refers to the snowflakes in the game;
  detectCollision(snow) {
    if (
      this.player.positionX < snow.positionX + snow.width &&
      this.player.positionX + this.player.width > snow.positionX &&
      this.player.positionY < snow.positionY + snow.height &&
      this.player.height + this.player.positionY > snow.positionY
    ) {
      window.location.href = "./game-over-page.html";
    }
  }

  // snow (snowElm) refers to the snowflakes in the game
  removeFromGame(snow) {
    if (snow.positionY < -10) {
      snow.snowballElm.remove();
      this.snowballsArr.shift();
    }
  }

  // refers to the collision between the shield and the snowflakes;
  detectBulletCollision(bulletInstance) {
    this.snowballsArr.forEach((snow, index) => {
      if (
        bulletInstance.positionY > snow.positionY &&
        bulletInstance.positionY < snow.positionY + snow.height &&
        bulletInstance.positionX + bulletInstance.width > snow.positionX &&
        bulletInstance.positionX < snow.positionX + snow.width
      ) {
        snow.snowballElm.remove();
        bulletInstance.bulletElm.remove();
        this.snowballsArr.splice(index, 1);
      }
    });
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
    if (this.positionX) {
      this.positionX -= 2;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.positionX < 90) {
      this.positionX += 2;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }
}

class Snowball {
  constructor() {
    this.height = 20; //Math.floor(Math.random() * 30 + 1); //was 10;
    this.width = 7; //Math.floor(Math.random() * Math.random() + 5); //was 20;
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

    this.snowballElm.style.height = this.height + "vh";
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
    this.positionY -= 2;
    this.snowballElm.style.bottom = this.positionY + "vh";
  }
}

// the Fireball name refers to the White big snowball passing by;
class Fireball {
  constructor() {
    this.height = 30;
    this.width = 10;
    this.positionX = Math.floor(Math.random() * 70 + 1);
    this.positionY = 0;
    this.fireballElm = null;
    this.createDomElmFireball();
  }

  createDomElmFireball() {
    this.fireballElm = document.createElement("div");

    this.fireballElm.className = "fireball";
    this.fireballElm.style.left = this.positionX + "vw";

    this.fireballElm.style.height = this.height + "vh";
    this.fireballElm.style.width = this.width + "vw";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.fireballElm);

    setTimeout(() => {
      this.fireballElm.remove();
    }, 5000);
  }

  moveUp() {
    this.positionY++;
    this.fireballElm.style.bottom = this.positionY + "vh";
  }
}

class Timer {
  constructor(timerElm) {
    this.timerElm = timerElm;
    this.seconds = 0;
    this.minutes = 0;
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      this.timeCount();
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    this.seconds = 0;
    this.minutes = 0;
    this.timeCount();
    localStorage.clear();
  }

  timeCount() {
    const minutesStr =
      this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
    const secondsStr =
      this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
    this.timerElm.textContent = `${minutesStr}:${secondsStr}`;
    localStorage.timer = this.timerElm.textContent;
  }
}

// Refers to the shield element which protects the player;
class Bullet {
  constructor(positionX, positionY) {
    Bullet;
    this.width = 10;
    this.height = 1;
    this.positionX = positionX;
    this.positionY = positionY;
    this.bulletElm = null;
    this.createBulletElement();
  }
  createBulletElement() {
    this.bulletElm = document.createElement("div");
    this.bulletElm.className = "bullet";
    this.bulletElm.style.width = this.width + "vw";
    this.bulletElm.style.height = this.height + "vh";
    this.bulletElm.style.bottom = this.positionY + "vh";
    this.bulletElm.style.left = this.positionX + "vw";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.bulletElm);

    // to remove bulletElm from the DOM;
    setTimeout(() => {
      this.bulletElm.remove();
    }, 9000);
  }

  bulletMove() {
    this.positionY++;
    this.bulletElm.style.bottom = this.positionY + "vh";
  }
}

const game = new Mygame();
game.start();
