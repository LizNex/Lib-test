// 重写alert和confirm方法，让苹果手机不出现地址
window.alert = function (name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};


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


//获得对象是页面中相同类名的第几个对象
//obj（obj）：对象  className（str）：类名
function getClassIndex(obj, className) {
    var group = document.getElementsByClassName(className);
    var arr = Array.prototype.slice.call(group, 0);
    return arr.indexOf(obj)
}

//格式化日期  str（str）:日期  format(str):格式 例'yyyy/mm/dd'
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


//获取点击对象的data-*属性，并将属性放到url后面作为下个页面的参数,跳转到此url
//event(obj):点击事件 url(str):地址 
function skipParameter(event, url) {
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

