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
  };
  request.send(new FormData(formEle));
}

export function saveWxGroup (data) {
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/saveGroup`,
    data
  });
}

export function getGroupList (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/weixinGroup/list`,
    data
  });
}

export function saveWxAccount (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/saveAccount`,
    data
  });
}

export function getWxList (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/weixinAccount/list`,
    data
  });
}

export function bindWxGroup (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/bindAccountGroup`,
    data
  });
}

export function wxGroupDetails (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/mine/weixinGroup/list`,
    data
  });
}

/**  小程序相关 **/

// 添加标签
export function addVideoTag (data) {
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/wzry/addTag`,
    data
  });
}

// 获取标签
export function getTagList (data) {
  return axios.get(`${config.host}:${config.port}/wzry/getTagList`);
}

// 绑定&解绑标签和视频
export function bindTag2Video (data) {
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/wzry/bindVideoTag`,
    data
  });
}

// 根据标签获取视频列表
export function getVideoByTag (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/wzry/getVideoByTag`,
    data
  });
}

// 获取单个视频详情
export function getVideoDetail (videoId) {
  return axios.get(`${config.host}:${config.port}/wzry/getVideoDetail/${videoId}`);
}

// 获取视频列表
export function getVideosAll (data) {
  data.page --;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/wzry/getVideoList`,
    data
  });
}

// 删除标签
export function deleteTag (tagId) {
  return axios.get(`${config.host}:${config.port}/wzry/deleteTag/${tagId}`);
}
