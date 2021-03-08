function animate(obj, target, callback) {       // 多加一个形参(回调函数)
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写在定时器结束里面
            // if (callback) {
            //     callback()
            // }

            // 逻辑中断(短路运算符的使用)，与上面的 if 表达式能实现相同的结果
            callback && callback()
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)     // 一般写 15
}