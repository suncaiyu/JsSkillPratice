// let res = add[100][200][300] + 400;
// console.log(res)  =>显示1000   成立

// 1. 用proxy 让 add[100]能成立  ，可以看一下Proxy，接受两个参数，后面一个参数接受3个参数
// let add = new Proxy(
//     {
//     }, {
//         get(target, p, receiver) {
//             console.log(target, p, receiver);
//         }
//     }
// );

// 2. 如果链式调用 需要每次都返回receiver，receiver就是一个proxy，也就是add本身，add[100][200][300] => get处理100, 返回add => add[200][300]....add[300] => add finish
// let add = new Proxy(
//     {
//     }, {
//         get(target, p, receiver) {
//             console.log(target, p, receiver);
//             return reveiver;
//         }
//     }
// );

// 3. 每次都要累计，需要内部记录一个值。注意，需要使用target._storeValue，不要用this，因为this都是0开始
// let add = new Proxy(
//     {
//         _storeValue : 0
//     }, {
//         get(target, p, receiver) {
//             target._storeValue += +p;
//             console.log(target, p, receiver);
//             return receiver;
//         }
//     }
// );

// 4. 最后一步, 能返回一个数字与另一个纯数字相加。
// add[100][200][300] + 400; 直接运行这个会报错 Uncaught TypeError TypeError: Cannot convert a Symbol value to a number
// 所以其实最后add返回的是一个符号  一个symbol  打印这个是一个Symbol(Symbol.toPrimitive)，表示将一个对象转成原始类型,这个符号要求返回一个函数
// 所以在p === Symbol.toPrimitive 返回对应的值。
let add = new Proxy(
    {
        _storeValue : 0
    }, {
        get(target, p, receiver) {
            console.log(p);
            if (p === Symbol.toPrimitive) {
                return ()=>{
                    return target._storeValue;
                }
            }
            target._storeValue += +p;
            return receiver;
        }
    }
);
let res = add[100][200][300] + 400
console.log(res)