/* eslint-disable */
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
/* eslint-enable */

const Timestamp = new Date().getTime()
const port = process.env.port || process.env.npm_config_port || 8899
const cdnDomian = '/' // cdn域名，如果有cdn修改成对应的cdn
const name = '梧桐综合业务支撑平台' // page title
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
// const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.bootcss.com/js-cookie/2.2.1/js.cookie.min.js'
  ]
}

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'js-cookie': 'Cookies'
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: IS_PRODUCTION ? cdnDomian : '/',
  outputDir: 'web',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api/mock': {
        target: IS_PRODUCTION ? cdnDomian : 'http://yapi.ynimg.cn:8888',
        changeOrigin: true,
        pathRewrite: {
          '/api/mock': '/mock'
        }
      },
      '/api': {
        target: IS_PRODUCTION ? cdnDomian : 'https://szjw-bss-h5.m1.yunniao.cn',
        changeOrigin: true, // needed for virtual hosted sites
        secure: false,
        ws: true, // proxy websockets
        pathRewrite: {
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'), // 主目录
        'views': resolve('src/views'), // 页面
        'components': resolve('src/components'), // 组件
        'api': resolve('src/api'), // 接口
        'utils': resolve('src/utils'), // 通用功能
        'assets': resolve('src/assets'), // 静态资源
        'router': resolve('src/router'), // 路由
        'style': resolve('src/style'), // 通用样式
        'store': resolve('src/store'), // vuex
        'filters': resolve('src/filters'), // 过滤器
        'directives': resolve('src/directives') // 指令
      }
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`
    },
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: 'dcffdeeace6b4aa3a8bc3b1d571be2350b5bb3d456d746759b1157b27f15137e',
        release: process.env.NODE_ENV === 'production',
        org: 'sentry',
        project: 'szjw-h5',
        // webpack specific configuration
        include: process.env.NODE_ENV === 'production' ? './web' : './', // 需要上传到sentry服务器的资源目录,会自动匹配js 以及map文件
        configFile: '.sentryclirc',
        ignore: ['node_modules', 'webpack.config.js'],
        urlPrefix: '~/js' //  线上对应的url资源的相对路径 比如我的域名是 http://XXX  .com/,静态资源都在 static文件夹里面,
      })
    ],
    performance: {
      hints: false
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
    config => {
      const plugins = []
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      // Begin 生成 gzip 压缩文件
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      // End 生成 gzip 压缩文件
      config.plugins = [...config.plugins, ...plugins]
    }
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
    if (IS_PRODUCTION) {
      // config.plugin('analyzer').use(BundleAnalyzerPlugin)
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
      config.externals(externals)
      config.plugin('html').tap(args => {
        args[0].minify.minifyCSS = true // 压缩html中的css
        return args
      })
      // gzip需要nginx进行配合
      config
        .plugin('compression')
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 超过10k进行压缩
            deleteOriginalAssets: false // 是否删除源文件
          }
        ])
      config.optimization
        .minimizer('uglifyjs')
        .use(UglifyjsWebpackPlugin, [{
          // 生产环境推荐关闭 sourcemap 防止源码泄漏
          // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
          // sourceMap: true,
          uglifyOptions: {
            warnings: false,
            compress: {
              /* eslint-disable */
              drop_console: true,
              drop_debugger: true
              /* eslint-disable */
            }
          }
        }])
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!IS_PRODUCTION,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 直接覆盖变量
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // eslint-disable-next-line quotes
          hack: `true; @import "style/vant_variable.less";`
        }
      }
    }
  }
}
