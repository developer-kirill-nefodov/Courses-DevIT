class Store {
  clients = [];

  addClients(obj) {
    this.clients.push(obj)
  }

  getClients() {
    return this.clients;
  }

  deleteClient(name) {
    const idx = this.clients.map(e => e.username).indexOf(name);
    this.clients.splice(idx, 1)
  }

  result = true;

  upDateRes() {
    this.result = !this.result;
  }

  getRes() {
    return this.result;
  }

  answer = '';

  upDateAnswer(answer) {
    this.answer = answer;
  }

  getAnswer() {
    return this.answer
  }

  minClient = 2;

  upDateMinClient(number) {
    this.minClient = +number;
  }

  getMinClient() {
    return this.minClient
  }

  question = true;

  upDateQuest() {
    this.question = !this.question;
  }

  getQuest() {
    return this.question
  }
}

const store = new Store();

module.exports = store;
