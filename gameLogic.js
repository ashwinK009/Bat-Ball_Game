const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bat = {
    width:30,
    height: 2,
    x: (canvas.width -30) / 2,
    y: canvas.height - 20,
    dx: 10
};

const ball={
    radius:3,
    x: (canvas.width ) / 2,
    y: canvas.height - 22,
    dx:1,
    dy:-1.2
}

const newBall={
    radius:3,
    x: (canvas.width ) / 2,
    y: canvas.height - 22,
    dx:1,
    dy:-1.2
}

let score=0;

function drawBat() {
    ctx.beginPath();
    ctx.rect(bat.x, bat.y, bat.width, bat.height);
    ctx.fillStyle = "#8A2BE2";
    ctx.fill();
    ctx.closePath();
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fillStyle='#8A2BE2';
    ctx.fill();
    ctx.closePath();
}

function drawNewBall()
{
    ctx.beginPath();
    ctx.arc(newBall.x, newBall.y, newBall.radius, 0, 2*Math.PI);
    ctx.fillStyle='#8A2BE2';
    ctx.fill();
    ctx.closePath();
}

function drawWall()
{
    
    ctx.beginPath();

    //top wall partially overlapping with left & right
    ctx.rect(20 , 20, canvas.width-45 , 3);
    
    //left wall partially overlapping with top wall
    ctx.rect(20 , 20, 4.2 , canvas.height-38);

     //right wall partially overlapping with top wall
    ctx.rect(canvas.width-25 , 20, 4.2 , canvas.height-38.5);

    ctx.fillStyle = "#9370DB";
    ctx.fill();
    ctx.closePath();
}

function gameScore()
{
    ctx.font='10px Arial';
    ctx.fillText("Score : " +score,2,15);
}

function moveBat(event)
{
    //console.log(event);
    //console.log(canvas.offsetLeft);

    const rect = canvas.getBoundingClientRect();
    //let movemouseX= event.clientX - canvas.offsetLeft;

        bat.x=event.clientX - rect.left - bat.width/2;
        if(bat.x < 20)
        { // prevents the bat from going out of left wall
            bat.x=25;
        }
        else if (bat.x + bat.width > canvas.width - 25)
        { // prevents the bat from going out of right wall
            bat.x=canvas.width - bat.width - 25;
        }
}

var setSpeed=false; 

function moveBall()
{

    //making the ball move
    ball.x += ball.dx;
    ball.y += ball.dy;


    //console.log(ball.y + ball.radius);
    //console.log(canvas.width);

    //Ball collisions with left & right walls
    if(ball.x + ball.radius > canvas.width -25 || ball.x - ball.radius < 25)
    {
        ball.dx = -ball.dx;
    }

    //Ball collision with top wall
    else if(ball.y - ball.radius < 23)
    {
        ball.dy = -ball.dy;
        if(ball.dy === 0)
            ball.dy=-2;
    }


    //Ball collision with bat considering from both X & Y axis
    else if(ball.y + ball.radius > bat.y && ball.x > bat.x && ball.x < bat.x + bat.width)
    {
        ball.dy = -ball.dy;
        ball.y = bat.y - ball.radius;
        score++;

    //Increasing the speed of the ball after crossing the score of 4 
         if (!setSpeed && score > 4) {
             
            bat.width += 10;
            ball.dx = 1.5;
            ball.dy = -1.5;
            setSpeed = true;
    
         }

        
    }
        //Game over , ball reset as well as score
    else if(ball.y + ball.radius > canvas.height-10)
    {
        reset();
    }
    
}

function moveNewBall()
{

    //making the ball move
    newBall.x +=newBall.dx;
    newBall.y +=newBall.dy;

    //Ball collisions with left & right walls
    if(newBall.x + newBall.radius > canvas.width -25 || newBall.x - newBall.radius < 25)
    {
        newBall.dx = -newBall.dx;
    }

    //Ball collision with top wall
    else if(newBall.y - newBall.radius < 23)
    {
        newBall.dy = -newBall.dy;
        if(newBall.dy === 0)
            newBall.dy=-2;
    }


    //Ball collision with bat considering from both X & Y axis
    else if(newBall.y + newBall.radius > bat.y && newBall.x > bat.x && newBall.x < bat.x + bat.width)
    {
        newBall.dy = -newBall.dy;
        newBall.y = newBall.y - newBall.radius;
        score++;

    //Setting the speed of the new ball 
         if (!setSpeed) {
             
            newBall.dx = 1.5;
            newBall.dy = -1.5;
            setSpeed = true;
    
         }

        
    }
        //Game over , ball reset as well as score
    else if(newBall.y + newBall.radius > canvas.height-10)
    {
        reset2();
    }
    
}



function reset()
{

        ball.x = (canvas.width ) / 2;
        ball.y =  canvas.height - 22;
        ball.dx = 1;
        ball.dy = -1.2; 
        bat.x = (canvas.width -30) / 2;
        bat.y = canvas.height - 20;
        alert("Game over. You scored : " + score + " . Click Ok to restart game" , location.reload());
        score = 0;
}

function reset2()
{

    newBall.x = (canvas.width ) / 2;
    newBall.y =  canvas.height - 22;
    newBall.dx = 1;
    newBall.dy = -1.2; 
    bat.x = (canvas.width -30) / 2;
    bat.y = canvas.height - 20;
    alert("Game over. You scored : " + score + " . Click Ok to restart game" , location.reload());
    score = 0;
}


function loadGame()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBat();
    drawBall();
    drawWall();
    gameScore();
    moveBall();
    if(score>9)
        {
           drawNewBall();
           moveNewBall();
        }
}

let gamePause=false;
let gameOn= false;
let gameInterval;

function start()
{
    
    if(!gameInterval)
    {
        gameInterval=setInterval(loadGame,1000/60);
        gamePause = false;
        gameOn = true;
    }
    
}

function stop()
{
    clearInterval(gameInterval);
    gameInterval=null;
    gamePause=false;
    gameOn = false;
    alert("Are you sure you want to exit?")
    reset();
}


function pause()
{
    if(!gamePause)
    {
        clearInterval(gameInterval);
        gameInterval=null;
        gamePause=true;
    }
}

function resume()
{
    console.log(gamePause);
    console.log(gameOn);
    if(gamePause && gameOn)
    {
        gameInterval = setInterval(loadGame,1000/60);
        gamePause=false;
    }
}

canvas.addEventListener("mousemove", moveBat)
canvas.addEventListener("mouseleave",pause);
canvas.addEventListener("mouseenter",resume);

loadGame();