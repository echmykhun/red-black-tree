var COUNT = 0;

var rbNode = function (tree) {
    //console.log(tree);
    this.tree = tree;
    this.id = ++COUNT;
    this.isNil = true;
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
    //rbNode: function (tree) {
    //    console.log(tree);
    //    this.tree = tree;
    //    this.id = ++COUNT;
    //},
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

        if (!this.isNil) this.parent = y;

    },
    rotateRight: function(){

        var y = this.left;

        this.left = y.right;
        if (!y.right.isNil) y.right.parent = this;

        if (!y.isNil) y.parent = this.parent;
        if (this.parent) {
            if (this.id == this.parent.right.id)
                this.parent.right = y;
            else
                this.parent.left = y;
        } else {
            this.tree.root = y;
        }


        y.right = this;
        if (!this.isNil) this.parent = y;


    }
};


var rbTree = function () {
    this.root = new rbNode(this);
};

rbTree.prototype = {

    rbTree: function () {
    },
    root: null,//new rbNode(this),
    insertFixup: function(x){

        while(x.id != this.root.id && x.parent.isRed){


            if (x.parent.id == x.parent.parent.left.id) {
                var y = x.parent.parent.right;
                if (y.isRed) {

                    /* uncle is RED */
                    x.parent.isRed = false;
                    y.isRed = false;
                    x.parent.parent.isRed = true;
                    x = x.parent.parent;
                } else {

                    /* uncle is BLACK */
                    if (x.id == x.parent.right.id) {
                        /* make x a left child */
                        x = x.parent;
                        x.rotateLeft();
                    }

                    /* recolor and rotate */
                    x.parent.isRed = false;
                    x.parent.parent.isRed = true;
                    x.parent.parent.rotateRight();
                }
            } else {

                /* mirror image of above code */
                var y = x.parent.parent.left;
                if (y.isRed) {

                    /* uncle is RED */
                    x.parent.isRed = false;
                    y.isRed = false;
                    x.parent.parent.isRed = true;
                    x = x.parent.parent;
                } else {

                    /* uncle is BLACK */
                    if (x.id == x.parent.left.id) {
                        x = x.parent;
                        //rotateRight(x);
                        x.rotateRight();
                    }
                    x.parent.isRed = false;
                    x.parent.parent.isRed = true;
                    x.parent.parent.rotateLeft();
                }
            }
        }

        this.root.isRed = false;

    },
    insertNode: function(data){
        var current, parent, x;
        current = this.root;
        parent = null;
        while(!current.isNil){
            if(data == current.value) return current;
            parent = current;
            current = data < current.value ? current.left : current.right;
        }
        x = new rbNode(this);
        x.value = data;
        x.parent = parent;
        x.isRed = true;
        x.isNil = false;

        x.left = new rbNode(this);
        //x.left.isNil = true;
        x.right = new rbNode(this);
        //x.right.isNil = true;

        if(parent){
            if(x.value < parent.value)
            parent.left = x;
            else
                parent.right = x;

        }else{
            this.root = x;
        }
        this.insertFixup(x);

        return x;

    },
    deleteFixup: function(x){

        while (x.id != this.root.id && !x.isRed) {
            if (x.id == x.parent.left.id) {
                var w = x.parent.right;
                if (w.isRed) {
                    w.isRed = false;
                    x.parent.isRed = true;
                    //rotateLeft (x.parent);
                    x.parent.rotateLeft();
                    w = x.parent.right;
                }
                if (!w.left.isRed && !w.right.isRed) {
                    w.isRed = true;
                    x = x.parent;
                } else {
                    if (!w.right.isRed) {
                        w.left.isRed = false;
                        w.isRed = true;
                        //rotateRight (w);
                        w.rotateRight();
                        w = x.parent.right;
                    }
                    w.isRed = x.parent.isRed;
                    x.parent.isRed = false;
                    w.right.isRed = false;
                    //rotateLeft (x.parent);
                    x.parent.rotateLeft();
                    x = this.root;
                }
            } else {
                var w = x.parent.left;
                if (w.isRed) {
                    w.isRed = false;
                    x.parent.isRed = true;
                    //rotateRight (x.parent);
                    x.parent.rotateRight();
                    w = x.parent.left;
                }
                if (!w.right.isRed && !w.left.isRed) {
                    w.isRed = true;
                    x = x.parent;
                } else {
                    if (!w.left.isRed) {
                        w.right.isRed = false;
                        w.isRed = true;
                        //rotateLeft (w);
                        w.rotateLeft();
                        w = x.parent.left;
                    }
                    w.isRed = x.parent.isRed;
                    x.parent.isRed = false;
                    w.left.isRed = false;
                    //rotateRight (x.parent);
                    x.parent.rotateRight();
                    x = this.root;
                }
            }
        }
        x.isRed = false;




    },
    deleteNode: function(z){

        var x, y;

        if (!z || z.isNil) return;


        if (z.left.isNil || z.right.isNil) {
            /* y has a NIL node as a child */
            y = z;
        } else {
            /* find tree successor with a NIL node as a child */
            y = z.right;
            while (y.left.isNil) y = y.left;
        }

        /* x is y's only child */
        if (!y.left.isNil)
            x = y.left;
        else
            x = y.right;

        /* remove y from the parent chain */
        x.parent = y.parent;
        if (y.parent)
            if (y.id == y.parent.left.id)
                y.parent.left.id = x.id;
            else
                y.parent.right.id = x.id;
        else
            this.root = x;

        if (y.id != z.id) z.data = y.data;


        if (!y.isRed)
            this.deleteFixup (x);

        //free (y);


    },
    findNode: function(data){

        var current = this.root;
        while(!current.isNil){
            if(data == current.value){
                return current;
            }else{
                current = data < current.value ? current.left : current.right;
            }
        }
        return null;

    },
    draw: function(x, y, context, node, level){
        var n = node || this.root;
        var color = n.isRed ? 'red' : 'black';
        var contentColor = n.isRed ? 'black' : 'red';
        var lvl = level || 1;
        var val = n.isNil ? "NIL" : n.value;
        console.log(val);

        var template = new ContentedCircle(x, y, 20, color, val, contentColor);
        //template.drawFilled(context);
        template.draw(context);
        template.drawContent(context);

        if(n.left){
            this.draw(x - 250 / lvl, y + 50, context, n.left, lvl + 1);
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(x, y + 20);
            context.lineTo(x - 250 / lvl,  y + 50 - 20);
            context.stroke();
            context.closePath();
        }
        if(n.right){
            this.draw(x + 250 / lvl, y + 50, context, n.right, lvl + 1);
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(x, y + 20);
            context.lineTo(x + 250 / lvl,  y + 50 - 20);
            context.stroke();
            context.closePath();
        }


    }


};


