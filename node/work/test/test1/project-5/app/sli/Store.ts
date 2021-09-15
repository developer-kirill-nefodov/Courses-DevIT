//@ts-ignore
class Store {
    private active = [];
    private remoteMachine = [];
    private portsArr = [];

    private tunnel = [];

    private remoteObj = {}

    private port = ''

    getTunnel() {
        return this.tunnel
    }

    getRemoteMach(): Array<any> {
        return this.remoteMachine
    }

    getActive(): Array<any> {
        return this.active
    }

    getPortArr(): Array<any> {
        return this.portsArr
    }

    getRemoteObj() {
        return this.remoteObj
    }

    getPort() {
        return this.port
    }

    upDateRemotePort(data) {
        console.log(data.toString())
        let arr = [], newAtt = [], arrPort = [];
        arr.push(...data.toString().split('\n'))

        for (let idx of arr) {
            if (+idx[0] >= 0) newAtt.push(idx)
        }

        for (let idx of newAtt) {
            let start = idx.indexOf(':');
            let finish = idx.indexOf(' ');

            arrPort.push(idx.slice(start + 1, finish))
        }

        this.portsArr = arrPort;
    }

    addPort(port) {
        this.port = port
    }

    addRemoteObj(obj) {
        this.remoteObj = obj;
    }

    addRemotes(arr) {
        this.remoteMachine = arr
    }

    addActive(obj): void {
        this.active.push(obj)
    }
}

// @ts-ignore
const store = new Store()

module.exports = store;