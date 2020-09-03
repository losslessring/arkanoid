export default class Bat {

    constructor(x, y, rows, cols){
    	this.x = x
    	this.y = y
    	this.cols = cols
    	this.cells = Array(rows * cols).fill({	type: 'bat', 
    											x: null, 
    											y: null, 
    											difference_x: null, 
    											difference_y: null,
    											deflect_x: null
    										})
    	//console.log(this.cells)
    	//console.log(this.cells,...this.fillRange(-2,2))
    	this.setDeflect('deflect_x',-2, 2)
    	//console.log(this.cells)
	}

	calcDifference(){
		for(let i = 0; i < this.cells.length; i++){
			
			this.cells[i].difference_x = 	this.cells[i].x - this.x
			this.cells[i].difference_y = 	this.cells[i].y - this.y
		}
	}

	//Установить значение отражения. Глючит, сбивается в последнее значение,
	// приходится апдейтить
	setDeflect(property, start, end){

		let deflect_values = this.fillRange(start, end)
		//let deflect_values = [-2,-1,0,1,2]

		for(let i = 0; i < this.cells.length; i++){
				//console.log(deflect_values[i])		
				this.cells[i][property] = deflect_values[i]
				//console.log(this.cells[i])		
			}
		// this.cells[0][property] = -2
		// this.cells[1][property] = -1
		// this.cells[2][property] = -0
		// this.cells[3][property] = -1
		// this.cells[4][property] = -2
		}	
	

	fillRange(start, end){
		let result = []
		for(let i = start - 1; i < end; i++){
			 result.push(i + 1)
		}
		return result
	}

	// fillRange(start, end)  {
 //  		return Array(end - start + 1).fill().map((item, index) => start + index);
	// }

	// fillRange(start, end){
	// 	this.cells.velocity_x_mult: null
	// }

	update(){
		for(let i = 0; i < this.cells.length; i++){

			this.cells[i].x = 	this.x + this.cells[i].difference_x
			//this.cells[i].y = 	this.y + this.cells[i].difference_y
			this.setDeflect('deflect_x',-2, 2)
		}
	}

}