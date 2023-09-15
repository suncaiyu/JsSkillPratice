// 把class改成普通函数

// class Example {
//     constructor(name) {
//         this.name = name;
//     }

//     func() {
//         console.log(this.name);
//     }
// }

'use strict'
function Example(name) {
    if (!this instanceof Example) {
        new TypeError('TypeError: Class constructor MyClass cannot be invoked without new')
    }
    this.name = name;
}

Object.defineProperty(Example.prototype, 'func', {
    value : function(x){
        console.log(this);
        console.log(x, this.name)
    },
    enumerable: false
})

// Example.prototype.func = function() {
//     console.log(this.name);
// }


let e = new Example("sun");
e.func("hello")