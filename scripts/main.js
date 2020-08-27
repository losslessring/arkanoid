import Field from './field.js'

import DisplayField from './DisplayField.js'
import Display from './Display.js'
import Bat from './Bat.js'
import Ball from './ball.js'

import {
            getRandomInt,
            checkIntersection,
            checkPropertyInArray,
            closeEnough,
            getScreenCoords
        } from './utility.js'





const rows = 15
const cols = 20

let field = new Field(rows, cols)
console.log(field)


let display_field = new DisplayField(document.getElementById("container"), 
	field.rows, field.cols, field.cells, 0)


//Получить координаты контейнера для начальной установки биты и шара
const container_coords = getScreenCoords('#container')

let bat = new Bat(container_coords.right / 2, container_coords.bottom - 40)
console.log(bat)

let display_bat = new Display('#bat', bat)




const ball = new Ball(container_coords.right / 2, container_coords.bottom - 40)
const display_ball = new Display('#ball', ball)

//console.log(getScreenCoords('#container'))




const mainCycle = (position, increment, boundary) => {
	document.onkeydown = function(e){
        
        //if (e.repeat) { return }
        
        switch(e.keyCode){

        	case 32:                
                console.log('space')
                clearInterval(timerId)
                break
            case 37:

                console.log('left')
                bat.x -=20
                break
            case 38:
                
                break
            case 39:

            	console.log('right')
                bat.x +=20
                break
            case 40:
   
                console.log('down')
                
                break
        }
    }           
                //Взять координаты кирпичей на экране и передать их в Поле
                let bricks = document.querySelectorAll('.cell')
                field.getCoordsFromDisplay(bricks)
                
                //console.log(getScreenCoords(bat,'#bat'))
                // let brick_rects = []
                // for(let brick of bricks){
                //     let rect = brick.getBoundingClientRect() 
                //     //console.log(`top: ${rect.top}, right: ${rect.right}, bottom: ${rect.bottom}, left: ${rect.left}`)
                //     brick_rects.push(rect)

                // }
                // console.log(bricks)
                //checkIntersection(ball, brick_rects, 100)
				
				let timerId = setInterval(() => {																														
				        //console.log(ball.x, ball.y)		
                        ball.move({x:1, y: -3})
                        checkIntersection(ball, field.cells, 5)
                        //console.log(checkPropertyInArray(ball, field.cells, "x", closeEnough, 0.5))
                        //checkIntersection(ball, field.cells)
						display_field.update(field.cells,'active')
						display_bat.update(bat)
                        display_ball.update(ball)


						
					}, 50)

				
		}

mainCycle(5, cols, field.cells.length)


