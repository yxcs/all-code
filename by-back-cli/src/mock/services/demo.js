// 示例API
export default {
  category: 'demo',
  prefix: '',
  pathList: [
    {key: 'fetchInfo', type: 'get', url: '/info', isMock: false, mockUrl: '/info'},
    {key: 'updateInfo', type: 'post', url: '/info/update', isMock: true},
    {key: 'fetchInfoDetail', type: 'get', url: '/info?id'}
  ]
}
