// 闭包函数的漏洞，从原型函数定义属性，返回this

class Student {
    constructor()
    {
        this.student = {
            name :"sun",
            age : 27
        }
    }
    GetAttrabute() {
        return {
            get : (e)=>{
                console.log(this);
                return this.student[e]
            }
        }
    }
}

// function Student() {
//     if (!this instanceof Student) {
//         new TypeError('TypeError: Class constructor MyClass cannot be invoked without new')
//     }
//     this.student = {
//         name: "sun",
//         age: 27
//     }
// }

// Student.prototype.GetAttrabute = function() {
//     return {
//         get : (e) =>{
//             return this.student[e]
//         }
//     }
// }

// Object.defineProperty(Student.prototype, "GetAttrabute", {
//     value: function (e) {
//         console.log(this);
//         return {
//             get: (e)=>{
//                 console.log(this)
//                 return this.student[e]
//             }
//         }
//     }
// })

Object.defineProperty(Object.prototype, "abc", {get(){return this;}});

let s = new Student;
let o = s.GetAttrabute().get("abc")
o.name = "hacker";
console.log(o)

