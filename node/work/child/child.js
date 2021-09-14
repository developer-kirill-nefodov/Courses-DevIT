// 1. В отдельном процессе (на ваш выбор), вывести эту страницу(views код):
// https://ru.wikipedia.org/wiki/%D0%9C%D0%BD%D0%BE%D0%B3%D0%BE%D0%BB%D0%B5%D1%82%D0%BD%D0%B8%D0%B5_%D1%81%D0%B5%D1%80%D0%B8%D0%B8_%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D0%BC%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D1%85_%D0%BC%D0%B0%D1%80%D0%BE%D0%BA_%D0%A1%D0%A1%D0%A1%D0%A0 в консоль, в конце показать количество чанков.

const {spawn} = require('child_process');

function calculateChunk(url, displayData) {
    const child = spawn('curl', [url]);

    let counterChunk = 0;

    child.stdout.on('data', (data) => {
        if(displayData)
            console.log(data.toString());
        counterChunk++;
    })

    child.on('close', (code) => {
        if(code !== 0)
            throw new Error(code);
        else
            console.log(counterChunk);
    })
}

// calculateChunk('https://ru.wikipedia.org/wiki/%D0%9C%D0%BD%D0%BE%D0%B3%D0%BE%D0%BB%D0%B5%D1%82%D0%BD%D0%B8%D0%B5_%D1%81%D0%B5%D1%80%D0%B8%D0%B8_%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D0%BC%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D1%85_%D0%BC%D0%B0%D1%80%D0%BE%D0%BA_%D0%A1%D0%A1%D0%A1%D0%A0', true)

//2. Запустить процесс через fork(), отправить в него строку: "42jk&43j?djASP-00034u*%K:lj2@#)(*" , отфильтровать и вернуть только спец символы в родительский процесс, который выведет в консоль.

if (process.argv[2] === 'child') {
    process.on('message', (m) => {

        process.send(m.match(/\W/g).join(''))

        process.disconnect()
    })
} else {
    const { fork } = require('child_process');

    const child = fork(__filename, ['child']);

    child.send("42jk&43j?djASP-00034u*%K:lj2@#)(*")

    child.on('message', (m) => console.log(m));
}