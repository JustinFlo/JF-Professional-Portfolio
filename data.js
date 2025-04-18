import { titles } from "./images.js";

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(CustomEase)
    CustomEase.create("hop", 
        "M0,0,C0.071,0.505,0.192,0.726,0.318, 0.852, 0.45, 0.984, 0.504, 1 1,1");

    const sliderNav = document.querySelector(".slider-nav");
    const sliderContainer = document.querySelector(".sliders");
    const bgOverlay = document.querySelector(".bg-overlay");
    const slideTitle = document.querySelector(".slide-title");
    const numberOfItems = 30;
    let currentIndex = 0;
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function updateTitle(newIndex, color){
        const title = titles[newIndex];
        const titleRows = slideTitle.querySelectorAll(".slide-title-row");

        titleRows.forEach((row, rowIndex) => {
            row.querySelectorAll(".letter").forEach((letter, letterIndex) => {
               const existingSpan = letter.querySelector("span");
               if (existingSpan) {
                   letter.removeChild(existingSpan);
               }

                const newSpan = document.createElement("span");
                const direction = newIndex > currentIndex ? 150 : -150;
                gsap.set(newSpan, {
                    x: direction,
                    color: color,
                })

                newSpan.textContent = title[rowIndex][letterIndex] || "";
                letter.appendChild(newSpan);
                gsap.to(newSpan, {
                    x: 0,
                    duration: 1,
                    ease: "hop",
                    delay: 0.125,
                })
            });
    });
}

for (let i = 0; i < numberOfItems; i++) {
        const item = document.createElement("div");
        item.classList.add("nav-item-wrapper");
        if (i === 0) {
            item.classList.add("active");
        }

        const navItem = document.createElement("div");
        navItem.classList.add("nav-item");

        item.appendChild(navItem);
        sliderNav.appendChild(item);  //slider should have appeared by here
    
    item.addEventListener("click", () => {
        if(i == currentIndex){
            return;
        }

        document.querySelectorAll(".nav-item-wrapper").forEach((nav) => nav.classList.remove("active"));

        item.classList.add("active");

        const translateXValue = -i * 100;
        gsap.to(sliderContainer, {
            x: `${translateXValue}vw`,
            duration: 1.5,
            ease: "hop",
        });

        const newColor = getRandomColor();
        gsap.to(bgOverlay, {
            backgroundColor: newColor,
            duration: 1.5,
            ease: "hop",
        });

        updateTitle(i, newColor);
        currentIndex = i;
    })

    const slide = document.createElement("div");
    slide.classList.add("slide");
    if (i === 0) {
        slide.classList.add("active");
    }
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img");

    const img = document.createElement("img");
    img.src = `./assets/img${i + 1}.png`;
    img.alt = "";

    imgWrapper.appendChild(img);
    slide.appendChild(imgWrapper);
    slidesContainer.appendChild(slide);

    //12:13
}
    updateTitle(0, getComputedStyle(bgOverlay).backgroundColor)
});