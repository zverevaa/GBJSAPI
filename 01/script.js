const timetable = document.querySelector(".timetable");
window.onload = () => {
    renderTimetable();
};

async function fetchTimetable() {
    try {
        const response = await fetch("data.json");
        const result = await response.json();
        localStorage.setItem("subjects", JSON.stringify(result.subjects));
    } catch (error) {
        console.error(error);
    }
}

async function renderTimetable() {
    if (!localStorage.getItem("subjects")) {
        await fetchTimetable();
    }
    const timetableData = JSON.parse(localStorage.getItem("subjects"));
    timetableData.forEach((element) => {
        const node = document.createElement("div");
        node.classList = "row row-cols-6 text-center container";
        node.innerHTML = `<p class = "col">${element.subject}</p><p class = "col">${element.time}</p><p class="col max-students">${element.maxStudents}</p><p class="col current-students">${element.currentStudents}</p>`;
        const button = document.createElement("button");
        button.classList = "btn-success btn col";
        button.innerText = "Записаться";
        const undoBtn = document.createElement("button");
        undoBtn.classList = "btn-danger btn col";
        undoBtn.innerText = "Отменить запись";

        node.appendChild(button);
        node.appendChild(undoBtn);

        timetable.append(node);
    });
}
timetable.addEventListener("click", (el) => {
    el.preventDefault();
    let isDisabled = false;
    const timetableData = JSON.parse(localStorage.getItem("subjects"));
    const idx = [...timetable.children].indexOf(el.target.parentElement);
    if (el.target.classList[0] === "btn-success") {
        if (
            timetableData[idx].maxStudents > timetableData[idx].currentStudents
        ) {
            isDisabled = false;
            timetableData[idx] = {
                subject: timetableData[idx].subject,
                time: timetableData[idx].time,
                maxStudents: timetableData[idx].maxStudents,
                currentStudents: (timetableData[idx].currentStudents += 1),
            };
            localStorage.setItem("subjects", JSON.stringify(timetableData));
        } else {
            console.log("The class is full");
            isDisabled = true;
        }
    } else if (el.target.classList[0] === "btn-danger") {
        if (timetableData[idx].currentStudents > 0) {
            isDisabled = false;
            timetableData[idx] = {
                subject: timetableData[idx].subject,
                time: timetableData[idx].time,
                maxStudents: timetableData[idx].maxStudents,
                currentStudents: (timetableData[idx].currentStudents -= 1),
            };
            localStorage.setItem("subjects", JSON.stringify(timetableData));
        } else {
            isDisabled = true;
            return;
        }
    } else {
        return;
    }

    timetable.innerHTML = "";
    renderTimetable();
    if (isDisabled) {
        el.target.setAttribute("disabled", "disabled");
    }
});
