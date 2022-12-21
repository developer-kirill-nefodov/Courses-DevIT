function methods(method, arr = [], ...data) {
  const DATA = {method: method, userArr: arr};

  switch (method) {
    case 'messageUser': {
      DATA.data = {mess: data[0]}
      return DATA;
    }
    case 'upUser': {
      return DATA;
    }
    case 'upDateUsers': {
      return DATA;
    }
    case 'question': {
      DATA.data = {mess: data[0]}
      return DATA;
    }
    case 'time': {
      DATA.data = {time: Math.round(new Date().getTime() / 1000 + +data[0])}
      return DATA;
    }
    case 'createUser': {
      DATA.data = {mess: data[0], trueAnswer: 0, idx: data[1]}
      return DATA;
    }
    case 'wining': {
      DATA.data = {mess: data[0]}
      return DATA;
    }
  }
}

module.exports = methods;
