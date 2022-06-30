import axios from 'axios';
import config from '../config';

// formData 上传
export function upload (formEle, callback) {
  let request = new XMLHttpRequest();
  request.open('POST', `${config.host}:${config.port}/scanqrcode/uploadQrcodeExcel`);
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      callback(request);
    }
  }
  request.send(new FormData(formEle));
}

export function addAccount (data) {
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/account/saveWeiXinAccount`,
    data
  });
}

export function getData (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/scanqrcode/searchScanQrcode`,
    data
  });
}

export function getWxAccount (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/account/getList`,
    data
  });
}


