var rowCount = 5
var collumCount = 5


/**generates the dom used to display everything and adds it to the html */
function generateDom(collumCount,rowCount ) {
    let domNodes = []
    for (let i = 0; i < collumCount; i++) {
        domNodes[i] = []
    }
    const pla = document.getElementById("PLA")
    for (let j = 0; j < rowCount; j++) {
        let row = document.createElement("div")
        row.classList.add("moduleRow")
        for (let i = 0; i < collumCount; i++) {
            let newElement = document.createElement("div")
            newElement.classList.add("module")

            let textElement = document.createElement("div")
            textElement.classList.add("textElement")
            newElement.appendChild(textElement)

            let horizontalOutput = document.createElement("hr")
            horizontalOutput.classList.add("horizontalOutput")
            newElement.appendChild(horizontalOutput)

            let verticalOutput = document.createElement("hr")
            verticalOutput.classList.add("verticalOutput")
            newElement.appendChild(verticalOutput)


            
            row.appendChild(newElement)
            domNodes[i][j] = newElement
        }
        pla.appendChild(row)
    }

    return domNodes
}

var domNodes = generateDom(collumCount+2,rowCount+2)

var modules = []

for (let i = 1; i < collumCount + 1; i++) {
    modules[i] = []
    for (let j = 1; j < rowCount + 1; j++) {
        modules[i][j] = new Node(domNodes[i][j])
         
    }
}

//left inputs
modules[0] = []
for (let i = 1; i < rowCount+1; i++) {
    modules[0][i] = new Input(domNodes[0][i],true)
}

//top inputs
for (let i = 1; i < collumCount+1; i++) {
    modules[i][0] = new Input(domNodes[i][0],true)
}

//right outputs
modules[collumCount+1] = []
for (let i = 1; i < rowCount+1; i++) {
    modules[collumCount+1][i] = new Output(domNodes[collumCount+1][i],true)
}

//bottom outputs
for (let i = 1; i < collumCount+1; i++) {
    modules[i][rowCount+1] = new Output(domNodes[i][rowCount+1],true)
}





//crosslink modules

//left to right
for (let i = 0; i < collumCount + 1; i++) {

    for (let j = 1; j < rowCount +1 ; j++) {
        modules[i][j].right = modules[i + 1][j]
    }

}

//top to bottom
for (let i = 1; i < collumCount+2; i++) {
    for (let j = 0; j < rowCount +1; j++) {
        if((i!=collumCount+1||(j!=rowCount+1))&&(i!=collumCount+1||j!=0)){
            modules[i][j].bottom = modules[i][j + 1]
        }

    }

}



//update once to set initial state
for (let i=1;i<collumCount+1;i++){
    modules[i][0].bottom.updateTop(true)
    domNodes[i][0].childNodes[1].classList.add("outputHidden")
}
//update once to set initial state
for (let i=1;i<collumCount+1;i++){
    modules[0][i].right.updateLeft(true)
    domNodes[0][i].childNodes[2].classList.add("outputHidden")
}

//remove everything from the corners
domNodes[0][0].innerHTML = ""
domNodes[0][collumCount+1].innerHTML = ""
domNodes[rowCount+1][0].innerHTML = ""
domNodes[rowCount+1][collumCount+1].innerHTML = ""
