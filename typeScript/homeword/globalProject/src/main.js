// function* Purchase(menu) {
//     while (true) {
//         const men = {...menu}
//         const upMenu = {}
//         let purchase = [];
//
//         let operation = 1;
//
//         for (let idx in menu) {
//             // noinspection JSUnfilteredForInLoop
//             upMenu[idx] = menu[idx].map((e) => {
//                 return {name: e.name, price: e.price}
//             })
//         }
//
//         do {
//             let newProto, is = -1;
//
//             console.log(menu);
//
//             const a = yield 'Что вы хотите купить?';
//
//             for (let idx in menu) {
//                 // noinspection JSUnfilteredForInLoop
//                 let key = men[idx].map(n => n.name).indexOf(a);
//
//                 if (key > -1) {
//                     // noinspection JSUnfilteredForInLoop
//                     newProto = menu[idx].filter(i => i.name === a);
//                     is = key;
//                 }
//             }
//
//             if (is === -1) {
//                 console.log('Товар с таким названием не существует');
//                 continue;
//             }
//
//             /**
//              let b = yield 'Что нибуть добавить?'; if (b === 'no') b = 1;    //В разработке
//              */
//
//             let c = yield 'Сколько?';
//
//             if (typeof c !== "number" || c < 0) c = 1;
//
//             purchase.push(Object.assign(...newProto, {number: c}));
//
//             const d = yield 'Что нибудь ещё?';
//
//             console.log(purchase);
//
//             if (d === 'no' || d === 'No') {
//                 const product = {name: '', sum: 0, calories: 0};
//
//                 for (let i = 0; i < purchase.length; i++) {
//                     let idx1 = purchase[i];
//                     let {name, price, calories, number} = idx1;
//
//                     product.name += `${number + name}, `;
//                     product.sum += price * number;
//                     product.calories += calories * number;
//                 }
//                 operation--;
//                 purchase = [];
//                 console.log(product);
//             }
//         } while (operation)
//         yield 'Спасибо за покупку, приходите ещё'
//     }
// }
//
// const menu1 = {
//     food: [{type: "food", name: "Pizza", price: 43, calories: 266, composition: "Ветчина Оливки Сыр Соус Масло"},
//         {type: "food", name: "Hamb", price: 42, calories: 266, composition: "Ветчина Оливки Сыр Соус Масло"}],
//     drink: [{type: "drink", name: "Water", price: 0, calories: 0, composition: "H2O"}]
// }
//
// const gen = Purchase(menu1)
//
// console.log(gen.next().value)
// console.log(gen.next('Pizza').value)
// console.log(gen.next(300).value)
// console.log(gen.next('yas').value)
// console.log(gen.next('Water').value)
// console.log(gen.next(30).value)
// console.log(gen.next('no').value)
