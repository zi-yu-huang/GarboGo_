import * as appealMock from "@/protocal/RESTfulApi/mock/appeal";
import { Post} from "@/protocal/RESTfulApi/setting/methods";
const testMode = process.env.TEST_MODE === "T";

const router ={
  FAVORITE_INFO: " /{id}"
};

/**取得使用者收藏清單
 * @param { String } id //使用者id
 */
export const FavoriteTrashInfo = (id) =>{
  if (testMode) return appealMock.FAVORITE_INFO();
  return Post(router.FAVORITE_INFO.replace("{id}", id), null);
}