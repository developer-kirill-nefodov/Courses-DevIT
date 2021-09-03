// Модуль crypto предоставляет функционал шифрования, который включает в себя набор
// wrapper'ов для хэша OpenSSL, HMAC, шифраторов, дешифраторов и функций верификации.

const {
    createHmac, Certificate, scrypt,
    randomFill,
    createCipheriv,
    scryptSync,
    createDecipheriv,
    createHash
} = require('crypto');

const {pipeline} = require('stream');
const {
    createReadStream,
    createWriteStream,
} = require('fs');


// Класс Certificate
// SPKAC-механизм запроса на верификацию сертификата, изначально реализованный в Netscape, а сейчас являющийся
// частью кейгена в HTML5.Модуль crypto дает классу Certificate работать с данными SPKAC. Чаще всего используется для
// обработки выводов, сгенерированными элементом HTML5 <keygen>. Node.js использует реализацию OpenSSL SPKAC.
// SPKAC представляет собой подписанный Netscape открытый ключ и вызов.
// spkac - утилита печати и генерации SPKAC
// SPKAC это акроним, обозначающий подписанный открытый ключ и запрос , также известный как NetscapeSPKI
// Это формат для отправки запроса на подпись сертификата : он кодирует открытый ключ , которым можно управлять
// с помощью openssl . Он создается с использованием немного задокументированного HTML-элемента keygen внутри ряда
// Netscape-совместимых браузеров

// Структура данных spkac включает в себя открытый ключ и челлендж. certificate.exportChallenge() возвращает
// компонент челленджа в виде буфера Node.js. Аргумент spkac может быть либо строкой, либо буфером.
// Certificate.exportChallenge(spkac[, encoding])
// spkac <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView>
//     encoding <строка> кодирования из spkac строки.
//     Возвращает: <Buffer> Компонент spkac запроса структуры данных, который включает открытый ключ и запрос.
// const spkac = getSpkacSomehow();
// const challenge = Certificate.exportChallenge(spkac);
// console.log(challenge.toString('utf8'));

// Certificate.exportPublicKey(spkac[, encoding])
// spkac <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView>
//     encoding <строка> кодирования из spkac строки.
//     Возвращает: <Buffer> Компонент открытого ключа spkac структуры данных, который включает открытый ключ и запрос.
// const spkac = getSpkacSomehow();
// const publicKey = Certificate.exportPublicKey(spkac);
// console.log(publicKey);

// Certificate.verifySpkac(spkac[, encoding])
// spkac <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView>
//     encoding <строка> кодирования из spkac строки.
//     Возвращает: <boolean>, true если данная spkac структура данных действительна, в false противном случае.

// const spkac = getSpkacSomehow();
// console.log(Certificate.verifySpkac(Buffer.from(spkac)));

// Класс: Cipher
// Наследуется от: <stream.Transform>
// Экземпляры Cipher класса используются для шифрования данных. Класс можно использовать одним из двух способов:
// Как поток, который доступен как для чтения, так и для записи, где простые незашифрованные данные записываются
// для создания зашифрованных данных на читаемой стороне.
// Использование cipher.update()и cipher.final()метод для получения зашифрованных данных.
// crypto.createCipher()Или crypto.createCipheriv()методы используются для создания Cipher экземпляров.
//     Cipher объекты не должны создаваться напрямую с использованием new ключевого слова.

// const algorithm = 'aes-192-cbc';
// const password = 'Password used to generate key';
// scrypt(password, 'salt', 24, (err, key) => {
//     if (err) throw err;
//     // Then, we'll generate a random initialization vector
//     randomFill(new Uint8Array(16), (err, iv) => {
//         if (err) throw err;
//
//         // Once we have the key and iv, we can create and use the cipher...
//         const cipher = createCipheriv(algorithm, key, iv);
//
//         let encrypted = '';
//         cipher.setEncoding('hex');
//
//         cipher.on('data', (chunk) => encrypted += chunk);
//         cipher.on('end', () => console.log(encrypted));
//
//         cipher.write('some clear text data');
//         cipher.end();
//     });
// });
// Использование Cipher потоковых и конвейерных потоков:
// scrypt(password, 'salt', 24, (err, key) => {
//     if (err) throw err;
//     // Then, we'll generate a random initialization vector
//     randomFill(new Uint8Array(16), (err, iv) => {
//         if (err) throw err;
//
//         const cipher = createCipheriv(algorithm, key, iv);
//
//         const input = createReadStream('test.js');
//         const output = createWriteStream('test.enc');
//
//         pipeline(input, cipher, output, (err) => {
//             if (err) throw err;
//         });
//     });
// });

