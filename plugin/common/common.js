//--------依赖jquery----------

//--------工具类---------------
//获得对象是页面中相同类名的第几个对象
//obj（obj）：对象  className（str）：类名
function getClassIndex(obj, className) {
    var group = document.getElementsByClassName(className);
    var arr = Array.prototype.slice.call(group, 0);
    return arr.indexOf(obj)
}



// 类数组转化为数组
// likeArray(类数组)
function likeToArray(likeArray) {
    return Array.prototype.slice.call(likeArray, 0);
}

// 重写alert方法，让苹果手机不出现地址
window.alert = function (name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};

// 重写confirm方法，让苹果手机不出现地址
window.confirm = function (message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};

// 显示loadingF
function showLoad() {
    $('.loading').css('display', 'block');
}
// 关闭loading
function closeLoad() {

    $('.loading').css('display', 'none');

}



//--------业务类---------------
//格式化日期  
// str（str）:日期  format(str):格式 例'yyyy/mm/dd'
function formatDate(str, format) {
    var date = new Date(str.replace(/(-0|-)/g, '/'))
    var obj = {
        yyyy: date.getFullYear(),
        mm: ("0" + (date.getMonth() + 1)).slice(-2),
        dd: ("0" + date.getDate()).slice(-2),
    };
    return format.replace(/([a-z]+)/ig, function ($1) {
        return obj[$1]
    });
}

//格式化时间将ele的时间starttime endtime转化为startDate time,转化的结果封装成对象返回
//ele(obj):带有starttime endtime的对象
//返回（obj）：带有带有starttime time的对象
function translateTime(ele) {
    var startArr = ele.starttime.split('T');
    var endArr = ele.endtime.split('T');
    ele.startDate = startArr[0];
    ele.startDate = ele.startDate.replace(/-/g, '/')
    ele.time = startArr[1].replace(/:\d{2}$/, '') + '~' + endArr[1].replace(/:\d{2}$/, '');
    return {
        startDate: ele.startDate,
        time: ele.time
    }

}

//格式化时间  hh小时 mm分钟  返回xx:xx
//返回（str）：例：18:00
function format(hh, mm) {
    return hh + ':' + mm;
}


//跳转到url    
//url（str）:地址  
function skip(url) {
    window.location.href = url;
}

//返回上一个页面并刷新
function skipBack() {
    window.history.back(-1) && location.reload();
}

//获取点击对象的data-*属性，并将属性放到url后面作为下个页面的参数,跳转到此url
//event(obj):点击事件 url(str):地址 
function skipData(event, url) {
    var temp = event.currentTarget;
    var url = url + "?";
    var pop = temp.dataset;
    for (var key in pop) {
        url += (key + '=' + pop[key] + '&');
    }
    window.location.href = url;
}

//获取与name匹配的值
//name(str):值的名字
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//绑定单个input，限制输入数字
//input（obj）：需要限制的input元素
function numOnly(input) {
    input.keyup(function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    }).bind("paste", function () {}).css("ime-mode", "disabled");
}


//点击切换class,html上要加data-toggle属性
// event(obj):点击事件,classOn(str):on状态的class
function clickStyle(event, classOn) {
    var obj = event.currentTarget;
    var toggle = obj.dataset.toggle === "true";
    if (toggle) {
        $(obj).addClass(classOn);
    } else {
        $(obj).removeClass(classOn);
    }
    obj.dataset.toggle = !toggle;
}

//点击tab切换,通过添加、移除class改变样式
//event(obj):点击事件,classTab(str):tab元素的类名,classOn(str):on状态的class
function tabStyle(event, ClassTab, classOn) {
    var tab = document.getElementsByClassName(ClassTab);
    var tab = Array.prototype.slice.call(tab, 0);

    function changStyle() {
        var obj = event.currentTarget;
        var index = tab.indexOf(obj);
        $(obj).addClass(classOn)
        $(tab[Math.abs(1 - index)]).removeClass(classOn)
    }
    return changStyle;
}