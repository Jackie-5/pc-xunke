/**
 * Created by Jackie.Wu on 2018/8/6.
 */
const prefix = 'apis';
const routers = [
  // {
  //   url: '/getCity',
  //   method: ['get', 'post'],
  //   action: ['/api/get-city']
  // },
  // 地图找房
  {
    url: '/map/mapEsf',
    method: ['get', 'post'],
    action: ['/apis/map/mapEsf']
  },
  {
    url: '/map/getMapDetailInfo',
    method: ['get', 'post'],
    action: ['/apis/map/getDetailInfo']
  },
  {
    url: '/map/search',
    method: ['get', 'post'],
    action: ['/apis/map/search']
  },
  {
    url: '/baike/search/:pageName',
    method: ['get'],
    action: ['/apis/baike/search']
  },
  {
    url: '/my/sendCode',
    method: ['get'],
    action: ['/apis/my/sendCode']
  },
  {
    url: '/my/sendCode',
    method: ['get'],
    action: ['/apis/my/sendCode']
  },
  {
    url: '/imageCode',
    method: ['get'],
    action: ['/apis/imageCode']
  },
];

module.exports = {
  prefix,
  routers,
};