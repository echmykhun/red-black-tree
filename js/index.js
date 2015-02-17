/**
 * Created by eugene.chmykhun on 12/9/2014.
 */


//

document.addEventListener("DOMContentLoaded", function () {


    var canvas = document.querySelector('#rbTreeCanvas');
    var ctx = canvas.getContext('2d');

    //ctx

    //console.log(ctx);
    //
    //
    //
    ////ctx.fillRect(25,25,100,100);
    ////ctx.clearRect(45,45,60,60);
    ////ctx.strokeRect(50,50,50,50);
    //
    ////var pount = ne
    //
    //var circle = new ContentedCircle(250, 250, 25, "red", 222, "black");
    //console.log(circle);
    //circle.drawFilled(ctx);
    //circle.drawContent(ctx);


    var tree = new rbTree();
//console.log(tree);

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
    console.log(tree);

    tree.draw(500, 20, ctx);


});