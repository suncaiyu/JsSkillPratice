// 创建一个简单的 Promise 类
class MyPromise {
    constructor(executor) {
      this.state = 'pending'; // 初始状态
      this.value = undefined; // 保存结果或错误
      this.onFulfilledCallbacks = []; // 成功回调队列
      this.onRejectedCallbacks = []; // 失败回调队列
  
      // 定义 resolve 函数
      const resolve = (value) => {
        if (this.state === 'pending') {
          this.state = 'fulfilled'; // 改变状态为已完成
          this.value = value; // 保存结果
  
          // 依次执行成功回调
          this.onFulfilledCallbacks.forEach((callback) => {
            callback(this.value);
          });
        }
      };
  
      // 定义 reject 函数
      const reject = (reason) => {
        if (this.state === 'pending') {
          this.state = 'rejected'; // 改变状态为已拒绝
          this.value = reason; // 保存错误信息
  
          // 依次执行失败回调
          this.onRejectedCallbacks.forEach((callback) => {
            callback(this.value);
          });
        }
      };
  
      // 执行 executor 函数，并传入 resolve 和 reject 函数
      try {
        executor(resolve, reject);
      } catch (error) {
        // 如果 executor 函数抛出异常，将其作为拒绝原因
        reject(error);
      }
    }
  
    // then 方法用于注册成功和失败回调
    then(onFulfilled, onRejected) {
      // 如果 then 中不是函数，则创建一个默认回调，将值传递下去
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
      onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };
  
      // 返回一个新的 Promise，用于链式调用
      return new MyPromise((resolve, reject) => {
        // 如果状态已经是已完成，直接执行成功回调
        if (this.state === 'fulfilled') {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        }
  
        // 如果状态已经是已拒绝，直接执行失败回调
        if (this.state === 'rejected') {
          setTimeout(() => {
            try {
              const result = onRejected(this.value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        }
  
        // 如果状态是 pending，将回调加入队列
        if (this.state === 'pending') {
          this.onFulfilledCallbacks.push((value) => {
            setTimeout(() => {
              try {
                const result = onFulfilled(value);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            });
          });
  
          this.onRejectedCallbacks.push((reason) => {
            setTimeout(() => {
              try {
                const result = onRejected(reason);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            });
          });
        }
      });
    }
  
    // catch 方法用于捕获错误
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  
    // 静态方法，用于创建一个已解决的 Promise
    static resolve(value) {
      return new MyPromise((resolve) => {
        resolve(value);
      });
    }
  
    // 静态方法，用于创建一个已拒绝的 Promise
    static reject(reason) {
      return new MyPromise((resolve, reject) => {
        reject(reason);
      });
    }
  }
  
  // 示例用法
  const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功的结果');
      // reject('失败的原因');
    }, 1000);
  });
  
  promise.then((value) => {
      console.log('成功：', value);
      return '新的值';
    })
    .then((value) => {
      console.log('成功：', value);
    })
    .catch((reason) => {
      console.error('失败：', reason);
    });
    console.log(">>")