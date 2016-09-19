var write = document.getElementById('write');
var lishi = document.getElementById('lishi');
write.onclick= function () {
        lishi.style.display='block';
};






/*导航*/
(function daohang() {
    var outer = document.getElementById('outer');
    var daohang = document.getElementById('daohang');
    console.log(daohang);
    var lannei = document.getElementById('lannei');

    (function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "logo.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                window.data = utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    })();
    console.log(data);



    (function bindData() {
        if (window.data) {
            var str = '';
            str += ' <li>注册</li>';
            str += '<li>登录</li>';
            str += '<li>|</li>';
            str += '<li class="dingdan"> <span></span>我的订单 </li>';
            str += '<li>|</li>';
            str += '<li class="shapping"> <span></span>购物车 <div class="detail">购物车里没有商品</div> </li>';
            str += '<li>|</li>';
            str += '<li class="kehufuwu">客户服务 <ul class="kehuneirong"> <li class="neirong">消费者服务</li> <li class="neirong">商家服务</li> <li class="neirong">规则中心</li> </ul> <span></span> </li>';
            str += '<li>|</li>';
            str += '<li class="xiaodian kehufuwu"><span class="span1"></span>我的小店<ul class="xiaodianneirong"> <li class="neirong">后台管理</li> <li class="neirong">商家社区</li> <li class="neirong">商家培训</li> <li class="neirong">市场入驻</li> </ul> <span></span> </li>';
        }
        lannei.innerHTML = str;
    })();


    var shapping = utils.getElementsByClass('shapping', lannei)[0];
    var detail = utils.getElementsByClass('detail', shapping)[0];
    var kehufuwu = utils.getElementsByClass('kehufuwu', lannei)[0];
    var xiaodian = utils.getElementsByClass('xiaodian', lannei)[0];
    var kehuneirong = utils.getElementsByClass('kehuneirong', kehufuwu)[0];
    var xiaodianneirong = utils.getElementsByClass('xiaodianneirong', xiaodian)[0];


    shapping.onmouseover = function () {
        detail.style.display = 'block';
    };
    shapping.onmouseout = function () {
        detail.style.display = 'none';
    };

    kehufuwu.onmouseover = function () {
        kehuneirong.style.display = 'block';
    };
    kehufuwu.onmouseout = function () {
        kehuneirong.style.display = 'none';
    };

    xiaodian.onmouseover = function () {
        xiaodianneirong.style.display = 'block';
    };
    xiaodian.onmouseout = function () {
        xiaodianneirong.style.display = 'none';
    };
})();


/*轮播图*/
(function () {


    var banner = document.getElementById('banner');
    var bannerInner = utils.getElementsByClass('photo', banner)[0];
    var imgs = bannerInner.getElementsByTagName('img');
    var focusList = utils.getElementsByClass('focusList', banner)[0];
    var focusLis = focusList.getElementsByTagName('li');
    var left = utils.getElementsByClass('left', banner)[0];
    var right = utils.getElementsByClass('right', banner)[0];

//获取数据
    (function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "data.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                window.data = utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    })();
    console.log(data);

//绑定数据
    (function bindData() {
        if (window.data) {
            var str = '';
            var lisHtml = "";
            for (var i = 0; i < data.length; i++) {
                var curData = data[i];
                str += '<a><img src="" trueSrc="' + curData.src + '"/></a>';
                lisHtml += i === 0 ? '<li class="bg"></li>' : '<li></li>';
            }
            str += '<div><img src="" trueSrc="' + data[0].src + '"/></div>';
            bannerInner.innerHTML = str;
            utils.css(bannerInner, "width", 715 * (data.length + 1));
            focusList.innerHTML = lisHtml;
        }
    })();


    function imgsDelayLoad() {
        for (var i = 0; i < imgs.length; i++) {
            var curImg = imgs[i];
            if (curImg.isloaded) return;
            var tempImg = new Image();
            tempImg.index = i;
            tempImg.src = curImg.getAttribute('trueSrc');
            tempImg.onload = function () {
                imgs[this.index].src = this.src;
                utils.css(imgs[this.index], "display", "block");
            };
            curImg.isloaded = true;
            tempImg = null;
        }
    }

    window.setTimeout(imgsDelayLoad);

//自动轮播
    var step = 0;
    var timer = null;

    function autoMove() {
        if (step == data.length) {
            step = 0;
            utils.css(bannerInner, "left", -step * 715);
        }
        step++; //
        animate(bannerInner, {left: -step * 715}, 300);
        focusAlign();
    }

    timer = window.setInterval(autoMove, 5000);

    function focusAlign() {
        var tempStep = step === data.length ? 0 : step;
        for (var i = 0; i < focusLis.length; i++) {
            focusLis[i].className = i == tempStep ? "bg" : "";
        }
    }

//鼠标悬停的时候停止播放,鼠标离开的时候继续播放
    banner.onmouseover = function () {
        utils.css(left, "display", "block");
        utils.css(right, "display", "block");
        window.clearInterval(timer);
    };
    banner.onmouseout = function () {
        left.style.display = right.style.display = 'none';
        timer = window.setInterval(autoMove, 5000);
    };

//点击焦点实现图片切换
    function bindEventForFocus() {
        for (var i = 0; i < focusLis.length; i++) {
            focusLis[i].index = i;
            focusLis[i].onclick = function () { //给每一个焦点绑定点击事件
                step = this.index; //为了保证点击之后下一次自动轮播从当前点击的这一个焦点开始
                animate(bannerInner, {left: -step * 715}, 300);
                focusAlign();
            }
        }
    }

    bindEventForFocus();
//给左右按钮绑定事件
    left.onclick = function () {
        if (step == 0) {
            step = data.length;
            utils.css(bannerInner, "left", -step * 715);
        }
        step--;
        animate(bannerInner, {left: -step * 715}, 300);
        focusAlign();
    };
    right.onclick = autoMove;

})();


/*倒计时*/
(function () {
    var hours = document.getElementById('hours'),
        minutes = document.getElementById('minutes'),
        seconds = document.getElementById('seconds');

    function toDou(n) {
        return n >= 0 && n < 10 ? '0' + n : '' + n;
    }

    function countdown() {
        var oDate = new Date();
        var newDate = new Date('2016/9/8 23:59:59');

        var s = Math.floor((newDate.getTime() - oDate.getTime()) / 1000);
        if(s<=0){
            return;
        }

        var h = Math.floor(s / 3600);
        s %= 3600;
        var m = Math.floor(s / 60);
        s %= 60;
        hours.innerHTML = toDou(h);
        minutes.innerHTML = toDou(m);
        seconds.innerHTML = toDou(s);
    }

    countdown();
    setInterval(countdown,1000);
})();


~(function renturnTop() {
    var btn = document.getElementById('top1');
    var header = document.getElementById('header');
    console.log(btn);
    var duration = 500;
    var interval = 10;
    //var timer = null;
    btn.onclick = function (){
        window.clearInterval(btn.timer);
        btn.timer = window.setInterval(function (){
            var curScrollTop = utils.win('scrollTop');
            var speed = curScrollTop/duration*interval;
            if(curScrollTop <= 0){
                window.clearInterval(btn.timer);
                utils.win("scrollTop",0);
                window.onscroll = scroll;
                return;
            }
            curScrollTop -= speed;
            utils.win("scrollTop",curScrollTop);
        },interval);
        this.style.display = 'none';
        window.onscroll = null;
    };

    function scroll(){
        var curScreenHeight = utils.win("clientHeight");
        var curScrollTop = utils.win('scrollTop');
        if(curScrollTop > curScreenHeight){
            btn.style.display = 'block';
            header.style.display = 'block';
        }else{
            btn.style.display = 'none';
            header.style.display = 'none';
        }
    }
    window.onscroll = scroll;
})();
