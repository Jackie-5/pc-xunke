/**
 * Created by Jackie.Wu on 2018/8/21.
 */
const _ = require('lodash');

const getCurrentCity = (cityList = [], cityCode) => {
  let currentCity = {};
  const cloneCityList = _.cloneDeep(cityList);
  const recursion = (list) => {
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];

      if (item.firstLetters === cityCode) {
        if (item.childs) {
          delete item.childs;
        }
        currentCity = item;
      } else {
        if (item.childs && item.childs.length > 0) {
          recursion(item.childs)
        }
      }

    }
  };
  for (let i = 0; i < cloneCityList.length; i += 1) {
    const item = cloneCityList[i];
    if (item.firstLetters === cityCode) {
      if (item.childs) {
        delete item.childs;
      }
      currentCity = item;
    } else {
      if (item.childs && item.childs.length > 0) {
        recursion(item.childs)
      }
    }
  }

  return currentCity;
};

module.exports = {
  numberSplit: (num) => {
    num = num + '';
    if (!num.includes('.')) {
      num += '.'
    }
    return num.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
      return $1 + ',';
    }).replace(/\.$/, '');
  },
  parseJSON: (json) => {
    let params = undefined;
    try {
      params = JSON.parse(decodeURIComponent(json));
    } catch (e) {
    }
    return params
  },
  getCurrentCity,
  matchNumber: new RegExp("^[0-9]*[1-9][0-9]*$"),
  splitNumber: /[^0-9]/ig,

  ershoufangCondition: (options = {}) => {
    const {
      cityId,
      cityAreaId,
      businessCircle,
      subwayLineCode,
      subwayStationCode,
      sellingPriceMin,
      sellingPriceMax,
      patternRoom,
      buildingAreaMin,
      buildingAreaMax,
      faceTypeId,
      decorationTypeId,
      houseTypeId,
      searchQuery,
      host,
    } = options;
    let queryString = "*:*";

    // 城市
    if (cityId) {
      queryString += ' AND cityCode:' + cityId;
    }

    // 区域 商圈
    // 因为 城市区域不限与商圈不限 上面不对 只能先弄成 城市区域与商圈 必须选
    if (cityAreaId && businessCircle) {
      queryString += ' AND areaCode:' + cityAreaId + ' AND businessCode:' + businessCircle
    }

    // 地铁线 与 地铁站 （这里不应该 必须同时存在 ）
    if (subwayLineCode && subwayStationCode) {
      queryString += ' AND subwayLineCode:' + subwayLineCode + ' AND subwayStationCode:' + subwayStationCode
    }

    // 价格
    if (sellingPriceMin && sellingPriceMax) {
      queryString += ' AND sellPrice:[' + sellingPriceMin + ' TO ' + sellingPriceMax + ']'

    }

    // 户型
    if (patternRoom) {
      queryString += ' AND roomNum:(' + patternRoom.replace(/,/g, " OR ") + ')'
    }

    // 更多 面积
    if (buildingAreaMin && buildingAreaMax) {
      queryString += ' AND houseArea:[' + buildingAreaMin + ' TO ' + buildingAreaMax + ']'
    }

    // 更多 朝向
    if (faceTypeId) {
      queryString += ' AND houseOrientationName:' + faceTypeId;
    }

    // 更多 装修
    if (decorationTypeId) {
      queryString += ' AND decorationTypeName:' + decorationTypeId;
    }

    // 更多 类型
    if (houseTypeId) {
      if (houseTypeId === '其他') {
        queryString += ' AND propertyTypeName:' + '"' + '"';
      } else {
        queryString += ' AND propertyTypeName:' + houseTypeId;
      }
    }

    if (searchQuery){
      queryString += ' AND residentialQuartersName:'+searchQuery + '*'
    }

    if (host) {
      queryString += ` AND domain:${host}`;
    } else {
      queryString += ' AND domain:www.yuanhaowang.com';
    }

    return queryString
  },

  loupanCondition: (options = {}) => {
    const {
      cityId,
      cityAreaId,
      businessCircle,
      subwayLineCode,
      subwayStationCode,
      sellingPriceMin,
      sellingPriceMax,
      patternRoom,
      buildingAreaMin,
      buildingAreaMax,
      faceTypeId,
      decorationTypeId,
      houseTypeId,
      searchQuery,
      host,
    } = options;
    let queryString = "*:*";

    // 城市
    if (cityId) {
      queryString += ' AND cityCode:' + cityId;
    }

    // 区域 商圈
    // 因为 城市区域不限与商圈不限 上面不对 只能先弄成 城市区域与商圈 必须选
    if (cityAreaId && businessCircle) {
      queryString += ' AND areaCode:' + cityAreaId + ' AND businessCode:' + businessCircle
    }

    // 地铁线 与 地铁站 （这里不应该 必须同时存在 ）
    if (subwayLineCode && subwayStationCode) {
      queryString += ' AND subwayLineCode:' + subwayLineCode + ' AND subwayStationCode:' + subwayStationCode
    }

    // 价格
    if (sellingPriceMin && sellingPriceMax) {
      queryString += ' AND referenceAveragePrice:[' + sellingPriceMin + ' TO ' + sellingPriceMax + ']'
    }

    // 户型
    if (patternRoom) {
      queryString += ' AND roomLayout:(' + patternRoom.replace(/,/g, " OR ") + ')'
    }

    // 更多 面积
    if (buildingAreaMin && buildingAreaMax) {
      queryString += ' AND houseArea:[' + buildingAreaMin + ' TO ' + '*]'
      queryString += ' AND houseArea:[*' + ' TO ' + buildingAreaMax + ']'
    }

    // 更多 朝向
    if (faceTypeId) {
      queryString += ' AND houseOrientationName:' + faceTypeId;
    }

    // 更多 装修
    if (decorationTypeId) {
      queryString += ' AND renovationName:' + decorationTypeId;
    }

    // 更多 类型
    if (houseTypeId) {
      if (houseTypeId === '其他') {
        queryString += ' AND propertyTypeName:' + '"' + '"';
      } else {
        queryString += ' AND propertyTypeName:' + houseTypeId;
      }
    }

    if (searchQuery){
      queryString += ' AND residentialQuartersName:'+searchQuery + '*'
    }

    if (host) {
      queryString += ` AND domain:${host}`;
    } else {
      queryString += ' AND domain:www.yuanhaowang.com';
    }

    return queryString
  },

  xinfangCondition: (options = {}) => {
    const {
      cityId,
      cityAreaId,
      businessCircle,
      subwayLineCode,
      subwayStationCode,
      sellingPriceMin,
      sellingPriceMax,
      patternRoom,
      buildingAreaMin,
      buildingAreaMax,
      faceTypeId,
      decorationTypeId,
      houseTypeId,
      searchQuery,
      host,
    } = options;

    let queryString = "*:*";

    // 城市
    if (cityId) {
      queryString += ' AND cityCode:' + cityId;
    }

    // 区域 商圈
    // 因为 城市区域不限与商圈不限 上面不对 只能先弄成 城市区域与商圈 必须选
    if (cityAreaId && businessCircle) {
      queryString += ' AND areaCode:' + cityAreaId + ' AND businessCode:' + businessCircle
    }

    // 地铁线 与 地铁站 （这里不应该 必须同时存在 ）
    if (subwayLineCode && subwayStationCode) {
      queryString += ' AND subwayLineCode:' + subwayLineCode + ' AND subwayStationCode:' + subwayStationCode
    }

    // 价格
    if (sellingPriceMin && sellingPriceMax) {
      queryString += ' AND avgPrice:[' + sellingPriceMin + ' TO ' + sellingPriceMax + ']'

    }

    // 户型
    if (patternRoom) {
      // queryString += ' AND roomNum:(' + patternRoom.replace(/,/g, " OR ") + ')'
    }

    // 更多 面积
    if (buildingAreaMin && buildingAreaMax) {
      queryString += ' AND houseArea:[' + buildingAreaMin + ' TO ' + buildingAreaMax + ']'
    }

    // 更多 朝向
    if (faceTypeId) {
      queryString += ' AND houseOrientationName:' + faceTypeId;
    }

    // 更多 装修
    if (decorationTypeId) {
      queryString += ' AND decorationTypeName:' + decorationTypeId;
    }

    // 更多 类型
    if (houseTypeId) {
      if (houseTypeId === '其他') {
        queryString += ' AND propertyTypeName:' + '"' + '"';
      } else {
        queryString += ' AND propertyTypeName:' + houseTypeId;
      }
    }

    if (searchQuery){
      queryString += ' AND residentialQuartersName:'+searchQuery + '*'
    }

    if (host) {
      queryString += ` AND domain:${host}`;
    } else {
      queryString += ' AND domain:www.yuanhaowang.com';
    }

    return queryString
  }

};
