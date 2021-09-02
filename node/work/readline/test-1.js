const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const help = {call: 1, hall: 1, fifty_fifty: 1}

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
    // } else {
    //     rl.close()
    // }
});

function quest() {
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
    }
    quest()
})

rl.on('close', ()=> {
    console.log(result)
})