class Module {
    constructor(domNode) {
        this.right = null
        this.bottom = null
        this.domNode = domNode

        this.domNode.that = this //even if we call an onclick as a method of this class "this" reffers to the dom and not the class so we need to save a reference :(
        this.domNode.addEventListener("click", this.onclick)
    }


    updateTop() {
        console.error("this method need to get overwritten")
    }

    updateLeft() {
        console.error("this method need to get overwritten")
    }

    onclick() { //gets assinged to every moudule and says how they behave to beeing clicked on
        console.warn("not overwritten")
    }
}



class Input extends Module {

    constructor(domNode,value) {
        super(domNode)
        this.value = value
        this.domNode.innerText = value
    }

    onclick(){
        this.that.value = !this.that.value
        this.innerText = this.that.value
    }
}



class Output extends Module {

    constructor(domNode) {
        super(domNode)
        this.domNode.innerText = "output"
    }

    /**Updates the left input of the Output*/
    updateLeft(newValue) {
        //update the html to whatever value is given
    }
    
    onc
}


class Node extends Module {
    constructor(domNode) {
        super(domNode)
        this.type = 0
        this.domNode.innerText = this.type
        console.log(this.domNode);
        console.log(this.type);

    }


    onclick() {
        //this reffers to the domobject that calls the method!
        let that = this.that;

        console.log(that.type);
        that.type = (that.type + 1) % 4
        console.log(that.type);

        this.innerText = that.type



    }

}

