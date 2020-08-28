export default class Control {
    constructor(move_speed, timerId){
		this.left = false 
		this.right = false
		this.stop = false
		this.move_speed = move_speed

		////// Arrow keys //////
	    document.onkeydown = (e) =>{
	        if(e.keyCode == 37) this.left = true
	        if(e.keyCode == 39) this.right = true
	        if(e.keyCode == 32) {
	            clearInterval(timerId)
	        }
	    }

	    document.onkeyup = (e) =>{
	        if(e.keyCode == 37) this.left = false
	        if(e.keyCode == 39) this.right = false
	    }
	}

	move(object) {
    
    if(this.left) { 
        object.x -= this.move_speed
    }
    if(this.right) {
        object.x += this.move_speed
    }
    
}


}