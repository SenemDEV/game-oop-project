class Mygame {
  constructor() {
    this.player = null;
    this.snowballsArr = [];
  }

  start() {
    this.player = new Player();
    this.attachEventListeners();

    setInterval( () => {
      const mySnowball = new Snowball();
      this.snowballsArr.push(mySnowball);
    }, 500);

    setInterval( () => {
      this.snowballsArr.forEach((snow) => {
        snow.moveDown();
        this.detectCollision(snow);
        this.removeFromGame(snow);
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

  detectCollision(snow) {
    if (
        this.player.positionX < snow.positionX + snow.width &&
        this.player.positionX + this.player.width > snow.positionX &&
        this.player.positionY < snow.positionX + snow.height &&
        this.player.height + this.player.positionY > snow.positionY
      ) 
      {
        //window.location.href = "./game-over-page.html"
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
    this.positionX -= 2;
    this.playerElm.style.left = this.positionX + "vw";
    //console.log(`current position...`, this.positionX )
  }
  moveRight() {
    this.positionX += 2;
    this.playerElm.style.left = this.positionX + "vw";
    //console.log(`current position...`, this.positionX)
  }
}

class Snowball {
  constructor() {
    this.height = Math.floor((Math.random() * 30) + 1);//was 10;
    this.width =   Math.floor((Math.random() * Math.random()) + 1);   //was 20;
    this.positionX = Math.floor((Math.random() * 70) + 1);
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
    this.positionY--;
    console.log(this.positionY);
    this.snowballElm.style.border = "3px solid red";
    this.snowballElm.style.bottom = this.positionY + "vh";
  }
}


const game = new Mygame();
game.start();


/////////////////////////////////

// this.obstaclePositnion = [0, 70, 140, 210, 280, 350, 420];
//         this.positionY = this.obstaclePositnion[Math.floor(Math.random() * this.obstaclePositnion.length)];