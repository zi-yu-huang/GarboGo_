import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCts8rcKuPCUuLcU5pTj7YLiYRHQnEDY5Q',
    libraries: 'places' // 可选的libraries参数
  }
})