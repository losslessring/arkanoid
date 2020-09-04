export default class Field {
    constructor(rows = 10, cols = 10){
		this.rows = rows;
        this.cols = cols;
        this.cells = Array(rows * cols).fill({type: null, x: null, y: null})
        this.cells_data = []

        this.drawLevel()
        
        //Генерирую по краям стены и пол с потолком - пересчитываю номера массива
        this.left_wall = this.createBoundary(0, (i, index, cols) => (i * cols) + index, cols, rows)
        this.right_wall = this.createBoundary(cols - 1, (i, index, cols) => (i * cols) + index , cols, rows)
        this.floor = this.createBoundary(cols, (i, index, cols) => (rows * cols) - i - 1 , cols, cols).reverse()
        this.roof = this.createBoundary(cols, (i, index, cols) => (1 * cols) - i - 1 , cols, cols).reverse()
        
        //Задаю атрибуты
        this.setCellsProperty('type','wall', this.left_wall)
        
        this.setCellsProperty('type','wall', this.right_wall)
        
        this.setCellsProperty('type', 'floor', this.floor)
        this.setCellsProperty('type', 'floor', this.roof)

        
	}

	setCellsProperty(property, value, array){
		for(let cell = 0; cell < this.cells.length; cell++ ){
			for(let i = 0; i < array.length; i++){
				if(cell === array[i]){
					
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
		
		return boundary.some(boundaryIndex => boundaryIndex == position)
	}

	snapshot(array) {

		this.cells = array
		
	}
	checkCell(figure, scan_increment,value) {

	}



}

