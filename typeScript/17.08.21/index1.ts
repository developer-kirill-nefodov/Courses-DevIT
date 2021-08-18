function protect_email(email: string, r: string = '*'): string{
    let a = email.charAt(0),
        b = String(r + r + r),
        c = email.indexOf("@"),
        d = email.indexOf("."),
        e = email.slice(d - 1);

    return `${a + b}${email.charAt(c)}${b + e}`;
}

console.log(protect_email('kirillnef@gmail.com')); //k***@***l.com