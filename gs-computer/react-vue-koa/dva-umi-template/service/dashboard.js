import request from '@/utils/request';

export async function queryWeather() {
  return request({
    url:'/static/analysis.json',
    method:'get',
    // data:{key:'1467eb89604820aceeaaf84bfc193d22'}
  });
}