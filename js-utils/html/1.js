//Person("Li");
// 输出： Hi! This is Li!


//Person("Dan").sleep(10).eat("dinner");

// 输出：
// Hi! This is Dan!
// 等待10秒..
// Wake up after 10
// Eat dinner~



//Person("Jerry").eat("dinner").eat("supper");
// 输出：
// Hi This is Jerry!
// Eat dinner~
// Eat supper~



//Person("Smith").sleepFirst(5).eat("supper");
// 输出：
// 等待5秒
// Wake up after 5
// Hi This is Smith!
// Eat supper


function PersonClass(name) {
    this.stack = [];
    this.index = 0;

    var sayHi = function() {
        console.log("Hi This is " + name + "!");
        this.next()
    }.bind(this)

    this.addAction(sayHi)

    console.log('11111')
    this.next()
    // setTimeout(function () {
    //     this.next()
    //     console.log('222222')
    // }.bind(this), 0)

}
PersonClass.prototype.next = function () {
     var fn = this.stack[this.index];
     this.index++;
     if (typeof fn === 'function') fn();
}
PersonClass.prototype.addAction = function (fn, isFirst) {
    if (isFirst) {
        this.stack.unshift(fn)
    } else {
        this.stack.push(fn)
    }

}
PersonClass.prototype.sleep = function (time) {
  console.log('0000000000000000000000')
    var sleepFn = function () {
        setTimeout(function () {
            console.log('Wake up after ' + time);
            this.next()
        }.bind(this), time)
    }.bind(this);
    this.addAction(sleepFn);
    return this;
}
PersonClass.prototype.eat = function (food) {
    var eatFn = function () {
        console.log("Eat " + food + "~")
        this.next()
    }.bind(this)
    this.addAction(eatFn)
    return this;
}
PersonClass.prototype.sleepFirst = function (time) {
    var sleepFirstFn = function () {
        setTimeout(function () {
            console.log('Wake up after ' + time);
            this.next();
        }.bind(this), time)
    }.bind(this);
    this.addAction(sleepFirstFn, true)
    return this;
}

function Person(name) {
    return new PersonClass(name)
}
//Person("Li");
Person("Dan").sleep(10 * 1000).sleep(10 * 1000).eat("dinner");
//Person("Jerry").eat("dinner").eat("supper");
//Person("Smith").sleepFirst(5).eat("supper");