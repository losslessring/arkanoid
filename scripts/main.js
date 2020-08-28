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




const ball = new Ball((container_coords.right / 2)+5, container_coords.bottom - 180)
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

                //display_field.update(field.cells,'wall',"deepSkyBlue")
                display_field.update(field.cells,'active',"deepSkyBlue","white")

				let velocity = {x:1, y: -10}
				let timerId = setInterval(() => {																														
				        //console.log(ball.x, ball.y)		
                        ball.move(velocity)
                        let hit_cell = checkIntersection(ball, field.cells, 40)
                        //console.log(hit_cell)
                        let hit_bat = checkIntersection(ball, [bat], 40)
                        //console.log(bat)
                        if (hit_cell && hit_cell.active ){
                            
                                //hit_cell.active = 0
                            if (hit_cell.wall){
                                velocity = {x: -velocity.x, y:velocity.y}    
                            }
                            else {
                                velocity = {x: velocity.x, y:-velocity.y}
                            }
                            //velocity = {x: getRandomInt(0,10), y:getRandomInt(0,10) }   
                        }

                         if(hit_bat){
                             velocity = {x: getRandomInt(0,10), y:-velocity.y }   
                         }
                        
                        //console.log(checkPropertyInArray(ball, field.cells, "x", closeEnough, 0.5))
                        //checkIntersection(ball, field.cells)
						//display_field.update(field.cells,'active',"deepSkyBlue","white")

						display_bat.update(bat)
                        display_ball.update(ball)


						
					}, 50)

				
		}

mainCycle(5, cols, field.cells.length)


