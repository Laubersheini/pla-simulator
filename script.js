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
            row.appendChild(newElement)
            domNodes[i][j] = newElement
        }
        pla.appendChild(row)
    }

    return domNodes
}

var domNodes = generateDom(collumCount+1,rowCount+1)

var modules = []

for (let i = 0; i < collumCount + 1; i++) {
    modules[i] = []
    for (let j = 1; j < rowCount + 1; j++) {
        modules[i][j] = new Node(domNodes[i][j])
         
    }
}

for (let i = 0; i < rowCount; i++) {
    modules[0][i] = new Input(domNodes[0][i])
}

for (let i = 0; i < collumCount; i++) {
    modules[i][0] = new Constant(domNodes[i][0],true)
}


//crosslink modules
for (let i = 0; i < collumCount - 1; i++) {

    for (let j = 1; j < rowCount; j++) {
        modules[i][j].right = modules[i + 1][j]
    }

}

for (let i = 0; i < collumCount; i++) {

    for (let j = 0; j < rowCount - 1; j++) {
        modules[i][j].bottom = modules[i][j + 1]

    }

}

//top right corner should not have any modules
modules[0][0] = null



