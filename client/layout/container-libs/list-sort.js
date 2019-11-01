/**
 * Created by Longe on 2018/7/20.
 */
import React, {Component} from 'react';
import '../../less/list-sort.less';
import {Icon} from 'antd';

class ListSort extends Component {
  render() {
    return (
      /* 搜索条件通用*/
      <div className="list-sort">
        <div className="list-sort__order-tag">
          <a href="#">默认排序</a>
          <a href="#">小区均价</a>
          <a href="#">开盘时间</a>
        </div>
        <div className="list-sort__order-filter">
          <span className="list-sort__order-filter__title">筛选:</span>
          <span className="list-sort__order-filter__list">
            <a href="#"><Icon type="border" theme="outlined"/></a>
            <span>近地铁</span>
          </span>

          <span className="list-sort__order-filter__list">
            <a href="#"><Icon type="border" theme="outlined"/></a>
            <span>近地铁</span>
          </span>


        </div>
      </div>
    );
  }
}

export default ListSort;
