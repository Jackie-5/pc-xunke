import React, {Component} from 'react';
import '../../less/sell-house.less';

class sellHouse extends Component {
  render() {
    return (
            <div className="sell-house">
              <div className="sell-house__title">我有房子要卖</div>

              <div className="sell-house__item">
                <div className="sell-house__item__img">
                  <img src="https://s1.ljcdn.com/feroot/pc/asset/ershoufang/component/img/yezhu-gujia.png"/>
                  <em></em>
                  <div className="sell-house__item__desc1">不知道如何定价</div>
                  <div className="sell-house__item__desc2">每天超过30000次估价请求量</div>
                  <div className="sell-house__item__desc3">
                    <a href="#">我要估价 ></a>
                  </div>
                </div>

              </div>

              <div className="sell-house__item">
                <div className="sell-house__item__img">
                  <img src="https://s1.ljcdn.com/feroot/pc/asset/ershoufang/component/img/yezhu-maifang.png"/>
                  <em></em>
                  <div className="sell-house__item__desc1">把房源委托给链家</div>
                  <div className="sell-house__item__desc2">10万+专业经纪人·8000+链家门店</div>
                  <div className="sell-house__item__desc3">
                    <a href="#">发布房源 ></a>
                  </div>
                </div>

              </div>

              <div className="sell-house__item">
                <div className="sell-house__item__img">
                  <img src="https://s1.ljcdn.com/feroot/pc/asset/ershoufang/component/img/yezhu-xiazai.png"/>
                  <em></em>

                  <div className="sell-house__item__desc1">已有房源在链家销售</div>
                  <div className="sell-house__item__desc2">去链家APP业主中心管理委托</div>
                  <div className="sell-house__item__desc3">
                    <a href="#">去APP管理委托 ></a>
                  </div>

                </div>


              </div>

            </div>
    )
  }
}


export default sellHouse;
