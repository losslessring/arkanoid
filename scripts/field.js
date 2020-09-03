export default class Field {
    constructor(rows = 10, cols = 10){
		this.rows = rows;
        this.cols = cols;
        this.cells = Array(rows * cols).fill({type: null, x: null, y: null})
        this.cells_data = []

        this.drawLevel()
        //this.projectedFigure = this.cells
        
        this.left_wall = this.createBoundary(0, (i, index, cols) => (i * cols) + index, cols, rows)
        this.right_wall = this.createBoundary(cols - 1, (i, index, cols) => (i * cols) + index , cols, rows)
        this.floor = this.createBoundary(cols, (i, index, cols) => (rows * cols) - i - 1 , cols, cols).reverse()
        this.roof = this.createBoundary(cols, (i, index, cols) => (1 * cols) - i - 1 , cols, cols).reverse()
        //console.log(this.roof)
         this.setCellsProperty('type','wall', this.left_wall)
        // this.setCellsProperty('active', 1, this.left_wall)
         this.setCellsProperty('type','wall', this.right_wall)
        // this.setCellsProperty('active', 1, this.right_wall)
         this.setCellsProperty('type', 'floor', this.floor)
         this.setCellsProperty('type', 'floor', this.roof)

        // this.setCellsProperty('active', 1, this.floor)
        //console.log(this.cells)
	}

	setCellsProperty(property, value, array){
		for(let cell = 0; cell < this.cells.length; cell++ ){
			for(let i = 0; i < array.length; i++){
				if(cell === array[i]){
					//console.log(this.cells[cell])
					this.cells[cell][property] = value
				}
			}
		}
		
		
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
					field.push({type: 'empty', x: null, y: null})
				} else {
					field.push({type: 'brick', x: null, y: null})
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
			//this.cells[i] = { ...this.cells[i], ...{ x: rect.x, y: rect.y }}
			this.cells[i] = { ...this.cells[i], ...{ x: rect.x,
													 y: rect.y,
													 top: rect.top,
													 bottom: rect.bottom,
													 left: rect.left,
													 right: rect.right,
													 height: rect.height,
													 width: rect.width
													  } }
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