// Использование cipher.update()и cipher.final()методы:
// const algorithm = 'aes-192-cbc';
// const password = 'Password used to generate key';
//
// // First, we'll generate the key. The key length is dependent on the algorithm.
// // In this case for aes192, it is 24 bytes (192 bits).
// scrypt(password, 'salt', 24, (err, key) => {
//     if (err) throw err;
//     // Then, we'll generate a random initialization vector
//     randomFill(new Uint8Array(16), (err, iv) => {
//         if (err) throw err;
//
//         const cipher = createCipheriv(algorithm, key, iv);
//
//         let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
//         encrypted += cipher.final('hex');
//         console.log(encrypted);
//     });
// });

// cipher.final([outputEncoding])
// outputEncoding <строка> кодирование возвращаемого значения.
//     Возвращает: <Буфер> | <string> Любое оставшееся зашифрованное содержимое. Если outputEncoding указано,
//     возвращается строка. Если outputEncoding не указан, Buffer возвращается.
// После вызова cipher.final()метода Cipher объект больше не может использоваться для шифрования данных.
//     Попытки вызвать cipher.final()более одного раза вызовут ошибку.

// cipher.getAuthTag()
// Возвращает: <Buffer> При использовании режима шифрования
// (с аутентификацией GCM, CCM и OCBв настоящее время поддерживается),
// то cipher.getAuthTag()метод возвращает Buffer содержащий тег аутентификации, который был вычислен из приведенных данных.
// cipher.getAuthTag()Метод должен вызываться только после того, как шифрование было завершено с
// использованием cipher.final()методы.

// cipher.setAAD(buffer[, options])
// buffer <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView>
//     options <Object> stream.transformПараметры
//     plaintextLength <число>
//         encoding <string> Кодировка строки, используемая, когда buffer является строкой.
//         Возвращает: <Cipher> для цепочки методов.

// При использовании режима шифрования (с проверкой подлинности GCM, CCMи OCBв настоящее время поддерживается),
// то cipher.setAAD()метод устанавливает значение, используемое для дополнительной аутентификации данных
// (ААР) входного параметра.
// plaintextLengthВариант не является обязательным для GCMи OCB. При использовании CCM, то plaintextLength
// необходимо указать параметр и его значение должно соответствовать длине открытого текста в байтах. См. Режим CCM.
// cipher.setAAD()Метод должен быть вызван до cipher.update().

// cipher.setAutoPadding([autoPadding])
// autoPadding <boolean> По умолчанию: true
// Возвращает: <Cipher> для цепочки методов.
// При использовании алгоритмов блочного шифрования Cipher класс автоматически добавляет заполнение к входным данным до
// соответствующего размера блока. Чтобы отключить вызов заполнения по умолчанию cipher.setAutoPadding(false).
// Когда autoPadding есть false, длина всех входных данных должна быть кратной размеру блока шифра, иначе
// cipher.final()возникнет ошибка. Отключение автоматического заполнения полезно для нестандартного заполнения, например,
//     использования 0x0вместо заполнения PKCS.
// cipher.setAutoPadding()Метод должен быть вызван до cipher.final().

// cipher.update(data[, inputEncoding][, outputEncoding])
// data <строка> | <Буфер> | <TypedArray> | <DataView>
//     inputEncoding <строка> кодирование данных.
//     outputEncoding <строка> кодирование возвращаемого значения.
//         Возвращает: <Буфер> | <строка>
// Обновляет шифр с помощью data. Если inputEncoding аргумент указан, data аргумент представляет собой строку,
//     использующую указанную кодировку. Если inputEncoding аргумент не задан, data должно быть Buffer,
//     TypedArray или DataView. Если data это Buffer, TypedArray или DataView, то inputEncoding игнорируется.
// В outputEncoding определяет формат вывода зашифрованных данных. Если outputEncoding указан, возвращается строка,
//     использующая указанную кодировку. Если нет outputEncoding, Buffer возвращается.
// cipher.update()Метод может быть вызван несколько раз с новыми данными , пока cipher.final()называются.
//     Вызов cipher.update()after cipher.final()приведет к выдаче ошибки.

