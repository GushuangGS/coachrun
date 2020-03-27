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