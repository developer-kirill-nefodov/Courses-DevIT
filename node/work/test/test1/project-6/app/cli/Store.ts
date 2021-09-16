export type Page = string | void;
export type PageF = {method: string, label: string}

export type TypeMachines = {
    host: string,
    port: string,
    username: string,
    password: string
}

export interface Task {
    id: number;
    action: string;
    data?: Array<TypeMachines> | string | string[] | TypeMachines
    label?: string;
    cb: Function;
}

class Store {
    private active: Array<TypeMachines> = [];
    addActive(obj: TypeMachines): void {
        this.active.push(obj)
    }
    getActive(): Array<TypeMachines> {
        return this.active;
    }

    private remoteMachine: Array<TypeMachines> = [];
    addRemoteMachine(arr: Array<TypeMachines>): void {
        this.remoteMachine = arr;
    }
    getRemoteMachine(): Array<TypeMachines> {
        return this.remoteMachine;
    }

    private portsMachine: string[] = [];
    addPortMachine(data: string): void {
        let arr = [], newAtt: string[] = [], arrPort = [];

        arr.push(...data.split('\n'))

        for (let idx of arr) {
            if (+idx[0] >= 0) {
                newAtt.push(idx)
            }
        }

        for (let idx of newAtt) {
            let start = idx.indexOf(':');
            let finish = idx.indexOf(' ');

            arrPort.push(idx.slice(start + 1, finish))
        }

        this.portsMachine = arrPort
    }
    getPortMachine(): string[] {
        return this.portsMachine
    }

    private remoteData: TypeMachines = {host: '', port: '', password: '', username: ''};
    addRemoteData(obj: TypeMachines): void {
        this.remoteData = obj
    }
    getRemoteData(): TypeMachines {
        return this.remoteData
    }

    private port: string = '0';
    addPort(port: string): void {
        this.port = port
    }
    getPort(): string {
        return this.port
    }
}

const store = new Store();

export {store}
