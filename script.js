let counter = 0;
const image = document.querySelector(".current-img");
const sliderImgs = [
    "./img/slider1.png",
    "./img/slider2.jpg",
    "./img/slider3.jpg",
];

const slider = document.querySelector(".slider");
const sliderCircles = document.querySelector(".slider-circles");

function createCircles() {
    for (let i = 0; i < sliderImgs.length; i++) {
        const node = document.createElement("div");
        node.classList.add("slider-circle");
        if (i === 0) {
            node.classList.add("slider-circle-chosen");
        }
        sliderCircles.appendChild(node);
    }
}
createCircles();

slider.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.className === "next-image") {
        if (counter < sliderImgs.length - 1) {
            counter++;
        } else {
            counter = 0;
        }
    } else if (e.target.className === "previous-image") {
        if (counter > 0) {
            counter--;
        } else {
            counter = sliderImgs.length - 1;
        }
    } else if (e.target.className === "slider-circle") {
        counter = [...sliderCircles.children].indexOf(e.target);
    }
    image.src = sliderImgs[counter];
    for (circle of sliderCircles.childNodes) {
        if (sliderCircles.childNodes[counter] === circle) {
            circle.classList.add("slider-circle-chosen");
        } else {
            circle.classList.remove("slider-circle-chosen");
        }
    }
});