// Класс: Decipher
// Наследуется: <stream.Transform>
// Экземпляры Decipher класса используются для расшифровки данных. Класс можно использовать одним из двух способов:
// Как поток, который доступен как для чтения, так и для записи, где простые зашифрованные данные записываются для
// создания незашифрованных данных на читаемой стороне, или
// Использование decipher.update()и decipher.final()методы для получения незашифрованных данных.

// crypto.createDecipher()Или crypto.createDecipheriv()методы используются для создания Decipher экземпляров.
//     Decipher объекты не должны создаваться напрямую с использованием new ключевого слова.
// Пример: использование Decipher объектов как потоков:
// const algorithm = 'aes-192-cbc';
// const password = 'Password used to generate key';
// // Key length is dependent on the algorithm. In this case for aes192, it is
// // 24 bytes (192 bits).
// // Use the async `crypto.scrypt()` instead.
// const key = scryptSync(password, 'salt', 24);
// // The IV is usually passed along with the ciphertext.
// const iv = Buffer.alloc(16, 0); // Initialization vector.
//
// const decipher = createDecipheriv(algorithm, key, iv);
//
// let decrypted = '';
// decipher.on('readable', () => {
//     while (null !== (chunk = decipher.read())) {
//         decrypted += chunk.toString('utf8');
//     }
// });
// decipher.on('end', () => {
//     console.log(decrypted);
//     // Prints: some clear text data
// });
//
// const encrypted = 'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
// console.log(decipher.write(encrypted, 'hex'));
// decipher.end();

// Пример: Использование Decipher потоковых и конвейерных потоков:
// const algorithm = 'aes-192-cbc';
// const password = 'Password used to generate key';
// // Use the async `crypto.scrypt()` instead.
// const key = scryptSync(password, 'salt', 24);
// // The IV is usually passed along with the ciphertext.
// const iv = Buffer.alloc(16, 0); // Initialization vector.
//
// const decipher = createDecipheriv(algorithm, key, iv);
//
// const input = createReadStream('test.enc');
// const output = createWriteStream('test.js');
//
// input.pipe(decipher).pipe(output);

// Пример: Использование decipher.update()и decipher.final()методы:
// const algorithm = 'aes-192-cbc';
// const password = 'Password used to generate key';
// // Use the async `crypto.scrypt()` instead.
// const key = scryptSync(password, 'salt', 24);
// // The IV is usually passed along with the ciphertext.
// const iv = Buffer.alloc(16, 0); // Initialization vector.
//
// const decipher = createDecipheriv(algorithm, key, iv);
//
// // Encrypted using same algorithm, key and iv.
// const encrypted = 'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
// let decrypted = decipher.update(encrypted, 'hex', 'utf8');
// decrypted += decipher.final('utf8');
// console.log(decrypted);

// decipher.final([outputEncoding])
// outputEncoding <строка> кодирование возвращаемого значения.
//     Возвращает: <Буфер> | <string> Любое оставшееся расшифрованное содержимое.
//     Если outputEncoding указано, возвращается строка. Если outputEncoding не указан, Buffer возвращается.
// После вызова decipher.final()метода Decipher объект больше не может использоваться для дешифрования данных.
//     Попытки вызвать decipher.final()более одного раза вызовут ошибку.

// decipher.setAAD(buffer[, options])
// buffer <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView>
//     options <Object> stream.transformПараметры
//     plaintextLength <число>
//         encoding <string> Строковая кодировка, используемая, когда buffer является строкой.
//         Возвращает: <Decipher> для цепочки методов.
// При использовании режима шифрования ( с проверкой подлинности GCM, CCMи OCBв настоящее время поддерживается),
// то decipher.setAAD()метод устанавливает значение , используемое для дополнительного аутентифицированных данных
// (ААР) входного параметра.
// optionsАргумент не является обязательным для GCM. При использовании CCM, то plaintextLength необходимо указать параметр
// и его значение должно соответствовать длине шифртекста в байтах. См. Режим CCM.
// decipher.setAAD()Метод должен быть вызван до decipher.update().

