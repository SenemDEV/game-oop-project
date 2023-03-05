


class Player {
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.playerElm = document.getElementById("player")
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
}, 3000);


 setInterval(function(){
  // mySnowball.moveDown();
 }, 1000);
  

 


document.addEventListener("keydown", (e) =>{
    if(e.key === "ArrowLeft"){
        myPlayer.moveLeft();
    } else if(e.key === "ArrowRight"){
        myPlayer.moveRight();
    } 
});

