
const getRandomInt = (min, max) =>{
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//Сравнение координат объекта и массива объектов
//Поскольку он перебирает массив сначала до конца, он находит быстрее
//клетки с меньшими индексами, ближайшие к левому верхнему углу.
const checkIntersection = (object, objects, interval) =>{
	//let result = []
	for(let i = 0; i < objects.length; i++){
		//console.log(Math.abs(object.y - objects[i].y <= interval))
		if (Math.abs(object.x - objects[i].x) <= interval && 
			Math.abs(object.y - objects[i].y) <= interval){
			//console.log(`x: ${Math.abs(object.x - objects[i].x)}`)
			//console.log(`y: ${Math.abs(object.y - objects[i].y)}`)
			//console.log(`Hit ball_x: ${parseInt(object.x)} ball_y: ${parseInt(object.y)}\nbrick_x: ${parseInt(objects[i].x)} brick_y: ${parseInt(objects[i].y)}`)
			//console.log(objects[i])
			return objects[i]			
		}
	}
	return null
}

const checkAccurateIntersection = () =>{}

const getScreenCoords = (selector) =>{
		
		//let rect = document.querySelector(selector).getBoundingClientRect()
		return document.querySelector(selector).getBoundingClientRect()
		//return {x: rect.x, y: rect.y}
	}

const transferCoordsFromDisplay = (object, property, dom_elements) =>{
		let coords = []
		for(let i = 0; i < dom_elements.length; i++){
			let rect = dom_elements[i].getBoundingClientRect()
			//coords.push({x:rect.x, y: rect.y})
			//Надо переписать, чтобы не менять состояние, придумать структуру данных	
			//this.cells[i].x = rect.x
			//this.cells[i].y = rect.y

			//const old = this.cells[i]
			//const update = { x: rect.x, y: rect.y }

			
			//Можно оператором развертки сделать					
			object[property][i] = { ...object[property][i], 
				...{ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2}}
		}
	}

const getDomProperty = (dom_elements, method) =>{
		let result = []
		for(let i = 0; i < dom_elements.length; i++){
			//let element_property = dom_elements[i][method]()
			//console.log(method)
			//console.log(dom_elements[i][])
			result.push(dom_elements[i][method]())
			//coords.push({x:rect.x, y: rect.y})
			//Надо переписать, чтобы не менять состояние, придумать структуру данных	
			//this.cells[i].x = rect.x
			//this.cells[i].y = rect.y

			//const old = this.cells[i]
			//const update = { x: rect.x, y: rect.y }

			
			//Можно оператором развертки сделать					
			// object[dest_property][i] = { ...object[dest_property][i],
			// ...{ [source_property]: element_property[source_property],
			// 	 [source_property]: element_property[source_property] 
			//    }
			// }

		}
		return result
	}

const checkPropertyInArray = (object, objects, property, operation, interval) =>{
	let result = []
	for(let i = 0; i < objects.length; i++){
		
		if(operation(object[property], objects[i][property], interval)){
		
			result.push(objects[i][property])
		}
	}
	
	if (result.length > 0){
		return result
	} else {
		return null
	}
}

const closeEnough = (a, b, interval) => {
	
	if (Math.abs(a - b) <= interval){		
		return true
	} else {
		return false
	}
}




export {
			getRandomInt, 
			checkIntersection,
			checkPropertyInArray,
			closeEnough,
			getScreenCoords,
			transferCoordsFromDisplay,
			getDomProperty
		}