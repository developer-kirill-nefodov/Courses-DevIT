function protect_email(email: string, r: string = '*'): string{
    let a: string = email.charAt(0),
        b: string = (r + r + r),
        c: number = email.indexOf("@"),
        d: number = email.indexOf("."),
        e: string = email.slice(d - 1);

    return `${a + b}${email.charAt(c)}${b + e}`;
}

console.log(protect_email('kirillnef@gmail.com')); //k***@***l.com