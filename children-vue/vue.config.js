const package  = require('./package');
module.exports = {
    devServer:{
        port:2000
    },
    configureWebpack:{
        output:{
            //library的值在所有子应用中需要唯一
            library:package.name,
            //导出umd格式的包，在全局对象上挂载属性package.name，基座应用需要通过这个全局对象获取一些信息，比如子应用导出的生命周期函数
            libraryTarget:'umd'
        },
    }
}

