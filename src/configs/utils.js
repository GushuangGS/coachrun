import numeral from 'numeral'
import moment from "moment";
import Cookie from "js-cookie";


/*
    货币格式转换 $123,123.12
*/
export function formatCurrency(money){
    let number = numeral(Number(money));
    numeral.defaultFormat('$0,0.00');
    return number.format();
}

/*
    数字千分位转换  9,999
*/
export function formatDecimal(point){
    return numeral(point).format('0,0');
}

/*
    日期拼接星期  2020-03-27 Fir
*/
export function formatDate(date){
    return date + " " + moment(date).format('ddd');
}

/*
    转换成美国12小时时间制 8:00 AM
*/
export function formatTime(time){
    return moment(time,"HH:mm").format("LT")
}

/*
    获取cookie的值
*/
export function getCookie(name){
    let value = window.sessionStorage.getItem(name);
    if(!value) {
        value = Cookie.get(name);
        if(!value){
            value = window.localStorage.getItem(name);
        }
    }
    return value;
}

/*
    获取url的参数
*/
export function getUrlParams(name){//aid
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}

//在string原型上加个方法 去除空格
String.prototype.trim = function(){
    return this.replace(/^\S+|\S+$/g,'');
}

//排序 冒泡排序
function sortDesc(arr){
    for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            // >为降序  <为升序
            if(arr[j]>arr[i]){
                var temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}
//sort方法 降序b-a 升序 a-b
arr.sort(function(a,b){
    return b-a;
})


//数组去重
//函数方法
function unique(arr){
    var result = [];
    for(var i=0;i<arr.length;i++){
        var arri = arr[i];
        if(result.indexOf(arri)<0){
            result.push(arri);
        }
    }
    return result;
}
//es6 set方法
function unique(arr){
    return Array.from(new Set(arr));
}

//promise 处理异步回调结果
// 六个方法 ：1、resolve 成功状态 2、reject 失败状态
// 3、then：接收成功结果 4、catch 接收失败结果
// 5、all 同时处理多个 6、race 多个异步中最快完成的

//闭包 能够读取其他内部变量的函数
// 缺点：1、更多的内存消耗 2、性能问题
//特性：1、js允许使用当前函数以外定义的变量
//2、闭包可以更新外部变量的值
//3、即使外包函数已返回，当前函数仍可以引用外部函数定义的变量
//对页面影响：
//闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能
//滥用闭包，否则会造成网页的性能问题。

//跨域
//协议+域名+端口相同
//解决：1、jsonp：动态创建script
//2、服务端设置 Acess-Control-Allow-Origin

//阻止事件冒泡 和 阻止默认事件
//阻止事件冒泡：e.stopPropagation()
//阻止默认事件： e.preventDefault()

//网页从输入网址到渲染完成经历了哪些过程
//1、输入网址
//2、发送到DNS服务器，并获取域名对应的web服务器对应的ip地址；
//3、与web服务器建立TCP连接；
//4、浏览器向web服务器发送http请求；
//5、web服务器响应请求，并返回指定url的数据（或错误信息，或重定向的新的url地址）
//6、浏览器下载web服务器返回的数据及解析html源文件；
//7、生成DOM树，解析css和js，渲染页面，直至显示完成；

//网站性能之前端性能优化
//1、减少 HTTP 请求数量
//2、控制资源文件加载优先级(css -> js)
//3、使用 CDN
//4、减少 DOM 操作
//5、图标使用 IconFont 替换

//箭头函数
//1、简洁
//2、没有自己的this,是在定义的时候处在的对象就是它的this
//3、箭头函数看外层是否有函数,有this就是它的外层,没有就是windows
