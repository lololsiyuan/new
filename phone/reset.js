function isIos () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        // return "Android";
        return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // return "iPhone";
        return true
    } else if (u.indexOf('iPad') > -1) {//iPad
        // return "iPad";
        return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        // return "Windows Phone";
        return false
    }else{
        return false
    }
}
(function($){
    $(function() {
      var nua = navigator.userAgent
      var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
      if (isAndroid) {
        $('select.form-control').removeClass('form-control').css('width', '100%')
      }
    })
    function changeWidth() {
        var pxUnit = 37.5;
        var designWid = 1080;
        var winWid = document.body.clientWidth;
        var winHei = document.body.clientHeight;
      if(winWid>designWid){
        winWid=designWid;
      }
        var bl = winWid / designWid;
        document.querySelector('html').style.fontSize = (bl * pxUnit) + 'px';
    };
    $(document).ready(changeWidth);
    $(window).resize(changeWidth);
})(jQuery);