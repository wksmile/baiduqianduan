function Event() {
    this.events = {};
};

Event.prototype.on = function(attr, callback) {
    if (this.events[attr]) {
        this.events[attr].push(callback);
    } else {
        this.events[attr] = [callback];
    }
};

Event.prototype.off = function(attr) {
    for (let key in this.events) {
        if (this.events.hasOwnProperty(key) && key === attr) {
            delete this.events[key];
        };
    };
};

Event.prototype.emit = function(attr) {
    this.events[attr] && this.events[attr].forEach(function(element) {
        element(arguments);
    }, this);
};

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