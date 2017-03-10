/**
 * Created by alberto on 8/03/17.
 */


$( "#start" ).click(startTimer);

$( "#restart" ).click(restartTimer);

$( "#pause" ).click(pauseTimer);

$(".timer input").focus(pauseTimer);

$("#audioInput").click(loadAudio);

function timeToTimer(time){
    seconds = time % 60;
    minutes = Math.floor(time/60);
    return {minutes: minutes, seconds: seconds};
}

function timerToTime(){
    seconds = parseInt($("#seconds").val());
    minutes = parseInt($("#minutes").val());
    return minutes * 60 + seconds;
}

function secondsToString(seconds) {
    return (seconds < 10)? "0" + seconds : seconds;
}

function setTimer(time) {
    $("#minutes").val(time.minutes);
    $("#seconds").val(secondsToString(time.seconds));

    //document.title = time.minutes + ":" + secondsToString(time.seconds) + " Vivaldi Pomodoro";

}

var timerInterval;
var alertAudio = new Audio("sounds/Fire_pager-jason.mp3");

function startTimer(){

    if(timerInterval != undefined) return;

    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer(){
    var actualTime = timerToTime();

    if(actualTime <= 0) finishTimer();
    else setTimer(timeToTimer(actualTime - 1));
}

function finishTimer(){
    pauseTimer();
    alertAudio.play();
}

function pauseTimer() {
    if(timerInterval != undefined) clearInterval(timerInterval);
    timerInterval = undefined;
}

function restartTimer() {
    pauseTimer();
    setTimer({minutes: 25, seconds: 0});
}

function loadAudio() {
    var file = $("#audioInput")[0].files[0];
    if(file.type.indexOf("audio") == -1) return;

    $("#audioName").val(file.name);
    alertAudio = file.webkitRelativePath;
}