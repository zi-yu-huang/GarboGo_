export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  env: {
    TEST_MODE: process.env.TEST_MODE || "T", // 測試模式
  },
  head: {
    title: 'GarboGo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsZGzHWmtJDj2WWp7BIOJiD3XSc7IIu3U&libraries=places',
        defer: true,
        async: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
css: [
    // '@/assets/css/app.css'
    {
      src: 'ant-design-vue/dist/antd.less',
      lang: 'less'
    } ,
    '@assets/css/backgroundColor.css'
 ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '~/plugins/vue2-google-maps.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules\/(?!vue-qrcode-reader)/, // Exclude other node_modules except vue-qrcode-reader
        });
      }
    },
    publicPath: '/assets/images/',
    transpile: [
      'vue2-google-maps'
    ],
    loaders: {
      less: {
        lessOptions: {
          strictMath: false,
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#73AA24', // 全局主色
            'link-color': '#E2B801', // 链接色
            'success-color': '#52c41a', // 成功色
            'warning-color': '#faad14', // 警告色
            'error-color': '#f5222d', // 错误色
            'font-size-base': '14px', // 主字号
            'heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
            'text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
            'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
            'disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
            'border-radius-base': '4px', // 组件/浮层圆角
            'border-color-base': '#d9d9d9', // 边框色
            'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
          }
        }
      }
    }
  }
}