var movie;
var canvas;
var playButton;
var playPressed = false;

var inputName;
var playingInThisMoment = false;
var movieEvents;
var inputField;
var submitButton;
var movieInput;

function setup() {

    inputField = createInput("insert url to video").addClass("urlInput");
    submitButton = createButton("submit").addClass("button");

    submitButton.mousePressed(submitFile);
    createP("drag your file here")

}

function draw() {

    if (playingInThisMoment) {
        movie.loadPixels();
        verticalS(...somecode...);

    } else if (!playingInThisMoment) {
        return;
    }
}

function playVideo() {
    if (playPressed) {
        movie.pause();
        playingInThisMoment = false;
        playButton.html("play");
    } else if (!playPressed) {
        playingInThisMoment = true;

        playButton.html("pause");
    }

    playPressed = !playPressed;
}


function submitFile() {
    if (!!inputField.value() && inputField.value() != "insert url to video") {
        movieInput = inputField.value();

        console.log(movieInput);

        //------>here getFile(.....movieInput.....)    }   HERE IS MY PROBLEM: IT WORKS WITH A LOCAL FILE BUT NOT URL <<-------------//
}

function getFile(file) {
    pixelDensity(1);

    movie = createVideo(file.data).id("video");
    movie.size(movieWidth, movieHeight);

    movieEvents = document.getElementById("video");

    movieEvents.onplaying = function() {
        console.log("The audio is now playing");
        playingInThisMoment = true;
    };

    movieEvents.onwaiting = function() {
        console.log("Wait! I need to buffer the next frame");
        // playingInThisMoment = false;
    };

    canvas = createCanvas(movieWidth, movieHeight).stroke(0);

    playButton = createButton("play")
    playButton.mouseClicked(playVideo);
}
