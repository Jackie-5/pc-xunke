
function iconRound (pageMap, point, type, icon) {
  this._pageMap = pageMap;
  this._point = point;
  this._type = type;
  this._icon = icon;
}

iconRound.prototype = new window.BMap.Overlay();
iconRound.prototype.initialize = function (map) {
  this._map = map;

  const div = this._div = document.createElement("div");
  div.style.zIndex = new window.BMap.Overlay.getZIndex(this._point.lat);
  if (this._type === 'isMy') {
    div.className = `map-point my__pointer iconfont ${this._icon}`;
  } else {
    div.className = `map-point icon__round iconfont ${this._icon}`;
  }

  this._pageMap.getPanes().labelPane.appendChild(div);

  return div
};

iconRound.prototype.draw = function () {
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = `${pixel.x}px`;
  this._div.style.top = `${pixel.y}px`;
};

module.exports = iconRound;