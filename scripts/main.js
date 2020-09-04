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
            transferCoordsFromDisplay,
            getDomProperty,
            checkAccurateIntersection
        } from './utility.js'





const rows = 15
const cols = 20

let field = new Field(rows, cols)
console.log(field)


let display_field = new DisplayField(document.getElementById("container"), 
	field.rows, field.cols, 'cell')


//Получить координаты контейнера для начальной установки биты и шара
const container_coords = getScreenCoords('#container')

let bat = new Bat(container_coords.right / 2, container_coords.bottom - 80, 1, 5)
console.log(bat)

let bat_inside = new DisplayField(document.getElementById("bat"), 
    bat.cols, 1, 'bat-inside')

let display_bat = new Display('#bat', bat)





const ball = new Ball((container_coords.right / 2)+5, container_coords.bottom - 180)
const display_ball = new Display('#ball', ball)

//console.log(getScreenCoords('#container'))





const mainCycle = (position, increment, boundary) => {



    // document.addEventListener('mousemove', (e)=>{
    //     console.log(`x: ${e.pageX} y: ${e.pageY}`)
    // })

                  
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

    display_field.update(field.cells,'type', 'brick', "deepSkyBlue")
    display_field.update(field.cells,'type', 'empty', "white")
    display_field.update(field.cells,'type', 'wall', "green")
    display_field.update(field.cells,'type', 'floor', "pink")
    //display_field.update(field.cells,'active', 0, "white")
    //display_field.update(field.cells,'wall', 1, "green")
	
    let velocity = {x:1, y: -5}


	let timerId = setInterval(() => {

            control.move(bat)
            bat.update()
            //Перемудрил - переношу координаты разными способами, следовало сделать одним
            transferCoordsFromDisplay(bat, "cells", document.querySelectorAll('.bat-inside'))
	        //console.log(bat)     
            	
            ball.move(velocity)

            display_bat.update(bat)
            display_ball.update(ball)
            //console.log(ball.x, ball.y) 
            //console.log(ball)
            // console.log(getDomProperty(document.querySelectorAll('#ball'), 'getBoundingClientRect'))
            //let hit_cell = checkIntersection(ball, field.cells, 50)
            //console.log(hit_cell)
            //let hit_bat = checkIntersection(ball, bat.cells, 50)

            // let bat_inside_coords = [...document.querySelectorAll('.bat-inside')].map((element) =>{
            //     return element.getBoundingClientRect()
            // })
            //console.log(coords)
            let hit_bat =  checkAccurateIntersection(document.querySelector('#ball').getBoundingClientRect(),  bat.cells)
            //console.log({...hit_bat})
            //let hit = { ...hit_cell, ...hit_bat}
            //console.log(bat.cells)
            //console.log(hit)
            // let hit_cell = checkAccurateIntersection(document.querySelector('#ball').getBoundingClientRect(),
            //                         getDomProperty(document.querySelectorAll('.cell'), 'getBoundingClientRect'))
            let hit_cell =  checkAccurateIntersection(document.querySelector('#ball').getBoundingClientRect(),  field.cells)
            let hit = { ...hit_cell, ...hit_bat}

            if(hit){
                
                switch (hit.type) {
                  
                  case 'brick':
                                      
                    velocity = {x: velocity.x, y:-velocity.y}
                    hit_cell.type = 'empty'
                    display_field.update(field.cells,'type', 'empty', "white")
                  
                    break

                  case 'wall':

                    velocity = {x: -velocity.x, y:velocity.y}
                    
                    break
                  
                  case 'bat':
                    //console.log(hit)
                    velocity = {x: hit.deflect_x, y:-velocity.y } 
                    
                    break
                  
                  case 'floor':
                    
                    velocity = {x: velocity.x, y: -velocity.y}

                    break

                  case 'empty':
                    
                    //hit_cell.type = 'track'
                    //display_field.update(field.cells,'type', 'track', "yellow")

                    break
                  
                }

            }

            // if (hit_cell && hit_cell.type ==='brick'){
            //     hit_cell.type = 'empty'
            //     display_field.update(field.cells,'type', 'empty', "white")
            // }
            // if (hit_cell && hit_cell.active ){
                
            //     hit_cell.active = 0
            //     // display_field.update(field.cells,'active', 1, "deepSkyBlue")
            //     // display_field.update(field.cells,'active', 0, "white")
            //     // display_field.update(field.cells,'wall', 1, "green")
            //     if (hit_cell.wall){
            //         velocity = {x: -velocity.x, y:velocity.y}    
            //     }
            //     else {
            //         velocity = {x: velocity.x, y:-velocity.y}
            //     }
            //     //velocity = {x: getRandomInt(0,10), y:getRandomInt(0,10) }   
            // }

            //  if(hit_bat){
            //      velocity = {x: getRandomInt(0,5), y:-velocity.y }   
            //  }

            
            //console.log(checkPropertyInArray(ball, field.cells, "x", closeEnough, 0.5))
            //checkIntersection(ball, field.cells)
			//display_field.update(field.cells,'active',"deepSkyBlue","white")

			// display_bat.update(bat)
   //          display_ball.update(ball)
//            console.log(getDomProperty(document.querySelectorAll('#ball'), 'getBoundingClientRect'))            

			
		}, 10)

        //Создаем контроллер, здесь, внизу потому что надо ему передавать
        //timerId для остановки игры
        const control = new Control(5, timerId)
		
}

mainCycle(5, cols, field.cells.length)


