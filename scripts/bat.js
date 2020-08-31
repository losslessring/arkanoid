export default class Bat {

    constructor(x, y, rows, cols){
    	this.x = x
    	this.y = y
    	this.cols = cols
    	this.cells = Array(rows * cols).fill({	type: 'bat', 
    											x: null, 
    											y: null, 
    											difference_x: null, 
    											difference_y: null
    										})
	}

	calcDifference(){
		for(let i = 0; i < this.cells.length; i++){
			
			this.cells[i].difference_x = 	this.cells[i].x - this.x
			this.cells[i].difference_y = 	this.cells[i].y - this.y
		}
	}

	update(){
		for(let i = 0; i < this.cells.length; i++){

			this.cells[i].x = 	this.x + this.cells[i].difference_x
			this.cells[i].y = 	this.y + this.cells[i].difference_y
		}
	}

}