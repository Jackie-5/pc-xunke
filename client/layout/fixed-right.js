/**
 * Created by JackieWu on 2018/7/20.
 */

import React, { Component } from 'react';
import { Tooltip, Popover } from 'antd';
import '../less/layout-fixed.less';

const itemJson = [
  {
    "name": "清单",
    "icon": "icon-qingdan",
    "pop": "tips",
    "key": "icon-qingdan"
  },
  {
    "name": "收藏",
    "icon": "icon-shoucang",
    "pop": "tips",
    "key": "icon-shoucang"
  },
  {
    "name": "卖房",
    "icon": "icon-woyaomaifang",
    "pop": "tips",
    "key": "icon-woyaomaifang"
  },
  {
    "name": "工具",
    "icon": "icon-fangdaigongju",
    "pop": "tips",
    "key": "icon-fangdaigongju"
  },
  {
    "name": "扫一扫",
    "icon": "icon-saoyisao",
    "pop": "left",
    "key": "icon-saoyisao",
    "ImgSrc": "http://su.xunkw.com/static/images/erweima.jpg"
  },
  {
    "name": "反馈",
    "icon": "icon-fankui",
    "pop": "tips",
    "key": "icon-fankui"
  },
  {
    "name": "顶部",
    "icon": "icon-top",
    "pop": "tips",
    "key": "icon-top"
  }
];

class FixedRight extends Component {
  render() {
    return (
      <div className="layout-fixed-right">
        <table>
          <tbody>
          <tr>
            <td>
              {
                itemJson.map((item) => (
                  item.pop === 'tips' ?
                    <Tooltip title={item.name} placement="left" key={item.key}>
                      <div className={`layout-fixed-right__icon iconfont ${item.icon}`}/>
                    </Tooltip>
                    :
                    <Popover
                      placement="left"
                      title={item.name}
                      key={item.key}
                      content={
                        <div className="layout-fixed-right__img">
                          <img src={item.ImgSrc}/>
                        </div>
                      }>
                      <div className={`layout-fixed-right__icon iconfont ${item.icon}`}/>
                    </Popover>
                ))
              }
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default FixedRight
