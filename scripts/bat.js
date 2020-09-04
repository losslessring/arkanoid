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
    	// Назначение отражения на поля биты
    	this.setDeflect('deflect_x',-2, 2)

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

		// for(let i = 0; i < this.cells.length; i++){
		// 		//console.log(deflect_values[i])		
		// 		this.cells[i][property] = deflect_values[i]
		// 		//console.log(this.cells[i])		
		// 	}
		this.cells[0][property] = -3
		this.cells[1][property] = -1
		this.cells[2][property] = 0
		this.cells[3][property] =  1
		this.cells[4][property] =  3
		}	
	

	fillRange(start, end){
		let result = []
		for(let i = start - 1; i < end; i++){
			 result.push(i + 1)
		}
		return result
	}



	update(){
		for(let i = 0; i < this.cells.length; i++){

			this.cells[i].x = 	this.x + this.cells[i].difference_x



			this.setDeflect('deflect_x',-2, 2)
		}
	}

}