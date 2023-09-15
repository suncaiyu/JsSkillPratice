// 1. 首先，promise都会进入微队列，等待执行。先不看then 先执行最外面的 有pj 和 pr, pj和pr分别调用了reject和resolve表示这两个promise的状态已经是fullfinished的,不要管了
// 2. 看下一层 pj进入第一层then,then的原型是then(resolve(e), reject(e)),所以reject会进入第二个参数。把它放入微队列 mico = [{console.log(0);
//    return Promise.resolve(4);}] 。然后是pr的then，由上面可知 也会放入微队列  mico = [{...}, {console.log(1);}]
// 3. 第一层then处理完了其他都是then函数，then函数是等待前面的promise执行完了在执行，所以现在处理微队列里面的任务  首先第一个 {console.log(0);
//    return Promise.resolve(4);} ,所以先打印0，然后返回一个新的promise，所以pj1不算执行完成，它还要等待返回的promise执行完成，不能进入pj2,而在js v8源代码中 如果返回的是promise，
//    他会调用promise的then方法，所以return promise.resolve(4) => promise.resolve(4).then(()=>{}), 什么都不做，但是会有这么一个过程(关键),并且会把这个过程放到微队列中完成
//    mico = [{console.log(1);}, {return Promise.resolve(4).then();}], 然后处理pr1 输出1， pr1完成，pr2进入微队列 mico = [{return Promise.resolve(4)。。。;}, console.log(2);]
// 4. return Promise.resolve(4).then(...);执行完成，这个执行完成，这个执行完成，实际上就是跟前面一样，把then里的东西放入微队列，虽然它then里面什么都不做,  [console.log(2); {}]
// 5. 输出2， pr3进入微队列  [{}, {pr3}] , {}执行完成，整个pj1终于fullfinished了  ,pj2入队  [{pr3}, {pj2}]
// 6. 输出3  ,[{pj2}, {pr4}]  输出4,整个pj没了 后米就是顺序输出了。

// pj
Promise.reject(0)
// pj1
.then((e)=>{
    console.log(7);
    return Promise.resolve(8);
}, (e)=>{
    console.log(e);
    return Promise.resolve(4);
})
// pj2
.then((e)=>{
    console.log(e);
})


// pr
Promise.resolve()
// pr1
.then((e)=>{
    console.log(1);
})
// pr2
.then(()=>{
    console.log(2);
})
//pr3
.then(()=>{
    console.log(3);
})
// pr4
.then(()=>{
    console.log(5);
})
// pr5
.then(()=>{
    console.log(6);
});
