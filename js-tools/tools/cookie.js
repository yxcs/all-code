class iCookie {
  constructor() {
  }
  /**
   * 
   * @param {*} sKey 
   */
  get(sKey) {
    if (!sKey) {
      return null;
    }
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  }
  /**
   * 设置cookie
   * @param sKey 存储唯一键
   * @param sValue 存储的值
   * @param vExpires 有效期
   * @param sPath 路径
   * @param sDomain 域名
   * @param bSecure
   * @returns {boolean}
   */
  set(sKey, sValue, vExpires, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = '';
    if (vExpires) {
      switch (vExpires.constructor) {
        case Number:
          sExpires = vExpires === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vExpires;
          break;
        case String:
          sExpires = '; expires=' + vExpires;
          break;
        case Date:
          sExpires = '; expires=' + vExpires.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
    return true;
  }
  /**
   *
   * @memberof iCookie
   */
  remove(sKey, sPath, sDomain) {
    if (!cookie.hasKey(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
    return true;
  }
  /**
   *
   * @param {*} sKey
   * @returns
   * @memberof iCookie
   */
  hasKey(sKey) {
    if (!sKey) {
      return false;
    }
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  }
  /**
   * @returns
   * @memberof iCookie
   */
  keys () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
}