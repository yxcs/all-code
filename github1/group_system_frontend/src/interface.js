import axios from 'axios';
import * as config from './config.js';

export const addGroup = (params) => {
  return axios.post(
    `${config.baseUrl}:${config.port}/group/add`, {
      ...params
    }
  );
};

export const updateGroup = (params) => {
  return axios.post(
    `${config.baseUrl}:${config.port}/group/update`, {
      ...params
    }
  );
};

export const getAllGroups = (params) => {
  return axios.post(
    `${config.baseUrl}:${config.port}/group/searchList`, {
      ...params
    }
  );
};

export const getGroupDetail = (groupId) => {
  return axios.get(`${config.baseUrl}:${config.port}/group/detail/${groupId}`);
};

export const uploadAvatar = (dataArr) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    let imgFile = new File(dataArr, Date.now() + '.jpg', {type: 'image/jpg'});
    console.log(URL.createObjectURL(imgFile));
    formData.append('imageFile', imgFile);
    // let fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(blob);
    // fileReader.addEventListener('loadend', _ => {
    //   let imgFile = new File(fileReader.result, Date.now() + '.jpg', {type: 'image/jpeg'});
    //   console.log(imgFile);
    //   resolve(formData);
    // });
    resolve(formData);
  }).then(formData => {
    // axios({
    //   url: `http://qf-restapi.mdscj.com/product/image/save`,
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'X-Requested-With': 'XMLHttpRequest',
    //   },
    //   data: formData
    // });
    return 'http://img-prod.kkkd.com/FiqzCHzcPlJbikLt4RTmB6G58sGu'
  });
  // return axios.post(
  //   , {
  //     data: formData
  //   }
  // );
};

export const addRobot = (params) => {
  return axios.post(
    `${config.baseUrl}:${config.port}/robot/save`, {
      ...params
    }
  );
};

export const bindRobot = (params) => {
  return axios.post(
    `${config.baseUrl}:${config.port}/group/bindGroupRobot`, {
      ...params
    }
  );
};

export const getRobotsStatus = (params) => {
  return axios.post(
    `/getRobotsStatus`, {
      ...params
    }
  );
};

export const getAllRobots = (params) => {
  return axios.post(
    `${config.baseUrl}:${config.port}/robot/save`
  );
}

export const getAllActivity = (params) => {
    params.page--;
    return axios.post(
        `${config.baseUrl}:${config.port}/activity/searchList`, {
            ...params
        }
    );
};

export const addActivity = (params) => {
    return axios.post(
        `${config.baseUrl}:${config.port}/activity/save`, {
            ...params
        }
    );
};

export const editActivity = (params) => {
    return axios.post(
        `${config.baseUrl}:${config.port}/activity/bindActivityGroup`, {
            ...params
        }
    );
};

export const getActivityById = (activityId) => {
    return axios.get(
        `${config.baseUrl}:${config.port}/activity/detail/${activityId}`
    );
};

export const getH5Page = (activityId) => {
    return axios({
      url: `${config.baseUrl}:${config.port}/h5/activityDetail/${activityId}`,
      method: 'get',
      withCredentials: true
    });
};