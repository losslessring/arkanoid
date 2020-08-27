
const getRandomInt = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Сравнение координат объекта и массива объектов
const checkIntersection = (object, objects, interval) =>{
	
	for(let i = 0; i < objects.length; i++){
		//console.log(Math.abs(object.y - objects[i].y <= interval))
		if (Math.abs(object.x - objects[i].x) <= interval && 
			Math.abs(object.y - objects[i].y) <= interval){
			console.log(`Hit ball_x: ${parseInt(object.x)} ball_y: ${parseInt(object.y)}\nbrick_x: ${parseInt(objects[i].x)} brick_y: ${parseInt(objects[i].y)}`)
			//console.log(objects[i].active)
			return objects[i]
		}
	}
}

const getScreenCoords = (selector) =>{
		
		//let rect = document.querySelector(selector).getBoundingClientRect()
		return document.querySelector(selector).getBoundingClientRect()
		//return {x: rect.x, y: rect.y}
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
			getScreenCoords
		}