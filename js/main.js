const speedPoints = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "5"];

// Кнопки переключения скорости
let buttons = document.createElement("main");
buttons.className = "ryletd__buttons";

// Показатель текущей скорости видео
const currentSpeed = document.createElement("div");
currentSpeed.className = "ryletd__currentspeed";
currentSpeed.innerHTML = "1";

speedPoints.map(
    (point) =>
        (buttons.innerHTML += `<button class="ryletd__button">${point}</button>`)
);

document.body.prepend(buttons);
document.body.prepend(currentSpeed);

const ryletdBtns = document.querySelectorAll(".ryletd__button");
let speed = 1;

document.querySelectorAll(".ryletd__button").forEach((btn) => {
    btn.addEventListener("click", ({ target }) => {
        // Удаление класса ryletd__active у всех кнопок
        ryletdBtns.forEach((item) => item.classList.remove("ryletd__active"));

        btn.classList.add("ryletd__active");
        speed = target.outerText;
        currentSpeed.innerHTML = speed;
        document
            .querySelectorAll("video")
            .forEach((video) => (video.playbackRate = target.outerText));
    });
});

// Autochange video speed when video changed
const observer = new MutationObserver((e) => {
    e.forEach(({ target }) => {
        if (target.id === "movie_player")
            target.querySelector("video").playbackRate = speed;
    });
});
observer.observe(document, {
    childList: true,
    subtree: true,
});

// Choose the best quality on backquote key
const setBestQuality = () => {
    setTimeout(() => {
        document.querySelector(".ytp-button.ytp-settings-button").click();
    }, 0);

    const items = document
        .querySelector(".ytp-panel-menu")
        .querySelectorAll(".ytp-menuitem");

    items[items.length - 1].click();

    document
        .querySelector(".ytp-panel-menu")
        .querySelector(".ytp-menuitem")
        .click();
    setTimeout(() => document.body.click(), 0);
};

buttons.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    setBestQuality();
});

buttons.addEventListener("wheel", (e) => {
    e.preventDefault();
    ryletdBtns.forEach((item) => item.classList.remove("ryletd__active"));

    document.querySelectorAll("video").forEach((video) => {
        if (video && e.deltaY > 0) {
            const videoSpeed = video.playbackRate;
            video.playbackRate = (videoSpeed - 0.1).toFixed(1);
            speed = video.playbackRate;
            currentSpeed.innerHTML = speed;
        } else {
            const videoSpeed = video.playbackRate;
            video.playbackRate = (videoSpeed + 0.1).toFixed(1);
            speed = video.playbackRate;
            currentSpeed.innerHTML = speed;
        }
    });
});
