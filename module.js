class Module{
    constructor(domNode){
        this.right = null
        this.bottom = null
        this.domNode = domNode
        this.domNode.onclick = this.onclick
    }


    updateTop() {
       console.error("this method need to get overwritten")
    }

    updateLeft() {
       console.error("this method need to get overwritten")
    }

    onclick(){ //gets assinged to every moudule and says how they behave to beeing clicked on

    }
}



class Input extends Module{

    constructor(domNode){
        super(domNode)
    }
}


class Constant extends Module{

    constructor(domNode,value){
        super(domNode)
        this.value = value
    }
}


class Output extends Module{
    
    constructor(domNode){
        super(domNode)
    }

    /**Updates the left input of the Output*/
    updateLeft(newValue) {
        //update the html to whatever value is given
    }

}


class Node extends Module{
    constructor(domNode){
        super(domNode)
    }
}


