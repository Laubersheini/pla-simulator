class Module{
    constructor(){
        this.right = null
        this.bottom = null
    }


    updateTop() {
       console.error("this method need to get overwritten")
    }

    updateLeft() {
       console.error("this method need to get overwritten")
    }
}



class Input extends Module{

    constructor(){
        super()
        this.type = "input"
    }
}


class Constant extends Module{

    constructor(value){
        super()
        this.value = value
    }
}


class Output extends Module{
    
    constructor(){
        super()
    }

    /**Updates the left input of the Output*/
    updateLeft(newValue) {
        //update the html to whatever value is given
    }

}


class Node extends Module{
    constructor(){
        super()
    }
}


