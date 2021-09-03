const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const help = {call: 1, hall: 1, fifty_fifty: 1}

<<<<<<< HEAD
const question = [
    {
        winning: 10000,
        question: 'Какой термин больше подходит к объяснению --Солнца--',
        answers: {
            a: 'одна из звёзд нашей Галактики',
            b: 'object',
            c: 'обыкновенная гигантская планета',
            d: 'большая водородная масса'
        }
    },
    {
        winning: 50000,
        question: 'У блогера было загружено 26 видео. Все кроме последних 19 видео удалили модераторы. Сколько видео осталось?',
        answers: {
            a: '26',
            b: '7',
            c: '19',
            d: '16'
        }
    },
    {
        winning: 200000,
        question: `Если 1+1=10, то сколько будет 1+10?`,
        answers: {
            a: '101',
            b: '110',
            c: '100',
            d: '11'
        }
    },
    {
        winning: 340000,
        question: 'У вас было 5 яблок, 2 яблока вы положили к себе в карман, а одним\n яблоком угостили друга. Сколько яблок у вас осталось?',
        answers: {
            a: '4',
            b: '2',
            c: '3',
            d: '5'
        }
    },
    {
        winning: 500000,
        question: 'В междугороднем автобусе 54 места для пассажиров, каждый второй\n пассажир сдал 1 сумку в багаж. Сколько сумок в багаже, если каждое третье место в автобусе пустое?',
        answers: {
            a: '54',
            b: '27',
            c: '36',
            d: '18'
        }
    }
];

const result = {winning: 0, correct_answers: 0, wrong_answers: 0};

let questing = 1;

rl.question('Хотите стать миллионером?\n', (label) => {
    console.clear();
    console.log('Вопросы для истинного разработчика javaScript!')

    // if (label === 'yes') {
    quest()
=======
let questing = 1;

const question = [
    {
        winning: 1000,
        question: 'who-1',
        answers: {a: '', b: '', c: '', d: ''}
    },
    {
        winning: 5000,
        question: 'who-2',
        answers: {a: '', b: '', c: '', d: ''}
    },
    {
        winning: 20000,
        question: '',
        answers: {a: '', b: '', c: '', d: ''}
    },
    {
        winning: 74000,
        question: '',
        answers: {a: '', b: '', c: '', d: ''}
    },
    {
        winning: 900000,
        question: '',
        answers: {a: '', b: '', c: '', d: ''}
    }
];


const result = {winning: 0, correct_answers: 0, wrong_answers: 0};


rl.question('Хотите стать миллионером?\n', (label) => {
    // if (label === 'yes') {
        quest()
>>>>>>> 15e25d637fe8455a3d8149b6c55ad49f4cc90499
    // } else {
    //     rl.close()
    // }
});

function quest() {
<<<<<<< HEAD
    console.log(`\n\
     (help_hall) помощь зала: ${help.hall};\n\
     (help_call) звонок другу: ${help.call};\n\
       (help_fifty) 50_50: ${help.fifty_fifty};\n`
    )

    rl.question(`${question[questing - 1].question} \n`, (data) => {
        if (questing === 6) {
            console.log('Конец!!! У нас в стране новый миллионер')
            console.log(result)
        } else {
            console.log(question[questing - 1].answers);
        }
    })

}

rl.on('line', (line) => {
    switch (line.trim()) {

        case ('help_hall') : {
            fn();
            return
        }

        case ('help_call') : {

        }
            break;

        case ('help_fifty') : {
            fn('help_fifty');
            return;
        }

        case('a') : {
            if (questing === 4) {
                console.clear();
                result.winning += question[questing - 1].winning;
                result.correct_answers++

                console.log('Это правельный ответ', result);
                questing++;
            } else {
                result.wrong_answers++;
                rl.close();
                return;
            }
        }break;

        case('b') : {
            if (questing === 1) {
                console.clear();
                result.winning += question[questing - 1].winning;
                result.correct_answers++

                console.log('Это правельный ответ', result);
                questing++;
            } else {
                result.wrong_answers++;
                rl.close();
                return;
            }
        }break;

        case('c') : {
            if (questing === 2) {
                console.clear();
                result.winning += question[questing - 1].winning;
                result.correct_answers++

                console.log('Это правельный ответ', result);
                questing++;
            } else {
                result.wrong_answers++;
                rl.close();
                return;
            }
        }break;

        case('d') : {
            if (questing === 5 || 3) {
                console.clear();
                result.winning += question[questing - 1].winning;
                result.correct_answers++

                console.log('Это правельный ответ', result);
                questing++;
            } else {
                result.wrong_answers++;
                rl.close();
                return;
            }
        }break;

        default: {
            console.log(result);
            rl.close();
            return;
        }
=======
    console.log(`\n (help_hall) помощь зала: ${help.hall};\n (help_call) звонок другу: ${help.call};\n (help_fifty) 50_50: ${help.fifty_fifty};\n`)

    rl.question(`question_${questing} \n`, (data) => {

        console.log(data)

        if (questing < 6) {
                // process.stdout.write(question[questing - 1].question);
                // process.stdout.write(question[questing - 1].answers);
                questing++;
            } else {
            console.log(123)
        }

    })

}

rl.on('line', (line) => {
    console.log(line)
    switch (line.toString()) {

        case('a') : {
            if (questing === 1) {
                process.stdout.write('victory')
            } else rl.close()
        }
            break;

        case('b') : {
            if (questing === 3) {
                process.stdout.write('victory')
            } else rl.close()
        }
            break;

        case('c') : {
            if (questing === 2) {
                process.stdout.write('victory')
            } else rl.close()
        }
            break;

        case('d') : {
            if (questing === 4) {
                process.stdout.write('victory')
            } else rl.close()
        }
            break;

        default: rl.close()
>>>>>>> 15e25d637fe8455a3d8149b6c55ad49f4cc90499
    }
    quest()
})

<<<<<<< HEAD

function fn(data) {
    switch (data) {
        case (data === 'help_hall'): {
            if (help.hall > 0) {

            }
        }
            break;
        case (data === 'help_call'): {
            if (help.call > 0) {

            }
        }
            break;
        case (data === 'help_fifty'): {
            if (help.fifty_fifty > 0) {
                switch (questing) {
                    case 1: {
                        help.fifty_fifty--;
                        delete question[0].answers.c
                        delete question[0].answers.d
                        quest()
                    }
                }
            } else {
                console.log('У вас нет попыток')
            }
        }
            break;
    }
}
=======
rl.on('close', ()=> {
    console.log(result)
})
>>>>>>> 15e25d637fe8455a3d8149b6c55ad49f4cc90499
