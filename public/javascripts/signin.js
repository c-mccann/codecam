$(document).ready(function () {
    $("#sign-in-button").click(function () {


        var signInPopup = $('#sign-in-popup');


        if (signInPopup.is(':visible')) {
            signInPopup.hide();
        } else {
            signInPopup.show();
        }

    });
});