// decipher.setAuthTag(buffer[, encoding])
// buffer <строка> | <Буфер> | <ArrayBuffer> | <TypedArray> | <DataView>
//     encoding <string> Строковая кодировка, используемая, когда buffer является строкой.
//     Возвращает: <Decipher> для цепочки методов.
// При использовании режима шифрования ( с проверкой подлинности GCM, CCMи OCBв настоящее время поддерживается),
// то decipher.setAuthTag()метод используется для передачи в принятого тега аутентификации. Если тег не предоставлен,
//     или если зашифрованный текст был изменен, decipher.final()будет выброшено, указывая, что зашифрованный текст
// должен быть отброшен из-за неудачной аутентификации. Если длина тега недопустима в соответствии с NIST SP 800-38D
// или не соответствует значению authTagLength параметра, decipher.setAuthTag()будет выдана ошибка.
// decipher.setAuthTag()Метод должен быть вызван , прежде чем decipher.update() для CCM режима или до decipher.final()для
// GCMи OCB режимов. decipher.setAuthTag()можно вызвать только один раз.

// decipher.setAutoPadding([autoPadding])
// autoPadding <boolean> По умолчанию: true
// Возвращает: <Decipher> для цепочки методов.
// Если данные были зашифрованы без стандартного заполнения блока, при вызове
// decipher.setAutoPadding(false)будет отключено автоматическое заполнение, чтобы
// предотвратить decipher.final()проверку и удаление заполнения.
// Отключение автоматического заполнения будет работать только в том случае, если длина входных данных кратна размеру блока шифров.
// decipher.setAutoPadding()Метод должен быть вызван до decipher.final().

// decipher.update(data[, inputEncoding][, outputEncoding])
// data <строка> | <Буфер> | <TypedArray> | <DataView>
//     inputEncoding <строка> кодирования из data строки.
//     outputEncoding <строка> кодирование возвращаемого значения.
//         Возвращает: <Буфер> | <строка>

// Обновляет дешифратор с помощью data. Если inputEncoding аргумент указан, data аргумент представляет собой строку,
//     использующую указанную кодировку. Если inputEncoding аргумент не указан, data должен быть Buffer.
//     Если data есть, Buffer то inputEncoding игнорируется.
// В outputEncoding определяет формат вывода зашифрованных данных. Если outputEncoding указан, возвращается строка,
//     использующая указанную кодировку. Если нет outputEncoding, Buffer возвращается.
// decipher.update()Метод может быть вызван несколько раз с новыми данными , пока decipher.final()называются.
//     Вызов decipher.update()after decipher.final()приведет к выдаче ошибки.

// Класс: Hash
// Расширяется: <stream.Transform>
// HashКласс представляет собой утилиту для создания хэш - дайджесты данных. Его можно использовать одним из двух способов:
// Как поток, который доступен как для чтения, так и для записи, где данные записываются для создания вычисленного
// хеш-дайджеста на читаемой стороне, или
// Использование hash.update()и hash.digest()метод для получения вычисленного хеша.
// crypto.createHash()Метод используется для создания Hash экземпляров. Hash объекты не должны создаваться напрямую с
// использованием new ключевого слова.
// const hash = createHash('sha256');
//
// hash.on('readable', () => {
//     // Only one element is going to be produced by the
//     // hash stream.
//     const data = hash.read();
//     if (data) {
//         console.log(data.toString('hex'));
//         // Prints:
//         //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
//     }
// });
//
// hash.write('some data to hash');
// hash.end();

// Пример: Использование Hash потоковых и конвейерных потоков:
// const hash = createHash('sha256');
//
// const input = createReadStream('test.js');
// input.pipe(hash).setEncoding('hex').pipe(process.stdout);

// Пример: Использование hash.update()и hash.digest()методы:
// const hash = createHash('sha256');
//
// hash.update('some data to hash');
// console.log(hash.digest('hex'));

