$(document).ready(function () {
    var socket = io();
    var drawing = false;

    var pictionary = function () {
        var canvas, context;

        var draw = function (position) {
            context.beginPath();
            context.arc(position.x, position.y, 6, 0, 2 * Math.PI);
            context.fill();
        };

        canvas = $('canvas');
        context = canvas[0].getContext('2d');
        canvas[0].width = canvas[0].offsetWidth;
        canvas[0].height = canvas[0].offsetHeight;

        canvas.on('mousedown', function (event) {
            drawing = true;
            console.log("mousedown is activated");
        });

        canvas.on('mouseup', function (event) {
            drawing = false;
            console.log("mouseup is activated");
        })


        canvas.on('mouseover', function (event) {

            if (drawing == true) {

                var offset = canvas.offset();
                var position = {
                    x: event.pageX - offset.left,
                    y: event.pageY - offset.top
                };
                draw(position);
                // send to server
                socket.emit('draw', position);
            }
        });

        socket.on('beginDrawing', draw);

    };

    pictionary();

});
