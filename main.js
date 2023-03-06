


class Player {
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.height = 30;
        this.width = 10;
        this.playerElm = document.getElementById("player")
        this.playerElm.style.height = this.height + "vh";
        this.playerElm.style.width = this.width + "vw";
    }
    moveLeft() {
       this.positionX--;
       this.playerElm.style.left = this.positionX + "vw";
       //console.log(`current position...`, this.positionX )
    }
    moveRight() {
        this.positionX++;
        this.playerElm.style.left = this.positionX + "vw";
       //console.log(`current position...`, this.positionX)
    }
   
}

class Snowball {
    constructor() {
        this.positionX = 40;
        this.positionY = 100;
        
        this.snowballElm = null;
        this.createDomElmSnowball();
        

    //  this.myNewImgElm =null;
        
    }

    createDomElmSnowball() {
        
     this.snowballElm = document.createElement("div");
     
     this.snowballElm.className = "snowball";
     this.snowballElm.style.left = this.positionX + "vw";
     const boardElm = document.getElementById("board");
     boardElm.appendChild(this.snowballElm);
     this.height = 10;
     this.width = 20;
     this.snowballElm.style.height = this.height + "vh";
     this.snowballElm.style.width = this.width + "vw";

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
      this.snowballElm.style.bottom = this.positionY + 'vh';
      
    }


}

const myPlayer = new Player();
const snowballsArr = [];
    
setInterval(function(){
   const mySnowball = new Snowball();
   snowballsArr.push(mySnowball);
}, 2000);


 setInterval(function(){
    snowballsArr.forEach((snow) =>{
      snow.moveDown();
      if (
        myPlayer.positionX < snow.positionX + snow.width &&
        myPlayer.positionX + myPlayer.width > snow.positionX &&
        myPlayer.positionY <snow.positionX + snow.height &&
        myPlayer.height + myPlayer.positionY > snow.positionY
      ) {
    
       //window.location.href = "./game-over-page.html"
       
      };
    });
 }, 16);
  

 


document.addEventListener("keydown", (e) =>{
    if(e.key === "ArrowLeft"){
        myPlayer.moveLeft();
    } else if(e.key === "ArrowRight"){
        myPlayer.moveRight();
    } 
});

