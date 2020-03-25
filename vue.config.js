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
    devServer: {
        proxy: {
            '/api': {
                 target: 'http://192.168.0.199:8888',//managecenter sellerManagement
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
}
