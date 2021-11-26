const speedPoints = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "5"];

// Кнопки переключения скорости
let buttons = document.createElement("main");
buttons.className = "ryletd__buttons";

speedPoints.map(
    (point) =>
        (buttons.innerHTML += `<button class="ryletd__button">${point}</button>`)
);

document.body.prepend(buttons);

const ryletdBtns = document.querySelectorAll(".ryletd__button");

document.querySelectorAll(".ryletd__button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // Удаление класса ryletd__active у всех кнопок
        ryletdBtns.forEach((item) => item.classList.remove("ryletd__active"));

        btn.classList.add("ryletd__active");
        document.querySelector("video").playbackRate = e.target.outerText;
    });
});

// Choose the best quality on backquote key
document.body.addEventListener("keydown", (e) => {
    if (e.keyCode === 192) {
        setTimeout(() => {
            document.querySelector(".ytp-button.ytp-settings-button").click();
        }, 0);

        const items = document
            .querySelector(".ytp-panel-menu")
            .querySelectorAll(".ytp-menuitem");

        items[--items.length].click();

        document
            .querySelector(".ytp-panel-menu")
            .querySelector(".ytp-menuitem")
            .click();
        setTimeout(() => document.body.click(), 0);
    }
});
