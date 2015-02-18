/**
 * Created by Евгений on 16.02.2015.
 */
(function () {

    var
        POINT_IS_CONSTRUCTOR_EXEPTION = 'Point is constructor, not a function',
        ARGUMENT_NOT_AN_INSTANCE_OF_POINT = "Argument is not an instance of Point",
        CIRCLE_STROK_WIDTH = 5;

    function Point(x, y) {
        if (!(this instanceof Point)) {
            throw POINT_IS_CONSTRUCTOR_EXEPTION;
        }
        var _x = x || 0;
        var _y = y || 0;

        this.getX = function () {
            return _x;
        };
        this.setX = function (x) {
            _x = x;
        };

        this.getY = function () {
            return _y;
        };
        this.setY = function (y) {
            _y = y;
        };

    }

    function Circle(x, y, r, color) {

        var _point = new Point(x, y);
        var _color = color;
        var _radius = r;


        this.getPoint = function() {
            return _point;
        };
        this.setPoint = function(p) {
            if (!(p instanceof Point)) {
                throw ARGUMENT_NOT_AN_INSTANCE_OF_POINT;
            }
            _point = p;
        };
        this.getColor = function() {
            return _color;
        };
        this.setColor = function(c) {
            _color = c;
        };

        this.getRadius = function() {
            return _radius;
        };
        this.setRadius = function(r) {
            _radius = r;
        };


    }
    Circle.prototype = {

        draw: function(context){
            context.beginPath();
            context.arc(this.getPoint().getX(), this.getPoint().getY(), this.getRadius(), 0, 2 * Math.PI, false);
            context.lineWidth = CIRCLE_STROK_WIDTH;
            context.strokeStyle = this.getColor();
            console.log(this.getColor());
            context.stroke();
            context.closePath();
        },
        drawFilled:  function(context){
            context.beginPath();
            context.arc(this.getPoint().getX(), this.getPoint().getY(), this.getRadius(), 0, 2 * Math.PI, false);
            context.fillStyle = this.getColor();
            context.fill();
            context.lineWidth = CIRCLE_STROK_WIDTH;
            context.strokeStyle = this.getColor();
            context.stroke();
            context.closePath();
        }

    };

    function ContentedCircle(x, y, r, color, content, contentColor) {

        Circle.apply(this, [x, y, r, color]);

        var _content = content;
        var _contentColor = contentColor;

        this.getContent = function() {
            return _content;
        };
        this.setContent = function(c) {
            _content = c;
        };

        this.getContentColor = function() {
            return _contentColor;
        };
        this.setContentColor = function(c) {
            _contentColor = c;
        };

    }

    ContentedCircle.prototype = Object.create(Circle.prototype);
    ContentedCircle.prototype.constructor = ContentedCircle;
    ContentedCircle.prototype.drawContent = function(context){
        var x = this.getPoint().getX() - this.getRadius() / 2;
        var y =  this.getPoint().getY() + this.getRadius() / 2;
        context.font = 'italic 24pt Calibri';
        context.fillStyle = this.getContentColor();
        context.fillText(this.getContent(), x, y, this.getRadius());
    };





    window.Point = Point;
    window.Circle = Circle;
    window.ContentedCircle = ContentedCircle;

}());