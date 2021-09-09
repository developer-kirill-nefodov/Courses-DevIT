// Class: URL
// new URL(input[, base])
//input - абсолютный или относительный URL. Если input относительный, base обязательный. Если input абсолютный, base игнорируется.

// const myURL = new URL('https://example.org/');// https://example.org/
// const myURL1 = new URL('/foo', 'https://example.org/');// https://example.org/foo

// console.log(myURL);
// console.log(myURL1);

// url.hash

const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);// #bar

// myURL.hash = 'baz';
// console.log(myURL.href);// https://example.org/foo#baz

// url.host

// const myURL = new URL('https://example.org:81/foo');
// console.log(myURL.host);// example.org:81

// myURL.host = 'example.com:82';
// console.log(myURL.href);// https://example.com:82/foo

// url.hostname

// const myURL = new URL('https://example.org:81/foo');
// console.log(myURL.hostname);// example.org

// myURL.hostname = 'example.com';
// console.log(myURL.href);// https://example.com:81/foo

// url.href - URL в виде строки

// const myURL = new URL('https://example.org/foo');
// console.log(myURL.href);// https://example.org/foo

// myURL.href = 'https://example.com/bar';
// console.log(myURL.href);// https://example.com/bar

// url.toString() - возвращает то же, что и href

// const myURL = new URL('https://abc:xyz@example.com');
// console.log(myURL.toString());

// url.toJSON() - возвращает то же, что и href

// const myURL = new URL('https://abc:xyz@example.com');
// console.log(myURL.toJSON());

// url.origin

// const myURL = new URL('https://example.org/foo/bar?baz');
// console.log(myURL.origin);// https://example.org

// url.password

// const myURL = new URL('https://abc:xyz@example.com');
// console.log(myURL.password);// xyz

// myURL.password = '123';
// console.log(myURL.href);// https://abc:123@example.com

// url.pathname

// const myURL = new URL('https://example.org/abc/xyz?123');
// console.log(myURL.pathname);// /abc/xyz

// myURL.pathname = '/abcdef';
// console.log(myURL.href);// https://example.org/abcdef?123

// url.port

// const myURL = new URL('https://example.org:8888');
// console.log(myURL.port);// 8888

// myURL.port = 1234;
// console.log(myURL.port);

// url.protocol

// const myURL = new URL('https://example.org');
// console.log(myURL.protocol);// https:

// myURL.protocol = 'ftp';
// console.log(myURL.href);// ftp://example.org/

// Специальные протоколы
// Некоторые протоколы URL считаются специальными
// Специальные протоколы URL могут быть изменены только на другие специальные
// Неспециальные протоколы URL могут быть изменены только на другие неспециальные
// Специальные протоколы: ftp, file, gopher, http, https, ws, wss

// const u = new URL('http://example.org');
// u.protocol = 'https';
// console.log(u.href);// https://example.org

// const u = new URL('http://example.org');
// u.protocol = 'fish';
// console.log(u.href);// http://example.org

// const u = new URL('fish://example.org');
// u.protocol = 'http';
// console.log(u.href);// fish://example.org

// const u = new URL('fish://example.org');
// u.protocol = 'bird';
// console.log(u.href);// fish://example.org

// url.search

// const myURL = new URL('https://example.org/abc?123');
// console.log(myURL.search);// ?123

// myURL.search = 'abc=xyz';
// console.log(myURL.href);// https://example.org/abc?abc=xyz

// url.username

// const myURL = new URL('https://abc:xyz@example.com');
// console.log(myURL.username);// abc

// myURL.username = '123';
// console.log(myURL.href);// https://123:xyz@example.com/

// Class: URLSearchParams - для работы с параметрами запроса

// const myURL = new URL('https://example.org/?abc=123');
// console.log(myURL.searchParams);

// console.log(myURL.searchParams.get('abc'));// 123

// myURL.searchParams.append('abc', 'xyz');
// console.log(myURL.href);// https://example.org/?abc=123&abc=xyz

// myURL.searchParams.delete('abc');
// myURL.searchParams.set('a', 'b');
// console.log(myURL.href);// https://example.org/?a=b

