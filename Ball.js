const INITIAL_VELOCITY = .025
const VELOCITY_INCREASE = .000001

export default class Ball {
    constructor (ballElem){
        this.ballElem = ballElem
        this.reset()
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value)

    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value)

    }
    rect(){
        return this.ballElem.getBoundingClientRect()
    }

    reset(){
        this.x = 50
        this.y = 50
        this.direction = {x: 0}
        while (
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9 
        ){
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }

       this.velocity = INITIAL_VELOCITY

    }
    update(delta, paddleRects){
        //PaddleRect will make it bounce of paddle rectangles
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()
        /*If we've passed the bottom of our screen or the top of our screen*/
        if (rect.bottom >= window.innerHeight || rect.top <= 0){
            this.direction.y *= -1
        }

        // if the ball is outside of the boundaries
        //rect.right >= window.innerWidth || rect.left <= 0

        //This function loops through and check If paddle rectagles are in collision with the ball
        if (paddleRects.some( r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
      }
    }
    function randomNumberBetween(min, max){
        return Math.random() * (max - min) + min
    }
    

        /*If paddle rectagles are in collision with 
        the ball it is going to bounce off ball to 
        the opposite direction*/
    function isCollision(rect1, rect2) {
        return 
        (rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
        )

    }

