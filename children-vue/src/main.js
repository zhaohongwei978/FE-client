import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

const appOptions = {
    el: "#childrenVue",
    router,
    render: h => h(App)
};

// 支持应用独立运行、部署，不依赖于基座应用
console.log('----window-',window)
//动态设置子应用publicPath·
if (!window.singleSpaNavigate) {
    delete appOptions.el
    new Vue(appOptions).$mount('#app')
}else{
    //在页面跳转前拼绝对路径
    __webpack_public_path__ = 'http://localhost:2000/'
}

// singleSpaVue包装一个vue微前端服务对象
const vueLifecycle = singleSpaVue({
    Vue,
    appOptions
});
// 导出生命周期对象
// 启动时
export const bootstrap = vueLifecycle.bootstrap;
// 挂载时
export const mount  = vueLifecycle.mount;
// 卸载时
export const unmount = vueLifecycle.unmount;
