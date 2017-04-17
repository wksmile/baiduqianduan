function Observer(data) {
    this.data = data;
    this.bindData(data);
};

let p = Observer.prototype;

p.bindData = function(obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'Object') {
                new Observer(val);
            };
            this.convert(key, val);
        }
    };
};

p.convert = function(key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('你访问了' + key);
            return val;
        },
        set: function(newVal) {
            console.log('你设置了' + key);
            console.log('新的值为' + key + '=' + newVal);
            if (newVal === val) return;
            val = newVal;
        }
    });
};

let data = {
    user: {
        name: "licnjdnvjdn",
        age: "24"
    },
    address: {
        city: "beijing"
    }
};

let app = new Observer(data);