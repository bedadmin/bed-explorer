import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import Routers from './router';
import store from './store/store';
import Util from './libs/util';
import $ from 'jquery';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import async from 'async';

import Vtip from 'vtip';
import 'vtip/lib/index.min.css';
import accounting from 'accounting';
import moment from "moment";
import echarts from 'echarts';
import 'amfe-flexible/index.js';
import './my-theme/index.less';
import config from './config/config';

Vue.prototype.$echarts = echarts
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Vtip.directive)

const RouterConfig = {
    mode: 'history',
    routes: Routers,
    // saveScrollPosition: true,
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});

//同步获取服务器表格程序
function slotchats(indexs, data) {

    return new Promise(function(resolve, reject) {
        $.getJSON("http://47.242.50.5:8004/api/BED/mainnet/tx/newest/getslotinfo?slot=" + indexs, function(text, status) {
            if (!text.error) {
                resolve({ 'index': indexs, "price": text.price / Math.pow(10, 8) })
                    // store.commit('gettotallchats', { slotcharts: { 'index': indexs, "price": text.price } })
            } else {
                reject("err!");
            }
        })
    })
}




function dataarry(i, data) {
    return new Promise(function(resolve, reject) {
        var p = slotchats(i, data)
        p.then(function(charts) {
            resolve(charts)
        })
    })
}




function getslotarry() {
    $.getJSON("http://47.242.50.5:8004/api/BED/mainnet/tx/newest/getslotinfo", function(data, status) {
        if (!data.error) {
            var sum = [];
            store.commit('gettotalslot', { slotindex: data.index, slotprice: data.price, slotlock: data.locktime, slotcount: data.count })
            for (var i = 0; i <= data.index; i++) {
                dataarry(i, data).then(function(charts) {
                    sum.push(charts)
                });
            }
            store.commit('gettotallchats', { slotcharts: sum })
        }
    })

}


getslotarry();

$.ajaxSetup({
    timeout: 60000,
    complete: function(XMLHttpRequest, status) {
        iView.LoadingBar.finish();
    },
    beforeSend: function(XMLHttpRequest) {
        iView.LoadingBar.start();
    },
    error: function(XMLHttpRequest, status, e) {
        if (XMLHttpRequest.status > 500) {
            store.commit('errorMessage', {
                status: true,
                msg: 'Server Error...'
            });
            setTimeout(() => store.commit('errorMessage', {
                status: false,
                msg: ''
            }), 3000);
        }
        if (status == "timeout") {
            store.commit('errorMessage', {
                status: true,
                msg: 'Timeout...'
            });
            setTimeout(() => store.commit('errorMessage', {
                status: false,
                msg: ''
            }), 3000);
        }
        return false;
    }
});




Vue.prototype.$tip = Vtip.tip
Vue.prototype.$accounting = accounting;
Vue.filter("currency", function(value) {
    return Vue.prototype.$accounting.formatMoney(value, '')
})
Vue.filter("Number", function(value) {
    return Vue.prototype.$accounting.formatNumber(value, 0, ",", ".")
})
Vue.filter("timeFormat", function(value) {
    return moment(value * 1000).format("YYYY-MM-DD HH:mm:ss")
})