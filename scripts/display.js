export default class Display {
	constructor (element, data) {

		this.element = document.querySelector(element)
		//this.x = data.x
		//this.y = data.y
		console.log(this.element)
		//let rect = this.element.getBoundingClientRect()
		//console.log(`top: ${rect.top}, right: ${rect.right}, bottom: ${rect.bottom}, left: ${rect.left}`)
		
      	this.element.style.left = data.x
      	this.element.style.top = data.y



	}
	update(data){

		//this.element.style.bottom = data.y + "px";
		//console.log(data.x, data.y) 
      	this.element.style.left = data.x 
      	this.element.style.top = data.y
	}

}