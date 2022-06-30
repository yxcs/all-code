/**
 * Created by j_bleach on 2017/9/9.
 */

import {collectIp} from './ip'

const urls = {
    dicts: 'bdType/dicts',
    checkAccount: 'users/accounts/exist',
    getCode: 'users/cellphone/message/get',
    regist: 'users/phone/register',
    info: 'perfect/user'
}

for (let attr in urls) {
    urls[attr] = collectIp + urls[attr]
}

export default urls;