// hash.copy([options])
// options <Object> stream.transformПараметры
// Возвращает: <Hash>
// Создает новый Hash объект, содержащий полную копию внутреннего состояния текущего Hash объекта.
// Необязательный optionsаргумент управляет поведением потока. Для хеш-функций XOF, таких как 'shake256',
//     outputLengthопция может использоваться для указания желаемой выходной длины в байтах.
//     Ошибка возникает при попытке скопировать Hashобъект после вызова его hash.digest()метода.
// const hash = createHash('sha256');
//
// hash.update('one');
// console.log(hash.copy().digest('hex'));
//
// hash.update('two');
// console.log(hash.copy().digest('hex'));
//
// hash.update('three');
// console.log(hash.copy().digest('hex'));

// hash.digest([encoding])
// encoding <строка> кодирование возвращаемого значения.
//     Возвращает: <Буфер> | <строка>
// Вычисляет дайджест всех данных, переданных для хеширования (с использованием hash.update()метода).
// Если encoding предоставлено, будет возвращена строка; в противном случае Buffer возвращается.
// После Hashвызова hash.digest()метода объект нельзя использовать снова . Множественные вызовы вызовут ошибку.

// hash.update(data[, inputEncoding])
// data <строка> | <Буфер> | <TypedArray> | <DataView>
// inputEncoding <строка> кодирования из dataстроки.
// Обновляет хеш-содержимое заданным data, кодировка которого указана в inputEncoding. Если encodingне указан,
//     а dataявляется строкой, применяется кодировка 'utf8'. Если dataэто Buffer, TypedArrayили DataView, то
// inputEncoding игнорируется.
// Это можно вызывать много раз с новыми данными во время потоковой передачи.

// Класс: Hmac
// Расширяется: <stream.Transform>
// HmacКласс представляет собой утилиту для создания криптографических дайджестов HMAC. Его можно использовать одним из
// двух способов:
// Как поток, который доступен как для чтения, так и для записи, где данные записываются для создания вычисленного
// дайджеста HMAC на читаемой стороне
// Использование hmac.update()и hmac.digest()методы для получения вычисленного HMAC дайджеста.
// crypto.createHmac()Метод используется для создания Hmac экземпляров. Hmac объекты не должны создаваться напрямую с
// использованием new ключевого слова.
// Пример: использование Hmac объектов как потоков:

// const secret = 'Lalalend';
// const hash = createHmac('sha256', secret).update('I love cupcakes').digest('hex');
// console.log(hash);

// const hmac = createHmac('sha256', 'a secret');
//
// hmac.on('readable', () => {
// Only one element is going to be produced by the
// hash stream.
// const data = hmac.read();
// if (data) {
// console.log(data.toString('hex'));
// Prints:
//   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
//     }
// });

// hmac.write('some data to hash');
// hmac.end();

// Пример: Использование Hmac потоковых и конвейерных потоков:
// const hmac = createHmac('sha256', 'a secret');
//
// const input = createReadStream('test.js');
// input.pipe(hmac).pipe(process.stdout);

// Пример: Использование hmac.update()и hmac.digest()методы:

// const hmac = createHmac('sha256', 'a secret');
//
// hmac.update('some data to hash');
// console.log(hmac.digest('hex'));

// hmac.digest([encoding])
// encoding <строка> кодирование возвращаемого значения.
//     Возвращает: <Буфер> | <строка>
// Вычисляет дайджест HMAC всех данных, переданных с использованием hmac.update(). Если encoding предоставляется,
//     возвращается строка; в противном случае Buffer возвращается;
// После Hmac вызова объект не может быть использован снова hmac.digest(). Несколько обращений к hmac.digest()вызовут выдачу ошибки.

// hmac.update(data[, inputEncoding])
// data <строка> | <Буфер> | <TypedArray> | <DataView>
//     inputEncoding <строка> кодирования из data строки.
// Обновляет Hmac контент заданным data, кодировка которого указана в inputEncoding. Если encoding не указан, а data
// является строкой, применяется кодировка 'utf8'. Если data это Buffer, TypedArray или DataView, то inputEncoding игнорируется.
// Это можно вызывать много раз с новыми данными во время потоковой передачи.

