function Event(element) {
    this.init(element);
};

Event.prototype = {
    constructor: Event,
    init: function(element) {
        this.element = (element && element.nodeType == 1) ? 　element : document;
        return this;
    },

    addEvent: function(type, callback) {
        var self = this;
        if (self.element.addEventListener) { // 标准浏览器下
            self.element.addEventListener(type, callback, false);
        } else if (self.element.attachEvent) { // IE
            if (isNaN(self.element[type])) {
                self.element[type] = 0;
            }
            var fun = function(evt) {
                evt = evt ? evt : window.event;
                if (evt.propertyName == type) {
                    callback.call(self.element);
                }
            }
            self.element.attachEvent('onpropertychange', fun);
            // 在元素上存储绑定回调，方便移除事件绑定
            if (!self.element['callback' + callback]) {
                self.element['callback' + callback] = fun;

            }
        } else {
            self.element.attachEvent('on' + type, callback);
        }
        return self;
    },

    removeEvent: function(type, callback) {
        var self = this;
        if (self.element.removeEventListener) {
            self.element.removeEventListener(type, callback, false);
        } else if (self.element.detachEvent) {
            // 移除对应的自定义属性监听
            self.element.detachEvent('onpropertychange', self.element['callback' + callback]);
            // 删除储存在 DOM 上的自定义事件的回调
            self.element['callback' + callback] = null;

        } else {
            self.element.detachEvent('on' + type, callback);
        }
        return self;
    },

    triggerEvent: function(type) {
        var self = this;
        if (self.element.dispatchEvent) { // 标准浏览器下
            // 创建事件
            var evt = document.createEvent('Event');
            // 定义事件的类型
            evt.initEvent(type, true, true);
            // 触发事件
            self.element.dispatchEvent(evt);
        } else if (self.element.fireEvent) { // IE
            self.element[type]++;
        }
        return self;
    }

}

function Observer(data) {
    this.data = data;
    this.bindData(data);
    this.eventsBus = new Event();
};

let p = Observer.prototype;

p.addEvent = function(onEvent) {};

p.bindData = function(obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object') {
                new Observer(val);
            };
            this.convert(key, val);
        }
    };
};

// 设置每一个值的属性
p.convert = function(key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('你访问了' + key);
            return val;
        },
        set: function(newVal) {
            if (typeof newVal === 'object') {
                new Observer(newVal);
            };
            console.log('你设置了' + key);
            console.log('新的值为' + key + '=' + newVal);
            if (newVal === val) return;
            val = newVal;
        }
    });
};

p.$watch = function(attr, callback) {
    this.eventsBus.on(attr, callback);
};

let data = {
    name: "licnjdnvjdn",
    age: "24",
    city: "beijing"
};

let app = new Observer(data);

app.$watch('age', function(oldVal, newVal) {
    console.log('我的年龄变了，原来是: ${oldVal}岁，现在是：$(newVal岁了)');
});

app.$watch('age', function(oldVal, newVal) {
    console.log('我的年龄真的变了。竟然年轻了${oldVal-newVal}岁');
});