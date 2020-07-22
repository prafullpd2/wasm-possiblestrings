import { BinaryNode } from './BinaryNode.js';
class PossibleString {

    binaryTree = new BinaryNode(-1, null, null);
    counter = 0;
    constructor(num) {
        this.stringNum = String(num);
        this.initPosibities(this.stringNum);
    }

    initPosibities(stringNum) {
        // console.log(this.binaryTree);
        let val = null;
        for (let i = 0; i < stringNum.length; i++) {
            val = stringNum[i]
            if (stringNum[i + 1] != '0') {

                this.find(val, this.binaryTree);

            } else {
                i++;
                val = val + stringNum[i];
                this.find(val, this.binaryTree);
            }
        }
        console.log(this.binaryTree);
    }
    find(val, nodeVal) {

        let valueReturned = null;

        if (nodeVal.left) {
            valueReturned = this.find(val, nodeVal.left);
            if (valueReturned && valueReturned == val && valueReturned < 27 && nodeVal.left.val + valueReturned < 27 && !nodeVal.right) {
                nodeVal.right = new BinaryNode(nodeVal.left.val + valueReturned);
                return null;
            } 
        } else {
            nodeVal.left = new BinaryNode(val, null, null);
            return val;
        }

        if (nodeVal.right) {

            valueReturned = this.find(val, nodeVal.right);
            return;
        }
        // console.log(this.binaryTree, null, 2)

    }

    printStrings(node=this.binaryTree, str=''){
        if(node.left){

            let tempstr1  = node.val == '-1' ? '': str+ this.toCharFromCode(node.val);
            this.printStrings(node.left, tempstr1);

        } else{
            this.counter++;
            console.log(this.counter+'. '+ str+this.toCharFromCode(node.val));
            return
        }
        if(node.right){
            
            let tempstr2  = node.val == '-1' ? '': str+ this.toCharFromCode(node.val);
            this.printStrings(node.right, tempstr2);
        }
        return;  
    }

    count(node=this.binaryTree){
        if(node.left){

            // let tempstr1  = node.val == '-1' ? '': str+ this.toCharFromCode(node.val);
            this.count(node.left);

        } else{
            this.counter++;
            return
        }
        if(node.right){
            
            // let tempstr2  = node.val == '-1' ? '': str+ this.toCharFromCode(node.val);
            this.count(node.right);
        }
        return;
    }
    countSTRs(){
        this.counter = 0;
        this.count();
        return this.counter;     
    }
    toCharFromCode(num){
        return String.fromCharCode(Number(num) + 64);
    }
}

/* let newPossibleString = new PossibleString('1111111111111111111111111111111111111');

newPossibleString.printStrings();
newPossibleString.counter = 0;

 */

export {PossibleString};




