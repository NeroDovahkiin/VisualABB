class Node {

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.position = { x: null, y: null };
        this.level = null;
    }
}

class ABB {

    constructor() {
        this.root = null;
    }

    insert(data) {
        var newNode = new Node(data);
        if (this.root == null) {
            this.root = newNode;
            this.root.level = 0;
        }
        else
            this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left == null) {
                node.left = newNode;
                node.left.level = node.level+1;
            }
            else {
                newNode.level = node.level+1;
                this.insertNode(node.left, newNode);
            }
        }
        else {
            if (node.right == null) {
                node.right = newNode;
                node.right.level = node.level+1;
                
            }
            else {
                newNode.level = node.level+1;
                this.insertNode(node.right, newNode);
            }
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, key) {
        if (node === null)
            return null;
        else if (key < node.value) {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        else if (key > node.value) {
            node.right = this.removeNode(node.right, key);
            return node;
        }
        else {
            // deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            // deleting node with one children
            if (node.left === null) {
                node = node.right;
                return node;
            }

            else if (node.right === null) {
                node = node.left;
                return node;
            }

            var aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    }

    mostrarInOrder() {
        this.inOrder(this.root);
    }

    inOrder(node) {
        if (node != null) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }



    maxLevelOfTree(){
        
        let res = this.#maxLevelOfTree(this.root);
        console.log(res);
        return res;
      }
      
      #maxLevelOfTree(node){
        
        if(node != null){
            if(node.level > counter){
                counter = node.value;
            }
            this.#maxLevelOfTree(node.left, counter);
            
            this.#maxLevelOfTree(node.right, counter);
        }
      }
}