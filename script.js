import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
function update(time){
    if (lastTime != null){
    const delta = time - lastTime
    ball.update(delta)

    // Computer paddle will be updated with the ball
    computerPaddle.update(delta, ball.y)

/* if we've lost the game reset function will always reset the paddle to the center of the screen
and handle lose will reset it after we lose the game*/
    if (isLose()) { handleLose()

    }
    
}
    lastTime = time
    window.requestAnimationFrame(update)
}
// if our ball is outside of the boundaries then we've lost
function isLose(){
    const rect = ball.rect() 
    return rect.right >= window.innerWidth || rect.left <= 0 
    }
/* handle lose will reset the game after we lose the game*/
function handleLose(){
    //Increment the score
    const rect = ball.rect()
    /* if the ball went off the right side of the scren 
    or hit to the right wall of the screen; player has scored*/
    if (rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1

    }

/* handle lose will reset the ball and paddle in the middle after we lose the game*/
    ball.reset()
    computerPaddle.reset()
}

    

    

// Event listener will move the left paddle with the mouse move.
document.addEventListener("mousemove", e =>{
    playerPaddle.position = (e.y / window.innerHeight) * 100
} )

window.requestAnimationFrame(update)