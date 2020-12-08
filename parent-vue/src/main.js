import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {registerApplication,start} from "single-spa";

async function loadScript(url){
    return  new Promise(function (resolve,reject) {
        let script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
    })

}
registerApplication('childrenVue',async ()=>{
    //子应用通过打包生成类库(app.js,chunk-vendors.js)
    //父应用加载子应用文件，需要自己构建script标签。动态插入到head中
    console.log('加载模块')
    await loadScript('http://localhost:2000/js/chunk-vendors.js')
    await loadScript('http://localhost:2000/js/app.js');
    return window.childrenVue;//bootstrap mount unmount
    //用户切换到/vue，执行async方法。
},location => location.pathname.startsWith('/vue'))

//启动
start();

createApp(App).use(router).mount('#app')//挂载到id为childrenVue的标签中
