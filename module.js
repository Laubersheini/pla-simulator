class Module {
    constructor(domNode) {
        this.right = null
        this.bottom = null

        this.bottomOutput = true
        this.rightOutput = true

        this.topInput = true
        this.leftInput = true

        this.domNode = domNode.firstChild

        domNode.that = this //even if we call an onclick as a method of this class "this" reffers to the dom and not the class so we need to save a reference :(

        domNode.addEventListener("click", this.onclick)
    }


    updateTop() {
        console.error("this method need to get overwritten")
    }

    updateLeft() {
        console.error("this method need to get overwritten")
    }

    updateBottomVisuals() {
        if (this.bottomOutput) {
            this.domNode.parentNode.childNodes[2].classList.remove("verticalOutputOff")
            this.domNode.parentNode.childNodes[2].classList.add("verticalOutputOn")
        } else {
            this.domNode.parentNode.childNodes[2].classList.remove("verticalOutputOn")
            this.domNode.parentNode.childNodes[2].classList.add("verticalOutputOff")
        }
    }

    updateRightVisuals() {
        if (this.rightOutput) {
            this.domNode.parentNode.childNodes[1].classList.remove("horizontalOutputOff")
            this.domNode.parentNode.childNodes[1].classList.add("horizontalOutputOn")
        } else {
            this.domNode.parentNode.childNodes[1].classList.remove("horizontalOutputOn")
            this.domNode.parentNode.childNodes[1].classList.add("horizontalOutputOff")
        }
    }



    onclick() { //gets assinged to every moudule and says how they behave to beeing clicked on
        console.warn("not overwritten")
    }


    set type(type){
        this._type = type
        this.domNode.innerText = type
    } 
    get type(){
        return this._type
    }


}



class Input extends Module {

    constructor(domNode, type) {
        super(domNode)
        this.type = type
        this.domNode.innerText = type
        this.bottomOutput = type
        this.rightOutput = type
        this.updateBottomVisuals()
        this.updateRightVisuals()
    }

    onclick() {
        let that = this.that

        that.type = !that.type
        this.firstChild.innerText = that.type
        if (that.right != null) {
            that.updateRightVisuals()
            that.right.updateLeft(that.type)
        }
        if (that.bottom != null) {
            that.updateBottomVisuals()
            that.bottom.updateTop(that.type)
        }

        saveModules()
    }

    set type(type){
        this._type = type
        this.domNode.innerText = type
        this.bottomOutput = type
        this.rightOutput = type
    }

    get type(){
        return this._type
    }
}



class Output extends Module {

    constructor(domNode) {
        super(domNode)
        //this.domNode.innerText = true
        this.domNode.parentNode.childNodes[1].classList.add("outputHidden")
        this.domNode.parentNode.childNodes[2].classList.add("outputHidden")
        this.type = true;
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
        //this.domNode.innerText = this.type
        //console.log(this.domNode);
        //console.log(this.type);

    }


    onclick() {
        //this reffers to the domobject that calls the method!
        let that = this.that;

        console.log(that.type);
        that.type = (that.type + 1) % 4
        console.log(that.type);

        this.firstChild.innerText = that.type

        that.updateLeft(that.leftInput,true)
        that.updateTop(that.topInput,true)


        saveModules()
    }

    updateLeft(newValue,isTypechange) {
        if (this.leftInput != newValue || isTypechange) {
            console.log("updated");
            this.leftInput = newValue
            switch (this.type) {
                case 0:
                    this.rightOutput = newValue;
                    break;
                case 1:
                    this.rightOutput = newValue || this.topInput
                    break;
                case 2:
                    this.rightOutput = newValue
                    this.bottomOutput = this.leftInput && this.topInput
                    break;
                case 3:
                    this.rightOutput = newValue
                    this.bottomOutput = (!this.leftInput) && this.topInput
                    break;

                default:
                    console.error("undefined state")
                    break;
            }

            this.updateBottomVisuals()
            this.updateRightVisuals()
            this.right.updateLeft(this.rightOutput)
            this.bottom.updateTop(this.bottomOutput)
        }
    }

    updateTop(newValue,isTypechange) {
        if (this.topInput != newValue||isTypechange) {

            this.topInput = newValue
            switch (this.type) {
                case 0:
                    this.bottomOutput = newValue
                    break;
                case 1:
                    this.rightOutput = this.leftInput || this.topInput
                    this.bottomOutput = this.topInput
                    break;
                    break;
                case 2:
                    this.bottomOutput = this.leftInput && this.topInput
                    break;
                case 3:
                    this.bottomOutput = (!this.leftInput) && this.topInput
                    break;

                default:
                    console.error("undefined state")
                    break;
            }
            this.updateBottomVisuals()
            this.updateRightVisuals()
            this.right.updateLeft(this.rightOutput)
            this.bottom.updateTop(this.bottomOutput)
        }
    }
}

