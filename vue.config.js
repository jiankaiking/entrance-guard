// 全局使用common.scss

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                /*
                  这里使用data会报错，要使用prependData;
                */
                prependData: `@import "@/mixins/common.scss";`
            }

        }
    },
}
