class Module {
    constructor(domNode) {
        this.right = null
        this.bottom = null

        this.topInput = true
        this.leftInput = true

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

    constructor(domNode, value) {
        super(domNode)
        this.value = value
        this.domNode.innerText = value
    }

    onclick() {
        let that = this.that

        console.log("jkshdfkjhgfd");
        console.log(that);
        that.value = !that.value
        this.innerText = that.value
        if (that.right != null) {
            that.right.updateLeft(that.value)
        }
        if (that.bottom != null) {
            console.log("jkshdfkjhgfd");
            that.bottom.updateTop(that.value)
        }
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
        this.domNode.innerText = newValue
    }

    /**Updates the top input of the Output*/
    updateTop(newValue) {
        //update the html to whatever value is given
        this.domNode.innerText = newValue
    }

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

    updateLeft(newValue) {
        console.log("updated");
        this.leftInput = newValue
        switch (this.type) {
            case 0:
                this.right.updateLeft(newValue)
                break;
            case 1:
                this.right.updateLeft(newValue || this.topInput)
                break;
            case 2:
                this.right.updateLeft(newValue)
                this.bottom.updateTop(this.leftInput && this.topInput)
                break;
            case 3:
                this.right.updateLeft(newValue)
                this.bottom.updateTop((!this.leftInput) && this.topInput)
                break;

            default:
                console.error("undefined state")
                break;
        }

    }

    updateTop(newValue) {
        this.topInput = newValue
        switch (this.type) {
            case 0:
                this.bottom.updateTop(newValue)
                break;
            case 1:
                this.right.updateLeft(newValue || this.topInput)
                this.bottom.updateTop(newValue)
                break;
            case 2:
                this.bottom.updateTop(this.leftInput && this.topInput)
                break;
            case 3:
                this.bottom.updateTop((!this.leftInput) && this.topInput)
                break;

            default:
                console.error("undefined state")
                break;
        }
    }

}

