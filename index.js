function iterator(arr) {
    return {
        next: function() {
            var v = arr.shift()
            return {
                done: v === undefined,
                value: v
            }
        }
    }
}

function Header() {
    this.headers = {}
}

Header.prototype.append = function(key, value) {
    if (key.constructor && key.constructor == Header)
        this.headers = key.headers
    if (this.has(key)) {
        this.headers[key] += value;
    } else {
        this.headers[key] = value
    }
}

Header.prototype.delete = function(key) {
    if (typeof key !== 'string')
        throw new TypeError('header must be string')
    if (this.has(key)) {
        var value = this.headers[key]
        delete this.headers[key]
        return value
    }
}

Header.prototype.set = function(key, value) {

}

Header.prototype.has = function(key) {
    return this.headers.hasOwnProperty(key)
}

Header.prototype.get = function(key) {
    return this.getAll(key)[0]
}

Header.prototype.getAll = function(key) {
    if (this.has(key))
        return this.headers[key].split(';')
}

Header.prototype.keys = function() {
    var keys = []
    for (var key in this.headers) {
        keys.push(key)
    }
    return iterator(keys)
}

Header.prototype.values = function() {
    var values = []
    for (var key in this.headers)
        values.push(this.headers[key])
    return iterator(values)
}
Header.prototype.entries = function() {
    var entries = []
    for (var key in this.headers)
        entries.push([key, this.headers[key]])
    return iterator(entries)
}

var myHeaders = new Header();
myHeaders.append('Content-Type', 'text/xml');
myHeaders.append('Vary', 'Accept-Language');



/*function fetch(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onloadend = function() {
            resolve(xhr.response)
        }
        xhr.send()
    })
}

fetch('https://cnodejs.org/api/v1/topics')
    .then(data => {
        console.log(data);
    })*/