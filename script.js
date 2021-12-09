var rowCount = 5
var collumCount = 5

var modules = []

for(let i=0;i<collumCount+1;i++){
    modules[i]= []
    for(let j=1;j<rowCount+1;j++){
        modules[i][j] = new Node()
    }
}

for(let i =0;i<rowCount;i++){
    modules[0][i] = new Input()
}

for(let i =0;i<collumCount;i++){
    modules[i][0] = new Constant(true)
}


//crosslink modules

for(let i=0;i<collumCount-1;i++){
    
    for(let j=1;j<rowCount;j++){
        modules[i][j].right = modules[i+1][j]
    }

}

for(let i=0;i<collumCount;i++){
    
    for(let j=0;j<rowCount-1;j++){
        modules[i][j].bottom = modules[i][j+1]

    }

}

//top right corner should not have any modules
modules[0][0] = null