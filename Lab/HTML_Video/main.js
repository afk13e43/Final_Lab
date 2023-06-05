var videocount = 0;
$(function () {
    $("#myaudio").attr("src", "Slow Tango - Andrew Huang.mp3");
    $("#next").on("click", function () {

        videocount = videocount + 1;
        if (videocount == 3) { videocount = 0; }
        if (videocount == 0) {
            $("#myVideo").attr("src", "sample-mp4-file.mp4");
        }
        else if (videocount == 1) {
            $("#myVideo").attr("src", "DDD.mp4");
        }
        else if (videocount == 2) {
            $("#myVideo").attr("src", "pizzatime.mp4");
        }
        if ($("#myVideo")[0].play) {
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
        $("#speed").text($("#myVideo")[0].playbackRate);
    });
    $("#audio").on("click", function () {

        if ($("#myaudio")[0].paused) {
            $("#myaudio")[0].play();
             $("#audio").text("audio play"); }

        else if ($("#myaudio")[0].play) {
            $("#audio").text("audio pause");
            $("#myaudio")[0].pause();
         }
    });
    if (videocount == 0) {
        $("#myVideo").attr("src", "sample-mp4-file.mp4");
    }
    else if (videocount == 1) {
        $("#myVideo").attr("src", "DDD.mp4");
    }
    else if (videocount == 2) {
        $("#myVideo").attr("src", "pizzatime.mp4");
    }
    $("#playBtn").on("click", function () {
        $("#volumeDisplay").text(
            $("#myVideo")[0].volume.toFixed(2));
        $("#progressBar")[0].max = $("#myVideo")[0].duration;
        if ($("#myVideo")[0].paused) {
            $("#myVideo")[0].play();

            $("#playBtn").text("Pause");
        } else {
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
    }); $("#fullBtn").on("click", function () {
        $("#myVideo")[0].webkitEnterFullscreen();
    }); $("#lowerVolumeBtn").on("click", downVolume);
    $("#higherVolumeBtn").on("click", upVolume);
    $("#myVideo").on("timeupdate", updateProgress);
    $("#progressBar").on("change", changeProgress);
    $("#fastBtn").on("click", function () {
        $("#myVideo")[0].playbackRate = $("#myVideo")[0].playbackRate + 0.25;
        $("#speed").text($("#myVideo")[0].playbackRate);
    });
    $("#slowBtn").on("click", function () {
        $("#myVideo")[0].playbackRate = $("#myVideo")[0].playbackRate - 0.25;
        $("#speed").text($("#myVideo")[0].playbackRate);
    });
});
function downVolume() {
    varmyVideo = $("#myVideo")[0];
    if (myVideo.volume == 0) { } else if (myVideo.volume < 0.1) {
        myVideo.volume = 0;
    } else {
        myVideo.volume = myVideo.volume - 0.1;
    } volumeDisplay.innerHTML = myVideo.volume.toFixed(2);
} function upVolume() {
    varmyVideo = $("#myVideo")[0];
    if (myVideo.volume == 1) { } else if (myVideo.volume > 0.9) { myVideo.volume = 1; } else {
        myVideo.volume = myVideo.volume + 0.1;
    } volumeDisplay.innerHTML = myVideo.volume.toFixed(2);
}
function updateProgress() {
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));
    $("#timeDisplay").append(`/${Math.floor($("#myVideo")[0].duration)}秒`)
        ; $("#progressBar")[0].value = $("#myVideo")[0].currentTime;
}
function changeProgress() { $("#myVideo")[0].currentTime = $("#progressBar")[0].value; }
