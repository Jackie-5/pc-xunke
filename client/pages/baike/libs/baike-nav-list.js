/**
 * Created by Jackie.Wu on 2018/7/25.
 */
import React, { Component } from 'react';
import dayjs from 'dayjs';
import './baike-nav-list.less';

const format = 'YYYY-MM-DD HH:mm:ss';

export default class BaikeLeft extends Component{
  render() {
    const { newBaikeList, moreCode, pageName } = this.props;
    return (
      <div className="baike-nav-list">
        <div className="hd clearfix">
          <span className="tit float-left">最新{pageName.name}</span>
          <a
            href={moreCode ? `/${pageName.key}/0${moreCode}` : `/${pageName.key}/list`}
            className="btn-right float-right"
            target="_blank"
          >
            更多
          </a>
        </div>
        <div className="bd">
          {
            newBaikeList && newBaikeList.data.map((item) => (
              <div className="item" key={item.id}>
                <a href={`/${pageName.key}/${item.id}.html`} target="_blank" className="item__a">{item.title}</a>
                <span className="time">{dayjs(item.createTime).format(format)}</span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
