document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track");
    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }

    window.onmousemove = e => {
        if(track.dataset.mouseDownAt === "0") return;
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage,
            boundedNextPer = Math.max(-100, Math.min(0, nextPercentage));

        track.dataset.percentage = nextPercentage;

        track.animate({
            transform: `translate(${boundedNextPer}%, -50%)`
        }, { duration: 3000, fill:"forwards"});

        for(const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${nextPercentage + 100}% 50%`
            }, { duration: 3000, fill: "forwards"});
        }
    }

    window.onmouseup = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
    }
});
