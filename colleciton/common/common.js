//2017-11-12 
// updata：
//*重新分类代码：js部分，html部分，jquery依赖部分
//*新增格式化日期

//--------------------------js部分----------------------------------
// 类数组转化为数组
// likeArray(类数组)
function likeToArray(likeArray) {
    return Array.prototype.slice.call(likeArray, 0);
}

//t(datetime):时间格式的对象
//str(string):指定格式
//eg:formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
function formatDate(t, str) {
	var obj = {
	yyyy: t.getFullYear(),
	yy: ("" + t.getFullYear()).slice(-2),
	M: t.getMonth() + 1,
	MM: ("0" + (t.getMonth() + 1)).slice(-2),
	d: t.getDate(),
	dd: ("0" + t.getDate()).slice(-2),
	H: t.getHours(),
	HH: ("0" + t.getHours()).slice(-2),
	h: t.getHours() % 12,
	hh: ("0" + t.getHours() % 12).slice(-2),
	m: t.getMinutes(),
	mm: ("0" + t.getMinutes()).slice(-2),
	s: t.getSeconds(),
	ss: ("0" + t.getSeconds()).slice(-2),
	w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
            };
	return str.replace(/([a-z]+)/ig, function($1) {
		return obj[$1]
	});
}

//--------------------------html相关部分---------------------------
//获得对象是页面中相同类名的第几个对象
//obj（obj）：对象  className（str）：类名
function getClassIndex(obj, className) {
    var group = document.getElementsByClassName(className);
    var arr = Array.prototype.slice.call(group, 0);
    return arr.indexOf(obj)
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

//获取与url中与name匹配的值
//name(str):值的名字
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}



///---------------------------------jquery部分----------------------------
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