

   const background= new Audio('background.mp3');
   const eat_music= new Audio('eat_food.mp3');
   const gameover_music= new Audio('gameover.mp3');


  document.getElementById('clr1').style=`background-color:#CE5ABE;`;
  document.getElementById('clr2').style=`background-color:#0A0832;`;
  document.getElementById('clr3').style=`background-color:#1eae81;`;
  document.getElementById('clr4').style=`background-color:#BA58DA;`;
 const fun=(ele)=>{
    background.play();
    speed=count;
    if(ele===2){
        snakedir.x=-1;
        snakedir.y=0;
    }
    else if(ele===8){
        snakedir.x=1;
        snakedir.y=0;
    }
    else if(ele===4){
        snakedir.x=0;
         snakedir.y=-1;
    }
    else if(ele===6){
        snakedir.x=0;
        snakedir.y=1;
    }
    else{
        speed=0;
    }
}
const changecolor=(ele)=>{
    console.log("vikas");
    let clr="pink";
    document.getElementById('clr1').style=`background-color:#CE5ABE;`;
    document.getElementById('clr2').style=`background-color:#0A0832;`;
    document.getElementById('clr3').style=`background-color:#1eae81;`;
    document.getElementById('clr4').style=`background-color:#BA58DA;`;
        if(ele===1){
            clr="#CE5ABE";
            document.getElementById('clr1').style=`background-color:rgb(8, 180, 8);box-shadow:1px 1px 2px white,-1px -1px 2px white,-1px 1px 2px white,1px -1px 2px white,
            2px 2px 3px white,-2px 2px 3px white,2px -2px 3px white,-2px -2px 3px white;`;
        }
        else if(ele===2){
            clr="#0A0832";
            document.getElementById('clr2').style=`background-color:rgb(8, 180, 8);box-shadow:1px 1px 2px white,-1px -1px 2px white,-1px 1px 2px white,1px -1px 2px white,
            2px 2px 3px white,-2px 2px 3px white,2px -2px 3px white,-2px -2px 3px white;`;
        }
        else if(ele===3){
                clr="#1eae81";
                document.getElementById('clr3').style=`background-color:rgb(8, 180, 8);box-shadow:1px 1px 2px white,-1px -1px 2px white,-1px 1px 2px white,1px -1px 2px white,
            2px 2px 3px white,-2px 2px 3px white,2px -2px 3px white,-2px -2px 3px white;`;
        }
        else{
             clr="#BA58DA";
             document.getElementById('clr4').style=`background-color:rgb(8, 180, 8);box-shadow:1px 1px 2px white,-1px -1px 2px white,-1px 1px 2px white,1px -1px 2px white,
            2px 2px 3px white,-2px 2px 3px white,2px -2px 3px white,-2px -2px 3px white;`;
        }
        document.getElementById("BODY").style.background=`${clr}`;
}

let grid=document.getElementById("gamearea");

//         var node = document.createElement("div");
//         node.innerHTML="vikas";
//         node.style.gridRowStart=6;
//         node.style.gridColumnStart=4;
//          node.classList.add('sbody');
//         grid.appendChild(node);
    
// newchanges  
var snake=[{x:10,y:12}];
var food={x:14,y:6};
    food.x=Math.round(2+16*Math.random());
    food.y=Math.round(2+16*Math.random());
var snakedir={x:0,y:0};
var ptime=0;
var count=4;
var speed=count;
var score=0;
localStorage.setItem('highScore',0);
setInterval(() => {
    count++;
}, 10000);
function main(ctime){
    window.requestAnimationFrame(main);
 
    if((ctime-ptime)/1000<1/speed)
    return;
    ptime=ctime;
    gameEngine();
}
function isColide(){
    if(snake[0].x<=0|| snake[0].x>20|| snake[0].y<=0|| snake[0].y>20)
    return true;
    for(let i=1;i<snake.length;i++){
        if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y ) 
        return true;
    }
    return false;
}
function gamover(){
    count=4;
    speed=0;
    document.getElementById('gameover').style.display='block';
    setTimeout(() => {
        document.getElementById('gameover').style.display='none';
    }, 1500);
    
}

function gameEngine(){
    grid.innerHTML="";
    document.getElementById('curr').innerHTML=`current score :${score}`;
    hs=localStorage.getItem('highScore');
    hs=Math.max(hs,score);
    document.getElementById('highest').innerHTML=`highest score :${hs}`;
    localStorage.setItem('highScore',hs);
    if(isColide()){
        gameover_music.play();
        score=0;
        snake=[{x:10,y:12}];
        food={x:14,y:6};
        ptime=0;
        background.pause();
        gamover();
        
    }
    if(snake[0].x==food.x&&snake[0].y==food.y){
        eat_music.play();
        score++;
        x1=snakedir.x+food.x;
        y1=snakedir.y+food.y;
        snake.unshift({x:x1,y:y1});
        food.x=Math.round(2+16*Math.random());
        food.y=Math.round(2+16*Math.random());
        
    
    }
    for(let i=snake.length-1;i>0;i--){
        snake[i].x=snake[i-1].x;
        snake[i].y=snake[i-1].y;
    }
    snake[0].x=(snake[0].x+snakedir.x);
    snake[0].y=(snake[0].y+snakedir.y);
  
    var node1 = document.createElement("div");
    node1.style.gridRowStart=food.x;
    node1.style.gridColumnStart=food.y;
    node1.classList.add('food');
    grid.appendChild(node1);
    
    snake.forEach((e,i)=>{
        
        var node = document.createElement("div");
        node.style.gridRowStart=e.x;
        node.style.gridColumnStart=e.y;
        if(i==0)
        {
            node.classList.add('head');
        }
        else
         node.classList.add('sbody');
        grid.appendChild(node);
    });

}
// document.getElementById('top').addEventListener('onclick',()=>{ snakedir.x=-1;
    // snakedir.y=0;})
    // console.log(document.getElementsByClassName("bottun"));
   
    const startGame=()=>{
        document.getElementsByClassName('welcome')[0].style.display="none";
        document.getElementById('BODY').style.display="flex";
        const name=document.getElementById('name').value;
        if(name)
        document.getElementById('yourname').innerText=name;
        if(document.getElementById('easy').checked == true)  
            count=4;   
        else if(document.getElementById('mediam').checked == true)   
                count=6;   
        else if(document.getElementById('hard').checked == true)  
                    count=8;    
window.addEventListener('keydown',e=>{
    background.play();
    speed=count;
    switch (e.code) {
        case 'ArrowUp':
            snakedir.x=-1;
            snakedir.y=0;
            break;
        case 'ArrowDown':
             snakedir.x=1;
             snakedir.y=0;
            break;
            case 'ArrowLeft':
                snakedir.x=0;
                 snakedir.y=-1;
            break;
            case 'ArrowRight':
                snakedir.x=0;
                 snakedir.y=1;
            break;
    
        default:
            break;
    }
});

window.requestAnimationFrame(main);
 }
