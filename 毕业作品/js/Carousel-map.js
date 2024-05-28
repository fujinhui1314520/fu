   /*
       实现步骤
        1.鼠标经过轮播图，左右按钮显示，离开隐藏按钮
        2.点击右侧一次，图片往左播放一张，以此类推
        3.图片播放的同时，下方小圆点跟随变化
        4.点击小圆圈，可以播放相应图片
        5.鼠标不经过轮播图，  会自动播放
        6.鼠标经过，轮播图停止，
    */


    //1.获取元素

    let box = $(".loopImgs");
    let loopList = $(".imgsList");
    let List = $_all(".imgsList li");
    let tabs = $(".tabs");
    let left = $(".left");
    let right = $(".right");

    let num = 0;
    let current = 0;
    let timer = null;
    let w = List[0].offsetWidth;

    //2.移入大图  左右箭头 显示

    box.addEventListener('mouseenter', function (e) {


        left.style.display = "block";
        right.style.display = "block";

        clearInterval(timer);

    })

    //3.移出大图  隐藏
    box.addEventListener('mouseleave', function (e) {
        left.style.display = "none";
        right.style.display = "none";

        timer = setInterval(function () {
            move();
        }, 2000)
    })


    //动态生成第一个li节点

    let first = List[0].cloneNode(true);
    loopList.append(first);


    //4.动态生成小圆点

    for (let i = 0; i < List.length; i++) {
        let li = document.createElement("li");
        tabs.append(li);

        //6.给每一个圆点添加点击事件

        for (let j = 0; j < tabs.children.length; j++) {
            let item = tabs.children[j];

            item.addEventListener('click', function () {
                for (let k = 0; k < tabs.children.length; k++) {
                    tabs.children[k].classList.remove('actived');
                }



                this.classList.add('actived');

                num = j;
                current = j;

                let target = -num * w;

                buffer(loopList, { left: target });
            })
        }
    }

    //5.把第一个圆点  添加选中
    tabs.children[0].classList.add('actived');


    //7.动态设置ul的宽度
    List = document.querySelectorAll(".imgsList li")
    loopList.style.width = List.length * List[0].offsetWidth + "px";

    //8.点击右侧按钮  图片切换

    right.addEventListener('click', move)

    function move() {

        //无缝滚动实现

        if (num === List.length - 1) {
            loopList.style.left = 0;
            num = 0;
        }

        num++;



        let target = -num * w;
        buffer(loopList, { left: target });

        //9.圆点动态显示当前
        current++;

        current = current % tabs.children.length;

        for (let i = 0; i < tabs.children.length; i++) {
            tabs.children[i].classList.remove('actived');
        }

        tabs.children[current].classList.add('actived');


    }

    left.addEventListener('click', function () {

        //无缝滚动
        if (num === 0) {
            num = List.length - 1;
            loopList.style.left = -(num * w) + "px";
        }

        num--;

        let target = -num * w;
        buffer(loopList, { left: target });

        current--;

        if (current < 0) {
            current = tabs.children.length - 1;
        }

        for (let i = 0; i < tabs.children.length; i++) {
            tabs.children[i].classList.remove('actived');
        }

        tabs.children[current].classList.add('actived');

    })

    //自动播放
    timer = setInterval(function () {
        //   right.click();
        move();
    }, 2000)