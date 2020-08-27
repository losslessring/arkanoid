export default class Ball {

    constructor(x, y){
    	this.x = x
    	this.y = y
    	this.velocity = {x:0, y: 0}
	}
	move(velocity){
		this.x += velocity.x
		this.y += velocity.y
	}

}