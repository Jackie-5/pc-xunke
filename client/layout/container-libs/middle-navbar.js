import React, {Component} from 'react';
import '../../less/middle-navbar.less';
import {Anchor} from 'antd';

class MiddleNavBar extends Component {
  render() {
    return (
            <Anchor offsetTop={10}>
            <div className="middle-navbar">
              <div className="middle-navbar__detail">
                <span className="middle-navbar__detail__item">户型分拣</span>
                <span className="middle-navbar__detail__item">周边配套</span>
                <span className="middle-navbar__detail__item">小区简介</span>
                <span className="middle-navbar__detail__item">看房记录</span>
                <span className="middle-navbar__detail__item">税费计算</span>
              </div>

            </div>
            </Anchor>
    )
  }
}

export default MiddleNavBar;
