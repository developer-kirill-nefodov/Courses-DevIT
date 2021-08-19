class Static {
    public static user: string = 'Bob';

    public static getUser(): string {
        return this.user
    }
}

const user = new Static()