/* ==================================================
   PAGE SYSTEM
================================================== */

let currentPage = 1;

let envelopeOpened = false;

let envelopeTimer = null;



/* ==================================================
   PAGE NAVIGATION
================================================== */

function updateBackButton() {

    const backButton =
        document.getElementById(
            "backButton"
        );


    if (!backButton) {
        return;
    }


    backButton.classList.toggle(
        "visible",
        currentPage > 1
    );

}


function resetEnvelopeState() {

    const envelope =
        document.getElementById(
            "envelope"
        );


    if (envelopeTimer) {
        clearTimeout(envelopeTimer);
        envelopeTimer = null;
    }


    if (!envelope) {
        return;
    }


    envelopeOpened = false;

    envelope.classList.remove(
        "open"
    );

}


function goToPage(pageNumber) {

    const current =
        document.getElementById(
            "page" + currentPage
        );


    const next =
        document.getElementById(
            "page" + pageNumber
        );


    if (!next) {
        return;
    }


    if (current) {

        current.classList.remove(
            "active"
        );

    }


    next.classList.add(
        "active"
    );


    if (pageNumber === 3) {
        resetEnvelopeState();
    }


    currentPage =
        pageNumber;


    updateBackButton();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function goBack() {

    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }

}



/* ==================================================
   NO BUTTON
================================================== */

function showReaction(type) {

    const pictures =
        document.getElementById(
            "surroundingPictures"
        );

    const text =
        document.getElementById(
            "surroundingText"
        );

    const message =
        document.getElementById(
            "no-message"
        );


    if (!pictures || !text) {
        return;
    }


    const happyImages = [
        "HAPPY.jpeg",
        "HAPPY 1.jpeg",
        "HAPPY 2.jpeg"
    ];

    const noImages = [
        "PLS (1).jpeg",
        "PLS (4).jpeg",
        "PLS (5).jpeg",
        "PLS (7).jpeg",
        "PLS (8).jpeg"
    ];

    const selectedImages =
        type === "happy"
            ? happyImages
            : noImages;


    const items =
        pictures.querySelectorAll(
            ".surrounding-item"
        );


    items.forEach(function (item, index) {
        const imageName = selectedImages[index];

        item.hidden = !imageName;

        if (imageName) {
            item.src = imageName;
        }
    });


    pictures.classList.toggle(
        "happy-reaction",
        type === "happy"
    );


    text.textContent =
        type === "happy"
            ? "Yayyy! I love you ♡"
            : "Plsss ♡";


    pictures.classList.remove(
        "hidden"
    );

    pictures.classList.add(
        "visible"
    );


    if (message) {
        message.textContent =
            type === "happy"
                ? "Yay! ♡"
                : "Nice try... ♡";
    }


    setTimeout(
        function () {

            if (message) {
                message.textContent =
                    "";
            }

            pictures.classList.remove(
                "visible"
            );

            pictures.classList.add(
                "hidden"
            );

        },
        1800
    );

}


function showHappyReaction() {
    showReaction("happy");
}


function showNoMessage() {
    showReaction("no");
}



/* ==================================================
   PASSCODE
================================================== */

function checkPasscode() {

    const input =
        document.getElementById(
            "passcode"
        );


    const error =
        document.getElementById(
            "pass-error"
        );


    if (!input || !error) {
        return;
    }


    /*
        CHANGE YOUR PIN HERE
    */

    const correctPassword =
        "041226";


    if (
        input.value ===
        correctPassword
    ) {

        error.textContent =
            "";


        input.value =
            "";


        goToPage(3);

    }

    else {

        error.textContent =
            "Not quite... try again ♡";


        input.value =
            "";


        input.focus();

    }

}



/* ==================================================
   ENTER KEY
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const input =
            document.getElementById(
                "passcode"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    checkPasscode();

                }

            }
        );

    }
);



/* ==================================================
   ENVELOPE
================================================== */

function openEnvelope() {

    const envelope =
        document.getElementById(
            "envelope"
        );


    if (!envelope) {
        return;
    }


    if (envelopeOpened) {
        return;
    }


    if (envelopeOpened) {
        return;
    }


    envelopeOpened =
        true;


    envelope.classList.add(
        "open"
    );


    if (envelopeTimer) {
        clearTimeout(envelopeTimer);
    }


    envelopeTimer =
        setTimeout(
            function () {

                goToPage(4);

            },
            1500
        );

}



/* ==================================================
   SECRET MESSAGE
================================================== */

function revealSecret() {

    const message =
        document.getElementById(
            "secretMessage"
        );


    const heart =
        document.getElementById(
            "secretHeart"
        );


    if (!message || !heart) {
        return;
    }


    message.classList.toggle(
        "show"
    );


    if (
        message.classList.contains(
            "show"
        )
    ) {

        heart.textContent =
            "♥";

    }

    else {

        heart.textContent =
            "♡";

    }

}



/* ==================================================
   MUSIC
================================================== */

const music =
    document.getElementById(
        "music"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


const musicDisc =
    document.getElementById(
        "musicDisc"
    );



function tryStartMusic() {

    if (!music) {
        return;
    }


    music.volume = 0.35;

    music.play()
        .then(
            function () {

                if (musicButton) {
                    musicButton.textContent = "❚❚";
                }

                if (musicDisc) {
                    musicDisc.classList.add("playing");
                }

            }
        )
        .catch(
            function () {

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            }
        );

}


function toggleMusic() {

    if (!music) {
        return;
    }


    if (
        music.paused
    ) {

        tryStartMusic();

    }

    else {

        music.pause();


        if (musicButton) {

            musicButton.textContent =
                "▶";

        }


        if (musicDisc) {

            musicDisc.classList.remove(
                "playing"
            );

        }

    }

}



/* ==================================================
   MUSIC ERROR
================================================== */

if (music) {

    music.addEventListener(
        "error",
        function () {

            if (musicButton) {

                musicButton.textContent =
                    "♫";

                musicButton.title =
                    "Add music/song.mp3";

            }

        }
    );


    music.addEventListener(
        "ended",
        function () {

            if (musicButton) {

                musicButton.textContent =
                    "▶";

            }


            if (musicDisc) {

                musicDisc.classList.remove(
                    "playing"
                );

            }

        }
    );

}



/* ==================================================
   INITIALIZE
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const pages =
            document.querySelectorAll(
                ".page"
            );


        pages.forEach(
            function (page) {

                page.classList.remove(
                    "active"
                );

            }
        );


        const firstPage =
            document.getElementById(
                "page1"
            );


        if (firstPage) {

            firstPage.classList.add(
                "active"
            );

        }

        if (music) {
            music.volume = 0.35;
            tryStartMusic();
        }

        document.addEventListener(
            "pointerdown",
            tryStartMusic,
            { once: true }
        );

        document.addEventListener(
            "touchstart",
            tryStartMusic,
            { once: true }
        );

        updateBackButton();

    }
);