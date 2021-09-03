const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const help = {call: 1, hall: 1, fifty_fifty: 1}

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
    console.log('1 Вопрос для истинного разработчика javaScript!')

// if (label === 'yes') {
    quest()
// }
})

rl.on('line', (line) => {
    switch (line.trim()) {
        case ('help_hall' | 'help_call' | 'help_fifty') : {
            fn(line.trim());
        } break;

        case('a' | 'b' | 'c' | 'd') : {
            if (
                (questing === 4 && line.trim() === 'a') ||
                (questing === 1 && line.trim() === 'b') ||
                (questing === 2 && line.trim() === 'c') ||
                (questing === 3 || 5 && line.trim() === 'd')
            ) {
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
    }
    quest()
})

function fn(data) {
    if (help.hall > 0 && data === 'help_hall') {
        switch (questing) {
            case questing: {
                help.hall--;

            }break;
        }
    } else {
        console.log('У вас нет попыток');
    }

    if (help.call > 0 && data === 'help_call') {
        switch (questing) {
            case questing: {
                help.call--;

            }break;
        }
    } else {
        console.log('У вас нет попыток');
    }

    if (help.fifty_fifty > 0 && data === 'help_fifty') {
        switch (questing) {
            case questing: {
                help.fifty_fifty--;
                help_fifty();
            }break;
        }
    } else {
        console.log('У вас нет попыток')
    }
}

function quest() {
    console.log(`\n\
     (help_hall) помощь зала: ${help.hall};\n\
     (help_call) звонок другу: ${help.call};\n\
     (help_fifty) 50/50: ${help.fifty_fifty};\n`
    )

    rl.question(`${question[questing - 1].question} \n`, (data) => {
        if (questing === 6) {
            console.log('Конец!!! У нас в стране новый миллионер')
            console.log(result)
            rl.close()
        } else {
            console.log(question[questing - 1].answers);
        }
    })
}

function help_fifty() {
    switch (questing) {
        case 1 | 4: {
            delete question[questing--].answers.c
            delete question[questing--].answers.d
        } break;
        case 2: {
            delete question[questing--].answers.a
            delete question[questing--].answers.d
        } break;
        case 3 | 5: {
            delete question[questing--].answers.a
            delete question[questing--].answers.b
        } break;
    }
}

function help_call() {

}