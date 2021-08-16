/** Test-1 **/
function getDay() {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    return days[new Date().getDay()];
}

// console.log(getDay())//Четверг

/** Test-2 **/
function getSeconds() {
    let now = new Date();

    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = tomorrow - now;

    return Math.round(diff / 1000);
}

// console.log(getSeconds())//58341

/** Test-3 **/
function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

console.log(getLastDayOfMonth(2021, 7)) //31