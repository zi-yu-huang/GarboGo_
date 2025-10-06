import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCsZGzHWmtJDj2WWp7BIOJiD3XSc7IIu3U',
    // AIzaSyCts8rcKuPCUuLcU5pTj7YLiYRHQnEDY5Q
    libraries: 'places' // 可选的libraries参数
  }
})