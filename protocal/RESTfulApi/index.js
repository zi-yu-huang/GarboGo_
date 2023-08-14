import Vue from "vue";
import { modules } from "@/protocal/RESTfulApi/setting/RESTfulApi-register.js";
Vue.prototype.$api = modules;

export default ({ app }) => {
  app.$api = modules;
};
