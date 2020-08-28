import Field from './field.js'

import DisplayField from './DisplayField.js'
import Display from './Display.js'
import Bat from './Bat.js'
import Ball from './ball.js'
import Control from './control.js'

import {
            getRandomInt,
            checkIntersection,
            checkPropertyInArray,
            closeEnough,
            getScreenCoords,
            transferCoordsFromDisplay
        } from './utility.js'





const rows = 15
const cols = 20

let field = new Field(rows, cols)
console.log(field)


let display_field = new DisplayField(document.getElementById("container"), 
	field.rows, field.cols, 'cell')


//Получить координаты контейнера для начальной установки биты и шара
const container_coords = getScreenCoords('#container')

let bat = new Bat(container_coords.right / 2, container_coords.bottom - 60, 1, 5)
console.log(bat)

let bat_inside = new DisplayField(document.getElementById("bat"), 
    bat.cols, 1, 'bat-inside')

let display_bat = new Display('#bat', bat)




const ball = new Ball((container_coords.right / 2)+5, container_coords.bottom - 180)
const display_ball = new Display('#ball', ball)

//console.log(getScreenCoords('#container'))





const mainCycle = (position, increment, boundary) => {



     

                  
                //Взять координаты кирпичей на экране и передать их в Поле
                let bricks = document.querySelectorAll('.cell')
                field.getCoordsFromDisplay(bricks)
                
                
                //Переношу координаты - функция с побочным эффектом, ну да ладно
                transferCoordsFromDisplay(bat, "cells", document.querySelectorAll('.bat-inside'))
                bat.calcDifference()
                console.log(bat.cells)

                //Прикольная функциональная запись, оставлю
                // let coords = [...document.querySelectorAll('.bat-inside')].map((element) =>{
                //     return element.getBoundingClientRect()
                // })
                

                // document.querySelectorAll('.bat-inside').forEach((element) => {
                //     console.log(element.getBoundingClientRect()
                //         )})

                display_field.update(field.cells,'active',"deepSkyBlue","white")

				let velocity = {x:1, y: -10}


				let timerId = setInterval(() => {

                        control.move(bat)
                        bat.update()
				        console.log(bat)     
                        //console.log(ball.x, ball.y)		
                        ball.move(velocity)
                        let hit_cell = checkIntersection(ball, field.cells, 40)
                        //console.log(hit_cell)
                        let hit_bat = checkIntersection(ball, bat.cells, 40)
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


						
					}, 10)

                    //Создаем контроллер, здесь, внизу потому что надо ему передавать
                    //timerId для остановки игры
                    const control = new Control(5, timerId)
				
		}

mainCycle(5, cols, field.cells.length)


