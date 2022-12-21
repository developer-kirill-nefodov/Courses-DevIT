class myUrl {
  href = null;
  origin = null;
  protocol = null;
  hostname = null;
  port = null
  pathname = null;
  search = null;
  hash = null;

  arrProtocol = ['https', 'http', 'ftp', 'file', 'gopher', 'ws', 'wss']
  arrHostname = [];

  constructor(url) {
    this.newUrl = new URL(url);
    const proto = url.split(':')
    for (let key of this.arrProtocol) {
      if (key === proto[0]) {
        this.protocol = proto[0];
        break;
      } else {
        this.protocol = this.arrProtocol[0];
      }
    }


    console.log()

    // this.href = Url

  }
}

const AddUrl = new myUrl('http://localhost:0123');

console.log(AddUrl.protocol)
console.log(AddUrl.protocol)
console.log(AddUrl.protocol)


