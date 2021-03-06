const SPEED = 0.02

export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem
        
// If we've lost the game reset function will always reset the paddle to the center of the screen
        this.reset() 
    }

get position(){
    return parseFloat(
        getComputedStyle(this.paddleElem).getPropertyValue("--position")
        )
     }

set position(value){
    this.paddleElem.style.setProperty("--position", value)
}

// Bounce the ball off the paddles
rect(){
    return this.paddleElem.getBoundingClientRect()
}
// reset to the middle of the screen
reset (){
    this.position = 50
}
// To update the computer paddle position with the ball
update(delta, ballHeight){
    this.position += SPEED * delta * (ballHeight - this.position)

}

}