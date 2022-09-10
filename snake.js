let grid=document.getElementById("gamearea");

//         var node = document.createElement("div");
//         node.innerHTML="vikas";
//         node.style.gridRowStart=6;
//         node.style.gridColumnStart=4;
//          node.classList.add('sbody');
//         grid.appendChild(node);
    
const background= new Audio('background.mp3');
const eat_music= new Audio('eat_food.mp3');
const gameover_music= new Audio('gameover.mp3');

var snake=[{x:10,y:12}];
var food={x:14,y:6};
    food.x=Math.round(2+16*Math.random());
    food.y=Math.round(2+16*Math.random());
var snakedir={x:0,y:0};
var ptime=0;
var speed=4;
var score=0;
localStorage.setItem('highScore',0);
function main(ctime){
    window.requestAnimationFrame(main);
 
    if((ctime-ptime)/1000<1/speed)
    return;
    ptime=ctime;
    gameEngine();
}
function isColide(){
    if(snake[0].x<0|| snake[0].x>=19|| snake[0].y<0|| snake[0].y>=19)
    return true;
    for(let i=1;i<snake.length;i++){
        if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y ) 
        return true;
    }
    return false;
}
function gamover(){
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
    snake[0].x=(snake[0].x+snakedir.x)%20;
    snake[0].y=(snake[0].y+snakedir.y)%20;
  
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
window.addEventListener('keydown',e=>{
    background.play();
    speed=4;
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
