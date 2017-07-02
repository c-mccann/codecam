$(document).ready(function () {
    $("#show-hide-handshake-div").click(function () {


        var handshakeDiv = $('#handshake-div');


        if (handshakeDiv.is(':visible')) {
            handshakeDiv.hide();
        } else {
            handshakeDiv.show();
        }

    });
});

