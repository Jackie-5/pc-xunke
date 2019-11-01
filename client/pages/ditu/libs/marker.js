/*
 * @Author: Jackie.Wu
 * @Date: 2018-09-23 13:19:46
 * @LastEditors: 
 * @LastEditTime: 2018-09-23 13:30:51
 * @Description: 
 */

// 第一层样式
export function firstCustomRound (pageMap, point, options) {
  this._pageMap = pageMap;
  this._point = point;
  this._options = options;
}

firstCustomRound.prototype = new window.BMap.Overlay();
firstCustomRound.prototype.initialize = function (map) {
  this._map = map;

  const div = this._div = document.createElement("div");
  div.className = 'map-round J_map-round';

  div.style.zIndex = new window.BMap.Overlay.getZIndex(this._point.lat);
  div.setAttribute('data-id', this._options.areaCode);
  div.setAttribute('data-x', this._options.xaxis);
  div.setAttribute('data-y', this._options.yaxis);
  div.innerHTML = `<span class="map-round__name" data-x="${this._options.xaxis}" data-y="${this._options.yaxis}" >${this._options.areaName}</span><span class="map-round__number" data-x="${this._options.xaxis}" data-y="${this._options.yaxis}">${this._options.houseCount}套</span>`

  this._pageMap.getPanes().labelPane.appendChild(div);

  return div
};
firstCustomRound.prototype.draw = function () {
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = `${pixel.x}px`;
  this._div.style.top = `${pixel.y}px`;
};
// 第二层样式
export function secondCustomRound (pageMap, point, options) {
  this._pageMap = pageMap;
  this._point = point;
  this._options = options;
}

secondCustomRound.prototype = new window.BMap.Overlay();
secondCustomRound.prototype.initialize = function (map) {
  this._map = map;

  const div = this._div = document.createElement("div");
  div.className = 'map-round J_map-round';

  div.style.zIndex = new window.BMap.Overlay.getZIndex(this._point.lat);
  div.setAttribute('data-id', this._options.areaCode);
  div.setAttribute('data-x', this._options.xaxis);
  div.setAttribute('data-y', this._options.yaxis);
  div.innerHTML = `<span class="map-round__name" data-x="${this._options.xaxis}" data-y="${this._options.yaxis}" >${this._options.areaName}</span><span class="map-round__number" data-x="${this._options.xaxis}" data-y="${this._options.yaxis}">${this._options.houseCount}套</span>`

  this._pageMap.getPanes().labelPane.appendChild(div);

  return div
};
secondCustomRound.prototype.draw = function () {
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = `${pixel.x}px`;
  this._div.style.top = `${pixel.y}px`;
};
// 第三层样式
export function thirdCustomRound (pageMap, point, options) {
  this._pageMap = pageMap;
  this._point = point;
  this._options = options;
}

thirdCustomRound.prototype = new window.BMap.Overlay();
thirdCustomRound.prototype.initialize = function (map) {
  this._map = map;

  const div = this._div = document.createElement("div");
  div.className = 'map-info J_map-info';

  div.style.zIndex = new window.BMap.Overlay.getZIndex(this._point.lat);
  div.setAttribute('data-id', this._options.id);
  div.setAttribute('data-x', this._options.xaxis);
  div.setAttribute('data-y', this._options.yaxis);
  div.innerHTML = `<span class="map-info__name" data-id="${this._options.id}" data-x="${this._options.xaxis}" data-y="${this._options.yaxis}">${this._options.areaName}</span><span class="map-info__number" data-id="${this._options.id}" data-x="${this._options.xaxis}" data-y="${this._options.yaxis}">均价:${this._options.avgPrice}万/平<span style="margin-left:3px" data-id="${this._options.id}" data-x="${this._options.xaxis}" data-y="${this._options.yaxis}">${this._options.houseCount}套</span></span>`

  this._pageMap.getPanes().labelPane.appendChild(div);

  return div
}
thirdCustomRound.prototype.draw = function () {
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = `${pixel.x}px`;
  this._div.style.top = `${pixel.y}px`;
};

export function addActive (id) {
  [].forEach.call(document.querySelectorAll('.J_map-info'), function (e){
    e.classList.remove('acitve-pointer');
    e.style.zIndex = 0;
    if (e.getAttribute('data-id') === id) {
      e.style.zIndex = 1;
      e.classList.add('acitve-pointer');
    }
  })
}
