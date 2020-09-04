

export default class DisplayField {

    constructor (container, rows, cols, class_name) {
        
        //Generate grid field based on rows and columns
        container.style.setProperty('--grid-rows', rows)
        container.style.setProperty('--grid-cols', cols)
        //container.style.setProperty('width', cols)
        //container.style.setProperty('height', cols)

        for (let c = 0; c < (rows * cols); c++) {
            let cell = document.createElement("div");
             //Текст внутри клетки               
              //cell.innerText = (c);
            container.appendChild(cell).className = class_name;
        }
        
        this.cells = document.getElementsByClassName('cell')

    }
    // Update colors based on array values
    // Not very good that array is coming from outside, could cause errors.
    update(array, property, value, color1){
        //console.log(color0)
        if (array.length == this.cells.length){
            for (let i = 0; i < array.length; i++) {
                //document.getElementsByClassName('cell')[c].style.backgroundColor = "blue"
                
                if(array[i][property] === value){
                    if(color1){
                        this.cells[i].style.backgroundColor = color1
                    }
                }
                
                

            }
        }
    }

}

