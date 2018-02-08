/*
* @Author: 20180129
* @Date:   2018-02-08 11:03:09
* @Last Modified by:   20180129
* @Last Modified time: 2018-02-08 11:08:24
*/
var HOST = "http://"+window.location.host+'/php/html/statistics';//wx.ana.mtq.tvm.cn
var HOSTana="http://"+window.location.host;
var storage = window.localStorage;
var colorsb=['#44C8D2','#F9B700', '#EB6100', '#009944', '#EB6877','#8096CA','#FF00FF','#00FF00','#FFFF00'];
function loadfun(e){
  if($(e).parent().hasClass('whirl')==(-1)) {
  }else{
    $(e).parent().addClass('whirl');
    $(e).parent().addClass('traditional');
  }
};
function rmloadfun(e){
  $(e).parent().removeClass('whirl');
  $(e).parent().removeClass('traditional');
};
(function($) {
var ajaxQueue = $({});
$.ajaxQueue = function( ajaxOpts ) {
    var jqXHR,
        dfd = $.Deferred(),
        promise = dfd.promise();
    ajaxQueue.queue( doRequest );
    // 娣诲姞涓柇ajax鏂规硶
    promise.abort = function( statusText ) {
        if ( jqXHR ) {
            return jqXHR.abort( statusText );
        }
        var queue = ajaxQueue.queue(),
            index = $.inArray( doRequest, queue );
        if ( index > -1 ) {
            queue.splice( index, 1 );
        }
        dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
        return promise;
    };
    function doRequest( next ) {
        jqXHR = $.ajax( ajaxOpts )
            .done( dfd.resolve )
            .fail( dfd.reject )
            .then( next, next );
    }
    return promise;
};
})(jQuery);
//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
if(getQueryString('linkpam')==1||getQueryString('linkpam')=='1'){
  storage.linkpam='&redis_cache=1';
}else{
  storage.linkpam='';
}
//包装请求
function getData(url,callback,id,mun){
  var linkul=url+storage.linkpam;
  var stimes=5000;
  if(mun>0){
    stimes=mun;
  }
  $.ajaxQueue({
    url: linkul,
    dataType: "json",
    timeout:stimes,}).done(function(data){
      callback(data,id);
    }).fail(function(data){
      var _data = {
        status: "fail"
      }
      if (data.statusText == 'timeout') {
        _data.status = 'timeout';
      }
      callback(_data,id);
    })
}

//时间格式
function changeTime(num){
    var time2 = new Date(parseInt(num)).Format("yyyy-MM-dd hh:mm:ss");
    var labletime = time2.toLocaleString();
    var imtime = labletime.substring(10,21);
    return imtime;
}
//时间格式
Date.prototype.Format = function(mask) {
  var d = this;
  var zeroize = function(value, length) {
    if (!length) length = 2;
    value = String(value);
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0';
    }
    return zeros + value;
  };

  return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
    switch ($0) {
      case 'd':
        return d.getDate();
      case 'dd':
        return zeroize(d.getDate());
      case 'ddd':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
      case 'dddd':
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
      case 'M':
        return d.getMonth() + 1;
      case 'MM':
        return zeroize(d.getMonth() + 1);
      case 'MMM':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
      case 'MMMM':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
      case 'yy':
        return String(d.getFullYear()).substr(2);
      case 'yyyy':
        return d.getFullYear();
      case 'h':
        return d.getHours() % 24 || 00;
      case 'hh':
        return zeroize(d.getHours() % 24 || 00);
      case 'H':
        return d.getHours();
      case 'HH':
        return zeroize(d.getHours());
      case 'm':
        return d.getMinutes();
      case 'mm':
        return zeroize(d.getMinutes());
      case 's':
        return d.getSeconds();
      case 'ss':
        return zeroize(d.getSeconds());
      case 'l':
        return zeroize(d.getMilliseconds(), 3);
      case 'L':
        var m = d.getMilliseconds();
        if (m > 99) m = Math.round(m / 10);
        return zeroize(m);
      case 'tt':
        return d.getHours() < 12 ? 'am' : 'pm';
      case 'TT':
        return d.getHours() < 12 ? 'AM' : 'PM';
      case 'Z':
        return d.toUTCString().match(/[A-Z]+$/);
        // Return quoted strings with the surrounding quotes removed
      default:
        return $0.substr(1, $0.length - 2);
    }
  });
};
//百分比
function banfY(x,y){
  var _bili=0;
  var obj={
      x:parseInt(x)||0,
      y:parseInt(y)||0
  }
  if(y!=0){
      _bili=parseInt(obj.x*10000/obj.y)/100;
  }
  return _bili;
}
//
function isEmptyObject(obj){
    for(var n in obj){return false}
    return true;
}
(function(window, document, $, undefined){

  $(function(){

    // POPOVER
    // -----------------------------------

    $('[data-toggle="popover"]').popover();

    // TOOLTIP
    // -----------------------------------

    $('[data-toggle="tooltip"]').tooltip({
      container: 'body'
    });

    // DROPDOWN INPUTS
    // -----------------------------------
    $('.dropdown input').on('click focus', function(event){
      event.stopPropagation();
    });

  });

})(window, document, window.jQuery);
function formatNum(num) {
  num=num*1;
  var str=num.toLocaleString();
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(str)) {
      return str;
  }
  var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
  var re = new RegExp("(\\d)(\\d{3})(,|$)");
  while (re.test(b))   b = b.replace(re, "$1,$2$3");
  return a + "" + b + "" + c;
}
function makeUrl(){
  var url =window.location.href;
  console.log(url);
  if(url.indexOf("?")==(-1)){
    window.location.href=url+'?linkpam=1';
  }else{
    var num=url.indexOf('?');
    var resrl=url.substring(0,num);
    window.location.href=resrl+'?linkpam=1';
  }
}
function makeTooltip(){
  /* body... */
  var ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) {
      $('.yeolink').on('click', function(e){
        $(this).siblings('.lscom').toggle();
      });
  } else if (/android/.test(ua)) {
      $('.yeolink').on('click', function(e){
        $(this).siblings('.lscom').toggle();
      });
  }else{
    $('.yeolink').on('mouseover mouseout', function(e){
      $(this).siblings('.lscom').toggle();
    });
  }
}
function getDates(days){
  var now=new Date();
  if(days>=1){now=new Date(now.getTime()-86400000*days);}
  var yyyy=now.getFullYear(),mm=(now.getMonth()+1).toString(),dd=now.getDate().toString();
  if(mm.length==1){mm='0'+mm;} if(dd.length==1){dd='0'+dd;}
  return (yyyy+'-'+mm+'-'+dd);
}