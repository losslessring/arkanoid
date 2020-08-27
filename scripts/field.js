export default class Field {
    constructor(rows = 10, cols = 10){
		this.rows = rows;
        this.cols = cols;
        this.cells = Array(rows * cols).fill({active: 0, x: null, y: null})
        this.cells_data = []

        this.drawLevel()
        //this.projectedFigure = this.cells
        
        // this.leftBoundary = this.createBoundary(0, (i, index, cols) => (i * cols) + index, cols, rows)
        // this.rightBoundary = this.createBoundary(cols - 1, (i, index, cols) => (i * cols) + index , cols, rows)
        // this.bottomBoundary = this.createBoundary(cols, (i, index, cols) => (rows * cols) - i - 1 , cols, cols).reverse()

	}

	//Сделаю изменение состояния в отдельном уровне абстракции
	set(property, value) {
		console.log(this[property], value)
		this[property] = value
	}
	get(property) {
		console.log(this[property])
		return this[property]
	}



	// Заполню просто треть поля
	drawLevel(){
		let field = []
		for(let y = 0; y < this.rows; y++) {
			for(let x = 0; x < this.cols; x++){
				
				if (y > this.rows / 3){
					field.push({active: 0, x: null, y: null})
				} else {
					field.push({active: 1, x: null, y: null})
				}

			}
		}
		this.set("cells", field)

	}

	getCoordsFromDisplay(cells){
		let coords = []
		for(let i = 0; i < cells.length; i++){
			let rect = cells[i].getBoundingClientRect()
			//coords.push({x:rect.x, y: rect.y})
			//Надо переписать, чтобы не менять состояние, придумать структуру данных	
			//this.cells[i].x = rect.x
			//this.cells[i].y = rect.y

			//const old = this.cells[i]
			//const update = { x: rect.x, y: rect.y }

			
			//Можно оператором развертки сделать					
			this.cells[i] = { ...this.cells[i], ...{ x: rect.x, y: rect.y }}
		}
	}


	//Граничная клетка это клетка с индексами по краям
	createBoundary(index, expression, cols, rows){
		let result = []
		for(let i = 0; i < rows; i++){
			result[i] = expression(i, index, cols)
		}
		return result

	}



	checkBoundary(position, boundary){
		//console.log(boundary)
		return boundary.some(boundaryIndex => boundaryIndex == position)
	}

	snapshot(array) {

		this.cells = array
		//console.log(this.cells)
	}
	checkCell(figure, scan_increment,value) {

	}



}

