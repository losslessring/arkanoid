
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

		if (Math.abs(object.x - objects[i].x) <= interval && 
			Math.abs(object.y - objects[i].y) <= interval){

			return objects[i]			
		}
	}
	return null
}

const checkAccurateIntersection = (object, objects) =>{
	

	for(let i = 0; i < objects.length; i++){
	
	if(object.top < objects[i].bottom &&
		    object.bottom > objects[i].top &&
		   object.left < objects[i].right &&
		   object.right > objects[i].left){
			
			if(objects[i].type !== 'empty'){
				console.log(objects[i])	
			}
			return objects[i]			

		}
	}
	return null
}

const getScreenCoords = (selector) =>{
		
		
		return document.querySelector(selector).getBoundingClientRect()
		
	}

const transferCoordsFromDisplay = (object, property, dom_elements) =>{
		let coords = []
		for(let i = 0; i < dom_elements.length; i++){
			let rect = dom_elements[i].getBoundingClientRect()


			object[property][i] = { ...object[property][i], ...{ x: rect.x,
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

const getDomProperty = (dom_elements, method) =>{
		let result = []
		for(let i = 0; i < dom_elements.length; i++){

			result.push(dom_elements[i][method]())

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
			getDomProperty,
			checkAccurateIntersection
		}