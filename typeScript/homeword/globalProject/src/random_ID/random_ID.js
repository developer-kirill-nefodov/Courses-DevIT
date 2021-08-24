export default function Random_ID() {
    let id = String.fromCharCode(Math.floor((Math.random() * 25) + 65));

    do {
        let code = Math.floor((Math.random() * 42) + 48);

        if (code < 58 || code > 64) {
            id += String.fromCharCode(code);
        }
    } while (id.length < 10);

    return id;
}