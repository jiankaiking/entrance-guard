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
                 target: 'http://192.168.0.110:8888',//managecenter sellerManagement
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
}
