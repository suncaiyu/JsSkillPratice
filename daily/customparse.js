// var[a, b] = {a : 1, b : 2};  成立

// 1.先运行 看报错 Uncaught TypeError TypeError: {(intermediate value)(intermediate value)} is not iterable  说 没有迭代器
// 2. es6中有一个可迭代协议，如果一个对象有一个符号叫[Symbol.iterator] && 它是函数 && 这个函数返回一个迭代器 就表明该对象可以迭代
// 3. 所以想到给他添加这个东西

// Object.defineProperty(Object.prototype, Symbol.iterator, {
//     value : function() {
//         return Object.values(this)[Symbol.iterator]();
//     }
// })

Object.prototype[Symbol.iterator] = function() {
    console.log(this);
    return Object.values(this)[Symbol.iterator]();
}

var[a, b] = {r : 1, t : 2};
console.log(b);