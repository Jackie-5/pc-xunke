/**
 * Created by Longe on 2018/7/20.
 */
import React, {Component} from 'react';
import '../../less/list-search.less';
import {Icon, Input, Button} from 'antd';

const listSearchRenderByPosition = (positionListJson) => (
  positionListJson.map((item) =>
    <div className="list-search__position__item">
      <a href="#">{item.name}</a>
      <div className="list-search__position__item__area">
        <a href="#">{item.name}</a>
      </div>
    </div>
  )
)

const listSearchRenderByOther = (otherListJson) => (
  otherListJson.map((item, index) =>
    <div className="list-search__position__item__other" key={index}>
      <Icon type="border" theme="outlined"/>
      <span>{item.name}</span>
    </div>
  )
)

class ListSearch extends Component {


  render() {
    const positionListJson = this.props.positionListJson;
    return (
      /* 搜索条件通用*/
      <div className="list-search">

        <div className="list-search__position">
          <span className="list-search__position__title">位置</span>
          <span className="list-search__position__title-sub">区域</span>
          <Icon type="down" theme="outlined"/>

          <div className="list-search__position__detail">
            {listSearchRenderByPosition(positionListJson)}
          </div>
        </div>


        <div className="list-search__other">
          <span className="list-search__other__title">位置</span>
          <div className="list-search__other__desc">
            {listSearchRenderByOther(positionListJson)}
          </div>
        </div>


        <div className="list-search__other">
          <span className="list-search__other__title">位置</span>
          <div className="list-search__other__desc">
            {listSearchRenderByOther(positionListJson)}
          </div>
        </div>

        <div className="list-search__other">
          <span className="list-search__other__title">位置</span>
          <div className="list-search__other__desc">
            {listSearchRenderByOther(positionListJson)}
          </div>
        </div>

        <div className="list-search__number">
          <span className="list-search__number__title">位置</span>
          <div className="list-search__number__desc">
            {listSearchRenderByOther(positionListJson)}
          </div>
          <div className="list-search__number__bettween">
            <div className="list-search__number__bettween__input">
              <Input placeholder="最小" size="small" style={{width: 50}}/>
              -
              <Input placeholder="最小" size="small" style={{width: 50}}/>

            </div>
            <div className="list-search__number__bettween__confirm">
              <Button type="primary" size="small">确定</Button>
            </div>

          </div>
        </div>

        <div className="list-search__number">
          <span className="list-search__number__title">位置</span>
          <div className="list-search__number__desc">
            {listSearchRenderByOther(positionListJson)}
          </div>
          <div className="list-search__number__bettween">
            <div className="list-search__number__bettween__input">
              <Input placeholder="最小" size="small" style={{width: 50}}/>
              -
              <Input placeholder="最小" size="small" style={{width: 50}}/>

            </div>
            <div className="list-search__number__bettween__confirm">
              <Button type="primary" size="small">确定</Button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ListSearch;
