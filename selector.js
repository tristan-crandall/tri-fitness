const list1 = ["Deadlifts", "Squats", "Bench Press", "Pull-Ups", "Overhead Press", "Bent Over Rows"];
const list2 = ["2M Bike Ride", "Parkour for 20m", "Rowing for 20m"];
const list3 = ["Pushups X 10 (X3)", "Situps X 10 (X3)", "Box Jump X 5 (X5)", "Plank for 1m", "Burpees X 10", "Mountain Climbers X 20"];

const points = {
    "Deadlifts": 35,
    "Squats": 15,
    "Bench Press": 20,
    "Pull-Ups": 25,
    "Overhead Press": 20,
    "Bent Over Rows": 30,
    "2M Bike Ride": 75,
    "Parkour for 20m": 70,
    // "5K Run": 80,
    "Rowing for 20m": 65,
    "Pushups X 10 (X3)": 10,
    "Situps X 10 (X3)": 10,
    "Box Jump X 5 (X5)": 10,
    "Plank for 1m": 5,
    "Burpees X 10": 15,
    "Mountain Climbers X 20": 10
};

let canGoAgain = true;

let lightMode = true;

function getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function getPoints(item) {
    return points[item];
}

function cycleText(element, list, duration) {
    const interval = 100; // Interval between changes in milliseconds
    const endTime = Date.now() + duration;
    const intervalId = setInterval(() => {
        element.innerText = getRandomItem(list);
        if (Date.now() >= endTime) {
            clearInterval(intervalId);
        }
    }, interval);
    return new Promise(resolve => setTimeout(resolve, duration));
}

document.getElementById("generateButton").addEventListener("click", async () => {
    if (!canGoAgain) {
        return;
    }
    canGoAgain = false;
    let item1, item2, item3, totalPoints;
    
    document.getElementById("generateButton").classList.add("bounce");

    setTimeout(() => {
        document.getElementById("generateButton").classList.remove("bounce");
    }, 700);

    const textItem1 = document.getElementById("textItem1");
    const textItem2 = document.getElementById("textItem2");
    const textItem3 = document.getElementById("textItem3");
    const textItem4 = document.getElementById("textItem4");

    await Promise.all([
        cycleText(textItem1, list1, 1000),
        cycleText(textItem2, list2, 1000),
        cycleText(textItem3, list3, 1000)
    ]);

    do {
        item1 = getRandomItem(list1);
        item2 = getRandomItem(list2);
        item3 = getRandomItem(list3);
        totalPoints = getPoints(item1) + getPoints(item2) + getPoints(item3);
    } while (totalPoints < 90 || totalPoints > 100);

    textItem1.innerText = "Strength: " + item1;
    textItem2.innerText = "Endurance: " + item2;
    textItem3.innerText = "Filler: " + item3;
    textItem4.innerText = "Energy Points Spent: " + totalPoints;

    textItem1.classList.add("bounce");
    textItem2.classList.add("bounce");
    textItem3.classList.add("bounce");
    textItem4.classList.add("bounce");

    setTimeout(() => {
        textItem1.classList.remove("bounce");
        textItem2.classList.remove("bounce");
        textItem3.classList.remove("bounce");
        textItem4.classList.remove("bounce");
    }, 700);
    setTimeout(() => {
       canGoAgain = true;
    }, 3000);
});

document.getElementById("darkMode").addEventListener("click", () => {
    lightMode = !lightMode;
    if (lightMode) {
        document.getElementById("darkMode").innerText = "Dark Mode";
    } else {
        document.getElementById("darkMode").innerText = "Light Mode";
    }
    document.body.classList.toggle("dark-mode");
});
