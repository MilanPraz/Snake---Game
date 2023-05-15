let playground=document.getElementById('playground');
let ctx=playground.getContext('2d');


var row=15;
var column=15;;
var blocksize=25;

playground.height=row*blocksize;
playground.width=column*blocksize;


//snake 
var snakeX=3*blocksize;
var snakeY=3*blocksize;

//fruit
var fruitX=6*blocksize;
var fruitY=2*blocksize;


//movement of snake
var moveX=0;
var moveY=0;

//setInterval variable
let myInterval;
//window onload to load everything

//snake body array

var snakebody=[]

//score
var score=0;
var highscore=localStorage.getItem("hscore");

var myscore=document.querySelector(".score")
var myhighscore=document.querySelector(".highscore");

myhighscore.innerHTML=`HighSocre:${highscore}`;


// gameover display
var gameoverdisplay= document.querySelector(".gameover");
var btn=document.querySelector(".btn");

// game state
var gamestate="live";
/////////////////////////////////////////////////////////////

window.onload=function(){
    foodrandom();

   myInterval =setInterval(drawgame,270)

   document.addEventListener("keydown",movement)


}

function drawgame(){

    ctx.fillStyle="#222";
    ctx.fillRect(0,0,playground.height,playground.width);


        if(gamestate==="live"){

    //draw the food

    ctx.fillStyle="orange"
    ctx.fillRect(fruitX,fruitY,blocksize,blocksize);

    if(snakeX===fruitX && snakeY===fruitY){
        snakebody.push([fruitX,fruitY]);
        foodrandom();
        score+=1;

        highscore=score>=highscore?score:highscore;
        localStorage.setItem("hscore",highscore)
        myscore.innerText=`Score:${score}`;
        myhighscore.innerHTML=`HighSocre:${highscore}`;

        var eatsound=new Audio("eat.mp3");
        eatsound.play();

     }

     
     
     //connecting snake body
     for(let i=snakebody.length-1;i>0;i--){
        snakebody[i]=snakebody[i-1];
     }

     if(snakebody.length!=0){
        snakebody[0]=[snakeX,snakeY];
     }


     //draw the snake
     ctx.fillStyle="red";
     snakeX+=moveX*blocksize;
     snakeY+=moveY*blocksize;
     ctx.fillRect(snakeX,snakeY,blocksize,blocksize);

     
     
     // coloring snake body
     for(let i=0;i<snakebody.length;i++){
        ctx.fillStyle='green';
        ctx.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize)
     }



    }

     //collide condition
     if(snakeX<0 || snakeX>column*blocksize || snakeY<0 ||snakeY>row*blocksize){
        gamestate="gameover"
        gameoverdisplay.style.visibility="visible";
        btn.addEventListener("click",restartgame);
        
            //gameover sound
            let wallhit=new Audio("over.mp3")
            wallhit.play()
            clearInterval(myInterval);

        ctx.fillStyle="#222";
        ctx.fillRect(0,0,playground.height,playground.width);
     }

     for(let i=0;i<snakebody.length;i++){
        if(snakeX===snakebody[i][0] && snakeY===snakebody[i][1]){
            gamestate="gameover"
            gameoverdisplay.style.visibility="visible";
            btn.addEventListener("click",restartgame);

            //gameover sound
            let wallhit=new Audio("over.mp3")
            wallhit.play()
            clearInterval(myInterval);

            ctx.fillStyle="#222";
            ctx.fillRect(0,0,playground.height,playground.width);
            
        }
     }

}



//render score
// function renderscore(){
//     score+=1;
//     myscore.innerHTML=`Score: ${score}`;
// }

//snake movement
function movement(e){
    if(e.code==="ArrowUp" && moveY!=1){
        moveX=0;
        moveY=-1;
    }
    else if(e.code==="ArrowDown" && moveY!=-1){
        moveX=0;
        moveY=1;
    }
    else if(e.code==="ArrowLeft" && moveX!=1){
        moveX=-1;
        moveY=0;
    }
    else if(e.code==="ArrowRight" && moveX!=-1){
        moveX=1;
        moveY=0;
    }
    var move=new Audio("move.mp3")
    move.play();
}

// random fruit generate

function foodrandom(){
    fruitX=Math.floor(Math.random()*row)*blocksize;
    fruitY=Math.floor(Math.random()*column)*blocksize;

}

//restart btn
function restartgame(){
    location.reload();
}