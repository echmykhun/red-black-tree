var rbTree = function () {
};

rbTree.prototype = {

    rbTree: function () {
    },
    root: new rbNode()
};


var rbNode = function () {
};

rbNode.prototype = {
    id: -1,
    tree: null,
    left: null,
    right: null,
    parent: null,
    isRed: false,
    value: 0,
    isNil: true,
    rbNode: function () {
    },
    rotateLeft: function () {

        var y = this.right;
        this.right = y.left;
        if (!y.left.isNil) {
            y.left.parent = this;
        }
        if (!y.isNil) y.parent = this.parent;
        if (this.parent) {
            if (this.id == this.parent.left.id) {
                this.parent.left = y;
            }
            else {
                this.parent.right = y;
            }
        } else {
            this.tree.root = y;
        }

        y.left = this;

    }
};