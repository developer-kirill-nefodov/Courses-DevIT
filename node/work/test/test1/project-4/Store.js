class Store {
    activeT = [];
    remoteMachine = [];
    port = [];

    getRemote() {
        return this.remoteMachine
    }

    getActive() {
        return this.activeT
    }

    getPort() {
        return this.port
    }

    upDateRemote(arr) {
        this.remoteMachine = arr;
    }

    // upDatePort(data) {
    //     let arr = [], newAtt = [], arrPort = [];
    //     arr.push(...data.toString().split('\n'))
    //
    //     for (let idx of arr) {
    //         if (idx[0]++ >= 0) newAtt.push(idx)
    //     }
    //
    //     for (let idx of newAtt) {
    //         let start = idx.indexOf(':');
    //         let finish = idx.indexOf('-');
    //
    //         arrPort.push(idx.slice(start + 1, finish - 1))
    //     }
    //
    //     this.port = arrPort;
    // }

    addActive(obj) {
        this.activeT.push(obj)
    }


}

module.exports = new Store()