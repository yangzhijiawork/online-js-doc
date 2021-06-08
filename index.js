// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

// 初始值为数组，返回数据也是数组

function _new(obj) {
  let object = {};
  let args = [...arguments].slice(1);
  object.__proto__ = obj.prototype;
  let result = obj.apply(object, args);
  return typeof result === 'object' && result !== null ? result : object;
}

function foo() {
  this.name = 'lilei';
  this.args = arguments[0];
}
foo.prototype.callName = function() {
  console.log('name', this.name);
};

let fo1 = _new(foo, 'aili', 'xiaoxiong', 'mingzhi');
fo1.callName();
console.log(fo1.args);

// 手写call

Function.prototype._call = function(obj) {
  let object = obj || window;
  let args = [...arguments].slice(1);
  object.fn = this; // 注意添加这个临时方法！！！！
  let result = object.fn(...args);
  delete object.fn;
  return result; // 注意最后返回这个结果!!!
};

Function.prototype._apply = function(obj) {
  let object = obj || window;
  let args = arguments[1] ? arguments[1] : [];
  object.fn = this; // _apply的this指向外边的调用者(调用_apply的函数方法)，给object临时加一个方法调用者方法。
  let result = object.fn(...args);
  delete object.fn; // 用完删除此临时方法
  return resule;
};

Function.prototype._bind = function(obj) {
  let object = obj || window;
  let self = tihs; // 一定注意这句！！！！
  let args = [...arguments].slice(1);
  return function() {
    // 调用bind的时候支持再次传参（支持柯里化形式传参）
    let newArgs = [...arguments];
    return self.apply(object, args.concat(newArgs)); // 调用apply用self 一定注意！！！！
  };
};

function _instanceof(obj, Fn) {
  let prototype = Fn.prototype;
  while (obj.__proto__) {
    if (obj.__proto__ === prototype) return true;
    obj = obj.__proto__;
  }
  return false;
}

