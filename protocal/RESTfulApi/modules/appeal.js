import * as appealMock from "@/protocal/RESTfulApi/mock/appeal";
import { Get, Put } from "@/protocal/RESTfulApi/setting/methods";
const testMode = process.env.TEST_MODE === "T";

const router = {
  APPEAL_LIST: "/appeal", // 取得申訴列表
  APPEAL_INFO: "/appeal/{id}/info", // 取得申訴資訊
  APPEAL_DISMISS: "/appeal/{appealid}/dismiss", // 申訴駁回
  APPEAL_SUCCESS: "/appeal/{appealid}/success" // 申訴成功
};
/** 取得申訴列表
 * @param { Number } page
 * @param { Number } size
 * @param { Array } prdouctid
 * @param { Array } woahid
 * @param { Number } status //申訴狀態
 * @param { Number } sort //排序條件 (1:建立新到舊2:建立舊到新)
 */
export const AppealProductList = () => {
  if (testMode) return appealMock.APPEAL_LIST();
  return Get(router.APPEAL_LIST);
};

/** 取得申訴資訊
 * @param { String } id // 商品id
 */
export const AppealProductInfo = (id) => {
  if (testMode) return appealMock.APPEAL_INFO();
  return Get(router.APPEAL_INFO.replace("{id}", id), null);
};

/** 申訴駁回
 * @param { String } appealid // 申訴id
 */
export const AppealProductDismiss = (appealid) => {
  if (testMode) return appealMock.APPEAL_DISMISS();
  return Put(router.APPEAL_DISMISS.replace("{id}", appealid), null);
};

/** 申訴成功
  * @param { String } appealid // 申訴id
 * }
 */
export const AppealProductSuccess = (appealid) => {
  if (testMode) return appealMock.APPEAL_SUCCESS();
  return Put(router.APPEAL_SUCCESS.replace("{id}", appealid), null);
};