// Класс: KeyObject
// Node.js использует KeyObject класс для представления симметричного или асимметричного ключа, и каждый вид ключа
// предоставляет разные функции. В crypto.createSecretKey(), crypto.createPublicKey()и crypto.createPrivateKey()
// методы используются для создания KeyObject экземпляров. KeyObject объекты не должны создаваться напрямую с
// использованием new ключевого слова.

// Большинству приложений следует рассмотреть возможность использования нового KeyObjectAPI вместо передачи ключей в виде
// строк или Buffers из-за улучшенных функций безопасности.
// KeyObject экземпляры могут быть переданы в другие потоки через postMessage(). Получатель получает клонированный объект
// KeyObject, и KeyObject его не нужно указывать в transferList аргументе.

// KeyObject.from(key)
// key <CryptoKey>
// Возвращает: <KeyObject>
// Пример: преобразование CryptoKey экземпляра в KeyObject:
// const {webcrypto, KeyObject} = require('crypto');
// const {subtle} = webcrypto;
//
// const key = subtle.generateKey({
//     name: 'HMAC',
//     hash: 'SHA-256',
//     length: 256
// }, true, ['sign', 'verify']);
// const keyObject = KeyObject.from(key);
// console.log(keyObject.symmetricKeySize);

// keyObject.asymmetricKeyDetails
// <Объект>
//     modulusLength: <число> Размер ключа в битах (RSA, DSA).
//     publicExponent: <bigint> Открытая экспонента (RSA).
//         divisorLength: <число> Размер qв битах (DSA).
//             namedCurve: <string> Имя кривой (EC).
// Это свойство существует только для асимметричных ключей. В зависимости от типа ключа этот объект содержит
// информацию о ключе. Никакая информация, полученная с помощью этого свойства, не может использоваться для
// однозначной идентификации ключа или для нарушения безопасности ключа.

// keyObject.asymmetricKeyType#
// Для асимметричных ключей это свойство представляет тип ключа. Поддерживаемые типы ключей:
//
//     'rsa' (OID 1.2.840.113549.1.1.1)
// 'rsa-pss' (OID 1.2.840.113549.1.1.10)
// 'dsa' (OID 1.2.840.10040.4.1)
// 'ec' (OID 1.2.840.10045.2.1)
// 'x25519' (OID 1.3.101.110)
// 'x448' (OID 1.3.101.111)
// 'ed25519' (OID 1.3.101.112)
// 'ed448' (OID 1.3.101.113)
// 'dh' (OID 1.2.840.113549.1.3.1)
// Это свойство предназначено undefined для нераспознанных KeyObject типов и симметричных ключей.

// keyObject.export([options])#
// options: <Объект>
//     Возвращает: <строка> | <Буфер> | <Объект>
// Для симметричных ключей можно использовать следующие варианты кодирования:
// format: <string> Должен быть 'buffer'(по умолчанию) или 'jwk'.
// Для открытых ключей могут использоваться следующие варианты кодирования:
// type: <string> Должен быть одним из 'pkcs1'(только RSA) или 'spki'.
//     format: <Строка> Должно быть 'pem', 'der'или 'jwk'.

// Для закрытых ключей можно использовать следующие параметры кодирования:
// type: <string> Должен быть одним из 'pkcs1'(только RSA) 'pkcs8'или 'sec1'(только EC).
//     format: <Строка> Должно быть 'pem', 'der'или 'jwk'.
//         cipher: <string> Если указано, закрытый ключ будет зашифрован заданным cipherи passphraseс использованием
//             шифрования на основе пароля PKCS # 5 v2.0.
//             passphrase: <строка> | <Buffer> Парольная фраза, используемая для шифрования, см cipher.
// Тип результата зависит от выбранного формата кодирования, когда PEM результатом является строка, когда DER это будет
// буфер, содержащий данные, закодированные как DER, когда JWK это будет объект.
// Когда был выбран формат кодирования JWK , все остальные параметры кодирования игнорируются.

// keyObject.symmetricKeySize#
// <число>
// Для секретных ключей это свойство представляет размер ключа в байтах. Это свойство предназначено undefined
// для асимметричных ключей.

