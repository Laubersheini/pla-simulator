class Module{
    constructor(){

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
    }
}


class Constant extends Module{

    constructor(){
        super()
    }
}


class Output extends Module{
    
    constructor(){
        super()
    }

    updateLeft(newValue) {
        //update the html to whatever value is given
    }

}


class Node extends Module{
    constructor(){
        super()
    }
}