// const newSearchParams = new URLSearchParams(myURL.searchParams);
// console.log(newSearchParams);

// newSearchParams.append('a', 'c');
// console.log(myURL.href);// https://example.org/?a=b
// console.log(newSearchParams.toString());// a=b&a=c

// myURL.search = newSearchParams;
// console.log(myURL.href);// https://example.org/?a=b&a=c

// newSearchParams.delete('a');
// console.log(myURL.href);// https://example.org/?a=b&a=c
// console.log(newSearchParams.toString());// ''

// url.searchParams - получает объект URLSearchParams

// new URLSearchParams() - создаёт новый пустой URLSearchParams объект

// const searchParams = new URLSearchParams();
// console.log(searchParams);

// new URLSearchParams(string) - анализирует string как строку запроса и использует её для создания нового URLSearchParams объекта

// let params;

// params = new URLSearchParams('user=abc&query=xyz');
// console.log(params.get('user'));// 'abc'
// console.log(params.toString());// 'user=abc&query=xyz'

// params = new URLSearchParams('?user=abc&query=xyz');
// console.log(params.toString());// 'user=abc&query=xyz'

// new URLSearchParams(obj)

// const params = new URLSearchParams({
//   user: 'abc',
//   query: ['first', 'second']
// });
// console.log(params.getAll('query'));// [ 'first,second' ]
// console.log(params.toString());// 'user=abc&query=first%2Csecond'

// new URLSearchParams(iterable)

// let params = new URLSearchParams([
//   ['user', 'abc'],
//   ['query', 'first'],
//   ['query', 'second']
// ]);
// console.log(params.toString());// 'user=abc&query=first&query=second'

// urlSearchParams.entries()

// const searchParams = new URLSearchParams('abc=123&query=first&query=second');
// console.log(searchParams.entries());

// urlSearchParams.forEach(fn[, thisArg])

// const myURL = new URL('https://example.org/?a=b&c=d');
// myURL.searchParams.forEach((value, name, searchParams) => {
//   console.log(name, value);
// });
// a b
// c d

// urlSearchParams.has(name) - Возвращает, trueесли существует хотя бы одна пара имя-значение с именем name

// const myURL = new URL('https://example.org/?a=b&c=d');
// console.log(myURL.searchParams.has('a'));
// console.log(myURL.searchParams.has('aaa'));

// urlSearchParams.keys()

// const myURL = new URL('https://example.org/?a=b&c=d');
// console.log(myURL.searchParams.keys());

// urlSearchParams.values()

// const myURL = new URL('https://example.org/?a=b&c=d');
// console.log(myURL.searchParams.values());

// urlSearchParams.sort()

// const myURL = new URL('https://example.org/?a=1&c=2&b=3');
// console.log(myURL.searchParams.sort().toString());

// url.domainToASCII(domain)

// console.log(url.domainToASCII('español.com'));// xn--espaol-zwa.com
// console.log(url.domainToASCII('中文.com'));// xn--fiq228c.com

// url.domainToUnicode(domain)

// console.log(url.domainToUnicode('xn--espaol-zwa.com'));// español.com
// console.log(url.domainToUnicode('xn--fiq228c.com'));// 中文.com

// url.format(URL[, options])
// options: auth, fragment, search, unicode

// const myURL = new URL('https://a:b@測試?abc#foo');
// console.log(myURL.href);// https://a:b@xn--g6w251d/?abc#foo
// console.log(myURL.toString());// https://a:b@xn--g6w251d/?abc#foo
// console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));// 'https://測試/?abc'


/** функция котороя принимает ссылку и обрабатывает строку */  /** Интересный подход**/
/**
function f(url, str) {
    let u = new URL(url);
    let test-3 = '';
    while (str.length > 0) {
        let i1 = str.indexOf('{');
        let i2 = str.indexOf('}');

        test-3 += str.slice(0, i1);
        let key = str.slice(i1 + 1, i2);
        str = str.slice(i2 + 1);

        test-3 += u[key];
    }
    return test-3;
}

console.log(f('https://example:8080/A?123=321',
    '{protocol}//{hostname}?port={port}/?{searchParams}'));
 */