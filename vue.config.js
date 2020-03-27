// 全局使用common.scss

module.exports = {
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             /*
    //               这里使用data会报错，要使用prependData;
    //             */
    //             prependData: `@import "@/mixins/common.scss";`
    //         }
    //
    //     }
    // },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项

        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    devServer: {
        proxy: {
            '/api': {
<<<<<<< HEAD
                 target: 'http://192.168.0.110:8888',//managecenter sellerManagement
=======
                 target: 'http://192.168.0.199:8888',//managecenter sellerManagement
>>>>>>> e522541f6636df109df81127949cd13619aaa379
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
}
