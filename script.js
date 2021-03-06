var modules;

/**generates the dom used to display everything and adds it to the html */
function generateDom(collumCount, rowCount) {
    let domNodes = []
    const pla = document.getElementById("PLA")
    pla.innerHTML = ""

    for (let i = 0; i < collumCount; i++) {
        domNodes[i] = []
    }

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
            horizontalOutput.classList.add("horizontalOutputOn")
            newElement.appendChild(horizontalOutput)

            let verticalOutput = document.createElement("hr")
            verticalOutput.classList.add("verticalOutput")
            verticalOutput.classList.add("verticalOutputOn")
            newElement.appendChild(verticalOutput)



            row.appendChild(newElement)
            domNodes[i][j] = newElement
        }
        pla.appendChild(row)
    }

    return domNodes
}

function generatePLA(collumCount, rowCount, moduleTypes) {



    var domNodes = generateDom(collumCount + 2, rowCount + 2)

    modules = []

    for (let i = 1; i < collumCount + 1; i++) {
        modules[i] = []
        for (let j = 1; j < rowCount + 1; j++) {
            modules[i][j] = new Node(domNodes[i][j])

        }
    }

    //left inputs
    modules[0] = []
    for (let i = 1; i < rowCount + 1; i++) {
        modules[0][i] = new Input(domNodes[0][i], true)
    }

    //top inputs
    for (let i = 1; i < collumCount + 1; i++) {
        modules[i][0] = new Input(domNodes[i][0], true)
    }

    //right outputs
    modules[collumCount + 1] = []
    for (let i = 1; i < rowCount + 1; i++) {
        modules[collumCount + 1][i] = new Output(domNodes[collumCount + 1][i], true)
    }

    //bottom outputs
    for (let i = 1; i < collumCount + 1; i++) {
        modules[i][rowCount + 1] = new Output(domNodes[i][rowCount + 1], true)
    }





    //crosslink modules

    //left to right
    for (let i = 0; i < collumCount + 1; i++) {

        for (let j = 1; j < rowCount + 1; j++) {
            modules[i][j].right = modules[i + 1][j]
        }

    }

    //top to bottom
    for (let i = 1; i < collumCount + 2; i++) {
        for (let j = 0; j < rowCount + 1; j++) {
            if ((i != collumCount + 1 || (j != rowCount + 1)) && (i != collumCount + 1 || j != 0)) {
                modules[i][j].bottom = modules[i][j + 1]
            }

        }

    }


    //set the types of the modules (if a type is given)

    if (moduleTypes != undefined) {
        for (let i = 0; i < moduleTypes.length; i++) {
            for (let j = 0; j < moduleTypes[i].length; j++) {
                if (modules[i][j] != null) {

                    modules[i][j].type = moduleTypes[i][j]
                }

            }
        }
    }


    //update once to set initial state
    for (let i = 1; i < collumCount + 1; i++) {
        modules[i][0].bottom.updateTop(modules[i][0].type)
        modules[i][0].updateBottomVisuals()
        domNodes[i][0].childNodes[1].classList.add("outputHidden")
    }
    //update once to set initial state
    for (let i = 1; i < rowCount + 1; i++) {
        modules[0][i].right.updateLeft(modules[0][i].type)
        modules[0][i].updateRightVisuals()
        domNodes[0][i].childNodes[2].classList.add("outputHidden")
    }

    //remove everything from the corners
    domNodes[0][0].innerHTML = ""
    domNodes[0][rowCount + 1].innerHTML = ""
    domNodes[collumCount + 1][0].innerHTML = ""
    domNodes[collumCount + 1][rowCount + 1].innerHTML = ""
}

function modulesToString(modules) {
    let moduleTypes = []

    for (let i = 0; i < modules.length; i++) {
        moduleTypes[i] = []
        for (let j = 0; j < modules[i].length; j++) {
            const element = modules[i][j];
            if (element != undefined) {

                moduleTypes[i][j] = element.type
            }

        }
    }
    return JSON.stringify(moduleTypes)
}

function saveModules() {
    let moduleTypes = modulesToString(modules)
    localStorage.setItem("PLA-moduleTypes",moduleTypes) 
}



function changeSize() {
    let collumCount = parseInt(document.getElementById("collumCount").value)
    let rowCount = parseInt(document.getElementById("rowCount").value)
    generatePLA(collumCount, rowCount)
}

//read modules from localstore if they exist
var moduleTypes = localStorage.getItem("PLA-moduleTypes")
if (moduleTypes == undefined) {

    generatePLA(5, 5)
} else {
    moduleTypes = JSON.parse(moduleTypes)
    generatePLA(moduleTypes.length - 2, moduleTypes[1].length - 2, moduleTypes)
}