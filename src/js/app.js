import QRCode from "./qrcode.js"
var payConfig = {
    default: "qq",
    accounts: {
        union: window.location.href,
        wechat: "wxp://f2f02GzFmyrYxJm05fLUsYq-ggPxSbtiHk5Z",
        alipay: "HTTPS://QR.ALIPAY.COM/FKX02077PXMEKZPFY2B4E4",
        qq: "https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&a=1&u=10626296&ac=787F9E395ADAC51331F1EFB1D4FCD2F53AEA141B073F9DD96B547E612FC00A8D&n=jsser&f=wallet"
    }
};

var uaCheck = {
    isAlipay: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/AlipayClient/i) == "alipayclient") {
            return true;
        }
        return false;
    },
    isWechat: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    },
    isSjQQ: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/qq\//i) == "qq/" && this.isMobile()) {
            return true;
        }
        return false;
    },
    isAndroid: function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
    },
    isIphone: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
            return true;
        }
        return false;
    },
    isMobile: function () {
        return this.isAndroid() || this.isIphone();
    },
    isPc: function () {

    }
};

var utils = {};

utils.ele = function (ele) {
    return document.getElementById(ele);
};


var eventBus = {
    alipay: function () {
        utils.ele("header").style.backgroundColor = "#2389d0";
        setTimeout(function () {
            utils.ele("pay-title").innerText = "正在进行支付宝支付...";
            window.location.href = payConfig.accounts.alipay;
        }, 500);
    },
    wechat: function () {
        utils.ele("pay-title").innerText = "正在进行微信支付...";
        document.title = "长按二维码";
        utils.ele("qrcode-text").innerText = "请长按二维码完成支付";
    },
    qq: function () {
        utils.ele("header").style.backgroundColor = "#4998e7";
        utils.ele("pay-title").innerText = "正在进行QQ钱包支付...";
        document.title = "长按二维码";
        utils.ele("qrcode-text").innerText = "请长按二维码完成支付";
    },
    default: function () {

    }
};

var dispatch = "union";

if (uaCheck.isAlipay()) {
    eventBus.alipay();
} else if (uaCheck.isWechat()) {
    eventBus.wechat();
    dispatch = "wechat";
} else if (uaCheck.isSjQQ()) {
    eventBus.qq();
    dispatch = "qq";
} else {
    eventBus.default();
}

eventBus.init = function () {
    var qrcode = new QRCode("qrcode");
    qrcode.makeCode(payConfig.accounts[dispatch]);
    utils.ele("qrcode").removeAttribute("title");
};

eventBus.init();