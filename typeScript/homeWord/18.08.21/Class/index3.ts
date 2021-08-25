class Static {
    static user: string = 'Bob';

    static getUser(): string {
        return this.user
    }
}

const user = new Static()