// keyObject.type
// <строка>
// В зависимости от типа это KeyObjectсвойство предназначено либо 'secret'для секретных (симметричных) ключей,
//     либо 'public'для открытых (асимметричных) ключей, либо 'private'для частных (асимметричных) ключей.

// Класс: Sign#
// Расширяется: <stream.Writable>
// SignКласс представляет собой утилиту для генерирования подписей. Его можно использовать одним из двух способов:
// В качестве записываемого потока , в который записываются данные, которые должны быть подписаны, и sign.sign()
// метод используется для генерации и возврата подписи, или
// Использование sign.update()и sign.sign()методы для получения подписи.
// crypto.createSign()Метод используется для создания Sign экземпляров. Аргумент - это строковое имя
// используемой хеш-функции. Sign объекты не должны создаваться напрямую с использованием new ключевого слова.

// Пример: Использование Sign и Verify объекты в виде потоков:
// const {
//     generateKeyPairSync,
//     createSign,
//     createVerify
// } = require('crypto');
//
// const { privateKey, publicKey } = generateKeyPairSync('ec', {
//     namedCurve: 'sect239k1'
// });
//
// const sign = createSign('SHA256');
// sign.write('some data to sign');
// sign.end();
// const signature = sign.sign(privateKey, 'hex');
//
// const verify = createVerify('SHA256');
// verify.write('some data to sign');
// verify.end();
// console.log(verify.verify(publicKey, signature, 'hex'));
// Prints: true

// Пример: Использование sign.update()и verify.update()методы:
// const {
//     generateKeyPairSync,
//     createSign,
//     createVerify
// } = require('crypto');
//
// const { privateKey, publicKey } = generateKeyPairSync('rsa', {
//     modulusLength: 2048,
// });
//
// const sign = createSign('SHA256');
// sign.update('some data to sign');
// sign.end();
// const signature = sign.sign(privateKey);
//
// const verify = createVerify('SHA256');
// verify.update('some data to sign');
// verify.end();
// console.log(verify.verify(publicKey, signature));
// Prints: true

// sign.sign(privateKey[, outputEncoding])
// privateKey <Объект> | <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView> | <KeyObject> | <CryptoKey>
//     dsaEncoding <строка>
//     padding <целое число>
//     saltLength <целое число>
//     outputEncoding <строка> кодирование возвращаемого значения.
//     Возвращает: <Буфер> | <строка>

// Вычисляет подпись для всех передаваемых данных с помощью sign.update()или sign.write().
// Если privateKey не a KeyObject, эта функция ведет себя так, как если бы privateKey она была передана в
// crypto.createPrivateKey(). Если это объект, можно передать следующие дополнительные свойства:
//
//     dsaEncoding <string> Для DSA и ECDSA эта опция определяет формат сгенерированной подписи.
//     Это может быть одно из следующих значений:
//
//     'der'(по умолчанию): кодирование структуры подписи ASN.1 в формате DER (r, s).
// 'ieee-p1363': Формат подписи, r || s предложенный в IEEE-P1363.
//     padding <integer> Необязательное значение заполнения для RSA, одно из следующих:
//
//     crypto.constants.RSA_PKCS1_PADDING (дефолт)
// crypto.constants.RSA_PKCS1_PSS_PADDING
// RSA_PKCS1_PSS_PADDING будет использовать MGF1 с той же хэш-функцией, которая использовалась для подписи сообщения,
//     как указано в разделе 3.1 RFC 4055 , если только хеш-функция MGF1 не была указана как часть ключа в соответствии
// с разделом 3.3 RFC 4055 .
//
//     saltLength <целое число> Длина соли при заполнении RSA_PKCS1_PSS_PADDING. Специальное значение
// crypto.constants.RSA_PSS_SALTLEN_DIGEST устанавливает длину соли равной размеру дайджеста,
//     crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN(по умолчанию) устанавливает максимально допустимое значение.
//
//     Если outputEncoding предоставляется, возвращается строка; в противном случае Buffer возвращается a .
//
//     После Sign вызова sign.sign()метода объект не может быть снова использован . Несколько обращений к
// sign.sign()вызовут выдачу ошибки.

