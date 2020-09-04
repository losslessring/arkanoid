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


//АРКАНОИД. Писал из головы. Идея в том , чтобы создать абстрактные сущности
//мяча, биты, кирпичей, и перекидывая данные на отображение на экране, и обратно
// в абстрактные объекты ими управлять. Получилось несколько эклектично. Но я доволен.
//Есть несколько классов, есть отображение, элементы ДОМ в данном случае,
// есть прослойка функций, обеспечивающая перекидывание данных
// от экрана к объектам и назад.


// Задание игрового поля, биты и мяча, и их отображения
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
    

    //Обновляю цвета кирпичей
    display_field.update(field.cells,'type', 'brick', "deepSkyBlue")
    display_field.update(field.cells,'type', 'empty', "white")
    display_field.update(field.cells,'type', 'wall', "green")
    display_field.update(field.cells,'type', 'floor', "pink")
	
    //Начальная скорость мяча
    let velocity = {x:1, y: -5}

    //Основной цикл игры
	let timerId = setInterval(() => {

            //Полет мяча, движение биты, переключение кирпичей, анализ столкновений
            //Обновление отображения, перекидывание данных с отображения на объекты
            control.move(bat)
            bat.update()
            //Перемудрил - переношу координаты разными способами, следовало сделать одним
            transferCoordsFromDisplay(bat, "cells", document.querySelectorAll('.bat-inside'))

            	
            ball.move(velocity)

            display_bat.update(bat)
            display_ball.update(ball)
            
            // Проверяю пересечение мяча с кирпичами и битой, потом объединяю данные
            //о столкновениях в обдин общий объект           
            let hit_bat =  checkAccurateIntersection(document.querySelector('#ball').getBoundingClientRect(),  bat.cells)
            
            let hit_cell =  checkAccurateIntersection(document.querySelector('#ball').getBoundingClientRect(),  field.cells)

            let hit = { ...hit_cell, ...hit_bat}

            //Проверка с чем столкнулся мяч и задание отражения по типу поверхности
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

            
			
		}, 10)

        //Создаем контроллер, здесь, внизу потому что надо ему передавать
        //timerId для остановки игры
        const control = new Control(5, timerId)
		
}

mainCycle(5, cols, field.cells.length)


