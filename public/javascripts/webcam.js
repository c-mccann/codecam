// https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.oGetUserMedia;

if (navigator.getUserMedia) {
    // navigator.getUserMedia({video: true, audio: false}, handleVideo, videoError);
    navigator.getUserMedia({video: true, audio: true}, function (stream) {
        var Peer = require('simple-peer');

        var peer = new Peer({
            initiator: window.location.hash === '#init',
            trickle: false,
            stream: stream
        });

        peer.on('signal', function (data) {
            document.getElementById('yourId').value = JSON.stringify(data);

        });

        document.getElementById('connect').addEventListener('click', function () {
            var otherId = JSON.parse(document.getElementById('otherId').value);
            peer.signal(otherId);
        });


        peer.on('stream', function (stream) {
            var yourWebcam = document.getElementById('your-webcam');
            yourWebcam.src = window.URL.createObjectURL(stream);
        });

        var myWebcam = document.getElementById("my-webcam");
        myWebcam.src = window.URL.createObjectURL(stream);
        myWebcam.muted = true;

    }, function () {
        console.error(e);
    });   // causes audio feedback
}