// sign.update(data[, inputEncoding])#
// data <строка> | <Буфер> | <TypedArray> | <DataView>
//     inputEncoding <строка> кодирования из data строки.
// Обновляет Sign контент заданным data, кодировка которого указана в inputEncoding. Если encoding не указан,
//     а data является строкой, применяется кодировка 'utf8'. Если data это Buffer, TypedArray или DataView, то
// inputEncoding игнорируется.
//
//     Это можно вызывать много раз с новыми данными во время потоковой передачи.

// Класс: Verify
//
// Расширяется: <stream.Writable>
//     VerifyКласс представляет собой утилиту для проверки подписей. Его можно использовать одним из двух способов:
//
//     В качестве записываемого потока, в котором записанные данные используются для проверки соответствия предоставленной
//     подписи, или
//     Использование verify.update()и verify.verify()методы для проверки подписи.
//     crypto.createVerify()Метод используется для создания Verify экземпляров. Verify объекты не должны создаваться
//     напрямую с использованием new ключевого слова.
//
//     verify.update(data[, inputEncoding])
//     История
//     data <строка> | <Буфер> | <TypedArray> | <DataView>
//     inputEncoding <строка> кодирования из data строки.
//     Обновляет Verify контент заданным data, кодировка которого указана в inputEncoding. Если inputEncoding не указан,
//     а data является строкой, применяется кодировка 'utf8'. Если data это Buffer, TypedArray или DataView, то
//     inputEncoding игнорируется.
//
//     Это можно вызывать много раз с новыми данными во время потоковой передачи.
//
//     verify.verify(object, signature[, signatureEncoding])#
//     История
//     object <Объект> | <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView> | <KeyObject> | <CryptoKey>
//         dsaEncoding <строка>
//         padding <целое число>
//         saltLength <целое число>
//         signature <строка> | <ArrayBuffer> | <Буфер> | <TypedArray> | <DataView>
//         signatureEncoding <строка> кодирования из signature строки.
//         Возвращает: <boolean> true или в false зависимости от действительности подписи для данных и открытого ключа.
//             Проверяет предоставленные данные с помощью заданных object и signature.
//
//             Если object не a KeyObject, эта функция ведет себя так, как если бы object она была передана в
//             crypto.createPublicKey(). Если это объект, можно передать следующие дополнительные свойства:
//
//             dsaEncoding <string> Для DSA и ECDSA эта опция определяет формат подписи. Это может быть одно из
//                 следующих значений:
//
//                 'der'(по умолчанию): кодирование структуры подписи ASN.1 в формате DER (r, s).
//                 'ieee-p1363': Формат подписи, r || s предложенный в IEEE-P1363.
//                 padding <integer> Необязательное значение заполнения для RSA, одно из следующих:
//
//                     crypto.constants.RSA_PKCS1_PADDING (дефолт)
//                     crypto.constants.RSA_PKCS1_PSS_PADDING
//                     RSA_PKCS1_PSS_PADDING будет использовать MGF1 с той же хэш-функцией, которая использовалась
//                     для проверки сообщения, как указано в разделе 3.1 RFC 4055 , если только хеш-функция MGF1 не
//                     была указана как часть ключа в соответствии с разделом 3.3 RFC 4055 .
//
//  saltLength <целое число> Длина соли при заполнении RSA_PKCS1_PSS_PADDING. Специальное значение
//  crypto.constants.RSA_PSS_SALTLEN_DIGEST устанавливает длину соли crypto.constants.RSA_PSS_SALTLEN_AUTO равной
//  размеру дайджеста, (по умолчанию) заставляет его определять автоматически.
//
//  signatureАргумент ранее рассчитаны подписи для данных, в signatureEncoding. Если signatureEncoding указано a,
//  signatureожидается, что это будет строка; в противном случае , signatureкак ожидается, будет Buffer,
//  TypedArrayили DataView.
//
//  После verifyвызова объект не может быть использован снова verify.verify(). Несколько обращений к
//  verify.verify()вызовут выдачу ошибки.
//
//  Поскольку открытые ключи могут быть получены из закрытых ключей, закрытый ключ может быть передан вместо открытого ключа.