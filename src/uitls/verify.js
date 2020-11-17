/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  let pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;,\\[\\].<>/?！￥…（）【】‘；：”“。，、？ ]"
  );
  let rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
