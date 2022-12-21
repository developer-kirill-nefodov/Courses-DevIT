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
    winning: 140000,
    question: `Если 1+1=10, то сколько будет 1+10?`,
    answers: {
      a: '101',
      b: '110',
      c: '100',
      d: '11'
    }
  },
  {
    winning: 300000,
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
  console.log('1 Вопрос для истинного разработчика JavaScript!')

  if (label === 'yes') {
    quest();
  }
})

rl.on('line', (line) => {
  if (
    line.trim() === 'help_hall' ||
    line.trim() === 'help_call' ||
    line.trim() === 'help_fifty'
  ) {
    fn(line.trim())
    return;
  }

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
  quest()
})

function quest() {
  console.log(`\n\
     (help_hall) помощь зала: ${help.hall};\n\
     (help_call) звонок другу: ${help.call};\n\
     (help_fifty) 50/50: ${help.fifty_fifty};\n`
  )

  if (questing === 6) {
    console.log('Конец!!! У нас в стране новый миллионер')
    console.log(result)
    rl.close();
    return;
  }

  rl.question(`${question[questing - 1].question} \n`, (data) => {
    console.log(question[questing - 1].answers);
  })
}

function fn(data) {
  if (data === 'help_hall') {
    if (help.hall > 0) {
      help.hall--;
      help_hall();
    } else console.log('У вас нет попыток');
  }

  if (data === 'help_call') {
    if (help.call > 0) {
      help.call--;
      help_call();
    } else console.log('У вас нет попыток');
  }

  if (data === 'help_fifty') {
    if (help.fifty_fifty > 0) {
      help.fifty_fifty--;
      help_fifty();
    } else console.log('У вас нет попыток')
  }
  quest();
}

function help_fifty() {
  switch (questing) {
    case 1 | 4: {
      delete question[questing - 1].answers.c
      delete question[questing - 1].answers.d
    }
      break;
    case 2: {
      delete question[questing - 1].answers.a
      delete question[questing - 1].answers.d
    }
      break;
    case 3 | 5: {
      delete question[questing - 1].answers.a
      delete question[questing - 1].answers.b
    }
      break;
  }
}

function help_call() {
  console.clear();
  let xxx = 0;
  const arrCall = ['Привет!!!', ' что', ' случилось???', ' Понял', ' думаю', ' правельный', ' ответ', ' .', '.', '.', '.', '. ']
  const call = setInterval(() => {
    process.stdout.write(arrCall[xxx])
    if (xxx === arrCall.length - 1) {
      switch (questing) {
        case 1: {
          process.stdout.write('b');
          clearInterval(call);
        }
          break;
        case 2: {
          process.stdout.write('c');
          clearInterval(call);
        }
          break;
        case 3 | 5: {
          process.stdout.write('d');
          clearInterval(call);
        }
          break;
        case 4: {
          process.stdout.write('a');
          clearInterval(call);
        }
          break;
      }
    } else xxx++;
  }, 700)
}

function help_hall() {
  switch (questing) {
    case 1: {
      process.stdout.write('\nb - 60% \na - 20% \nc - 10%\nd - 10% \n')
    }
      break;
    case 2: {
      process.stdout.write('\nc - 99% \na - 0.5% \nb - 0.3%\nd - 0.2% \n')
    }
      break;
    case 3 | 5: {
      process.stdout.write('\nd - 49.9% \na - 20.1% \nc - 17%\nb - 13% \n')
    }
      break;
    case 4: {
      process.stdout.write('\na - 34% \nb - 33% \nc - 32%\nd - 1% \n')
    }
      break;
  }
}
