$(document).ready(function () {
    var socket = io();
    var drawing = true;

    var pictionary = function () {
        var canvas, context, guessBox;

        // Previous guesses
        var previousGuesses = function (guess) {
            $('#previousGuesses').text("The last guess was: " + guess);
        };

        // Guesses function when "Enter" is pressed on button
        var onKeyDown = function (event) {
            if (event.keyCode != 13) {
                return;
            }

            var inputGuess = guessBox.val();
            console.log(inputGuess);
            previousGuesses(inputGuess);
            guessBox.val('');
        };

        guessBox = $('#guess input');
        guessBox.on('keydown', onKeyDown);
        socket.emit('guess', guessBox);


        // Draw function: beginPath when evoked, run arc (circle with x and y position, radius and etc), fill the path
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
        });

        // move
        canvas.on('mouseover', function (event) {

            if (drawing == true) {

                var offset = canvas.offset();
                var position = {
                    x: event.pageX - offset.left,
                    y: event.pageY - offset.top
                };

                draw(position);
            };

            // send to server
            socket.emit('draw', position);
        });

        // catch data coming in from server and run functions accordingly
        socket.on('beginDrawing', draw);
        socket.on('guess', previousGuesses);
    };

    pictionary();

});
