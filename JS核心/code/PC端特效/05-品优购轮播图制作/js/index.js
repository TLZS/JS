window.addEventListener('load', function () {
    // 1. 鼠标经过轮播图 显示左右箭头
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 13. 鼠标经过轮播图 自动播放暂停
        clearInterval(timer);
        timer = null;         // 清除定时器变量
    });
    // 2. 鼠标离开轮播图 显示左右按钮
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 14. 鼠标离开轮播图 轮播图继续自动播放
        timer = setInterval(function () {       // 因为刚才已经开了定时器，不需要再加 var 了
            // 手动调用点击事件
            arrow_r.click();
        }, 2000)
    });
    // 3. 动态生成小圆圈 有几张图片()就生成几个小圆圈
    var ul = focus.querySelector('ul');  // focus 中的 ul
    var ol = document.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈索引号 通过自定义属性来做
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 4. 排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 5. 点击小圆圈，移动图片，移动的是 ul
            // ul 移动的距离是：小圆圈的索引号 乘以 图片的宽度(focus.offsetWidth) 注意是负值
            // 当我们点击某个小li 就拿到当前小li的索引号
            var index = this.getAttribute('index');
            // 9. 当我们点击了某个小li 就要把这个小 li 的索引号给 num
            num = index;
            // 10. 但我们点击了某个小li 就要把这个小 li 的索引号给 circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小 li 设置为类名 current
    ol.children[0].className = 'current';

    // 6. 克隆第一张图片 li 放在 ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 点击右侧按钮，图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;

    // 13. 添加 flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;     // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul就要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;           // 动画执行完毕之后 打开节流阀
            });

            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            console.log(ol.children.length);
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用小圆圈变化函数
            circleChange()
        }
    })

    // 11. 左侧按钮做法
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果走到了第一张图片，此时 我们的ul就要快速跳到最后一张复制的图片处
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = - num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });

            //  点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0 说明走到第一张图片了 
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 调用小圆圈变化函数
            circleChange()
        }
    })

    // 小圆圈变化函数
    function circleChange() {
        // 先清除其余小圆圈的 current 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 12. 自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000)
})