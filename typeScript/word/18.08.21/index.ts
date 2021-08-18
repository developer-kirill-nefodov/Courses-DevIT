// /** Поля для чтения **/
//
// /** Значение полей для чтения можно установить либо при объявлении Либо в конструкторе **/
//
//     class User {
//         readonly name: string;
//
//         constructor(userName: string) {
//             this.name = userName;
//         }
//     }
//
// /** В остальных местах программы значение этого поля нельзя изменить **/
//
// let tom = new User("Tom");
//
// // tom.name = "Bob";       /** ! Ошибка - поле name - только для чтения **/
//
// /** Наследование **/
//
// class Person {
//
//     name: string;
//     constructor(userName: string) {
//
//         this.name = userName;
//     }
//     print(): void {
//         console.log(`Имя: ${this.name}`);
//     }
// }
//
// class Employee extends Person {
//     company: string = 'devId';
//
//     work(): void {
//         console.log(`${this.name} работает в компании ${this.company}`);
//     }
// }
//
// const W = new Employee('kirill')
//
// /** Модификаторы доступа **/
//
