const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");

let  currentPlayer;
let gameGrib;
const winnerPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
//llet's crate a funtion to intitilise the game
function initeGame(){
    currentPlayer="x";
    gameGrib=["","","","","","","","","",""];

    boxes.forEach((box,index)=>{
      box.innerHTML="";
      boxes[index].style.pointerEvents="all";
      // color remove
      box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML=`current Player -${currentPlayer}`;
}
initeGame();
function swapTurn(){
    if(currentPlayer==="x"){
        currentPlayer="o";
    }
    else{
        currentPlayer="x";
    }
    gameInfo.innerHTML=`current palyer-${currentPlayer}`;
}
function checkGameOver(){
    //  newGameBtn.classList.add("active"); 
    let answer="";
    winnerPosition.forEach((position)=>{
        if((gameGrib[position[0]]!==""||gameGrib[position[1]]!==""||gameGrib[position[2]]!=="")
        &&(gameGrib[position[0]]===gameGrib[position[1]])&&(gameGrib[position[1]]===gameGrib[position[2]])){
            //check winner is x
            if(gameGrib[position[0]]==="x")
            answer="x";
            else
            answer-"o";
            //disable pointer
            boxes.forEach((box)=>{
                box.style.pointerEvents="none"; 
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            newGameBtn.classList.add("active")
        }
    });
   if(answer!==""){
    gameInfo.innerHTML=`winner player-${answer}`;
    newGameBtn.classList.add("active") ; 
    return;
   }
   //when there is no winner
   let fillCount=0;
   gameGrib.forEach((box)=>{
    if(box!=="")
    fillCount++;
   });
   if(fillCount===9){
    gameInfo.innerHTML="Game Tied";
    newGameBtn.classList.add("active");
   }
}
function handleClick(index){
    if(gameGrib[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrib[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();

    }
}
boxes.forEach((box,index)=>{
  box.addEventListener("click",()=>{
    handleClick(index);
  })
});
newGameBtn.addEventListener('click',initeGame);
 