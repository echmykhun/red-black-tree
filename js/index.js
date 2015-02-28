/**
 * Created by eugene.chmykhun on 12/9/2014.
 */


//

document.addEventListener("DOMContentLoaded", function () {


    var canvas = document.querySelector('#rbTreeCanvas');
    var ctx = canvas.getContext('2d');

    var tree = new rbTree();

    tree.insertNode(13);
    tree.insertNode(8);
    tree.insertNode(17);
    tree.insertNode(1);
    tree.insertNode(11);
    tree.insertNode(15);
    tree.insertNode(25);
    tree.insertNode(6);
    tree.insertNode(22);
    tree.insertNode(27);

    tree.draw(500, 25, ctx);

    BFS(tree.root);


});