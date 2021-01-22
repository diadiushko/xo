const field = document.querySelector(".field");
const fieldChunks = document.querySelectorAll(".field_chunk");
const clearBtn = document.querySelector(".clear_btn");
const finalMsg = document.querySelector(".end_msg");

// const row = Math.sqrt(fieldChunks.length);
const winPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const fieldCleaner = () => {
    fieldChunks.forEach((e) => {
        if (e.hasChildNodes()) {
            e.firstChild.remove();
        }
    });
};

const xoArray = [`/img/close.svg`, `/img/circle.svg`];
let step = 0;
const xoListener = (event) => {
    let target = event.target;
    if (target !== field && !target.hasChildNodes())
        target.insertAdjacentHTML(
            "afterbegin",
            `<img src=${xoArray[step]} alt="">`
        );
    step = step ? 0 : 1;
    winPos.forEach((pos) => {
        if (
            [...pos].every(
                (ele, _, arr) =>
                fieldChunks[ele].innerHTML === fieldChunks[arr[0]].innerHTML &&
                fieldChunks[arr[0]].hasChildNodes()
            )
        ) {
            finalMsg.firstElementChild.innerHTML = `Player&nbsp;${step === 1? 1 : 2}&nbsp;wins!`;
            finalMsg.classList.add("active");
            setTimeout(() => {
                finalMsg.classList.remove("active");
                fieldCleaner();
            }, 5000);
            step = 0;
        }
    });
};

field.addEventListener("click", xoListener);

clearBtn.addEventListener("click", fieldCleaner);